import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProgress, Theme, MockExamResult, MistakeRecord, QuizQuestion } from '../types';
import { modulesData } from '../data/modulesData';
import { initialStudyTasks } from '../data/studyPlanData';

interface AppContextType {
  progress: UserProgress;
  markLessonComplete: (lessonId: string) => void;
  setLessonQuizScore: (lessonId: string, percentage: number) => void;
  toggleTaskComplete: (taskId: string) => void;
  addMistake: (q: QuizQuestion, userChoice: number) => void;
  markMistakeMastered: (questionId: string) => void;
  recordMockExamResult: (result: MockExamResult) => void;
  addStudyTime: (seconds: number) => void;
  toggleTheme: () => void;
  setActiveTab: (tab: UserProgress['activeTab']) => void;
  setActiveLessonId: (lessonId: string | null) => void;
  reset48HourDeadline: () => void;
  resetAllProgress: () => void;
  overallProgress: number;
  day1Progress: number;
  day2Progress: number;
  weakestTopics: Array<{ topic: string; failCount: number; totalTested: number; accuracy: number }>;
  recommendedLessonId: string;
}

const STORAGE_KEY = 'prepforge_itransition_progress_v1';

const getInitialDeadline = () => {
  return Date.now() + 48 * 60 * 60 * 1000; // 48 hours from first load
};

const defaultProgress: UserProgress = {
  studentName: 'Itransition Candidate (BD)',
  targetExam: 'Itransition Front-end Specialization Training Program',
  deadlineTimestamp: getInitialDeadline(),
  completedLessons: [],
  lessonQuizScores: {},
  completedTasks: {},
  mistakeVault: [],
  mockExamHistory: [],
  studyTimeSeconds: 1200, // starter 20 minutes logged
  dailyStudyMinutes: {},
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  theme: 'dark',
  activeTab: 'dashboard',
  activeLessonId: 'js-what-is-js',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure critical fields exist
        return {
          ...defaultProgress,
          ...parsed,
          deadlineTimestamp: parsed.deadlineTimestamp || getInitialDeadline(),
        };
      }
    } catch (e) {
      console.error('Failed to load saved progress:', e);
    }
    return defaultProgress;
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress:', e);
    }
  }, [progress]);

  // Apply theme to document
  useEffect(() => {
    if (progress.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [progress.theme]);

  // Timer to continuously log active study time when tab is open
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const today = new Date().toISOString().split('T')[0];
        const newDaily = { ...prev.dailyStudyMinutes };
        newDaily[today] = (newDaily[today] || 0) + 1 / 60; // 1 second in minutes
        return {
          ...prev,
          studyTimeSeconds: prev.studyTimeSeconds + 1,
          dailyStudyMinutes: newDaily,
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setProgress((prev) => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark',
    }));
  };

  const setActiveTab = (tab: UserProgress['activeTab']) => {
    setProgress((prev) => ({ ...prev, activeTab: tab }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setActiveLessonId = (lessonId: string | null) => {
    setProgress((prev) => ({
      ...prev,
      activeLessonId: lessonId,
      activeTab: lessonId ? 'modules' : prev.activeTab,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const markLessonComplete = (lessonId: string) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      };
    });
  };

  const setLessonQuizScore = (lessonId: string, percentage: number) => {
    setProgress((prev) => ({
      ...prev,
      lessonQuizScores: {
        ...prev.lessonQuizScores,
        [lessonId]: Math.max(prev.lessonQuizScores[lessonId] || 0, percentage),
      },
    }));
  };

  const toggleTaskComplete = (taskId: string) => {
    setProgress((prev) => {
      const current = !!prev.completedTasks[taskId];
      return {
        ...prev,
        completedTasks: {
          ...prev.completedTasks,
          [taskId]: !current,
        },
      };
    });
  };

  const addMistake = (q: QuizQuestion, userChoice: number) => {
    setProgress((prev) => {
      const existing = prev.mistakeVault.find((m) => m.questionId === q.id);
      if (existing) {
        // Update user choice and timestamp, reset mastered to false
        return {
          ...prev,
          mistakeVault: prev.mistakeVault.map((m) =>
            m.questionId === q.id
              ? { ...m, userChoice, timestamp: Date.now(), mastered: false }
              : m
          ),
        };
      }
      const newMistake: MistakeRecord = {
        id: `mistake-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        questionId: q.id,
        topic: q.topic,
        moduleTitle: q.moduleTitle,
        question: q.question,
        codeSnippet: q.codeSnippet,
        options: q.options,
        userChoice,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        timestamp: Date.now(),
        mastered: false,
      };
      return {
        ...prev,
        mistakeVault: [newMistake, ...prev.mistakeVault],
      };
    });
  };

  const markMistakeMastered = (questionId: string) => {
    setProgress((prev) => ({
      ...prev,
      mistakeVault: prev.mistakeVault.map((m) =>
        m.questionId === questionId ? { ...m, mastered: true } : m
      ),
    }));
  };

  const recordMockExamResult = (result: MockExamResult) => {
    setProgress((prev) => ({
      ...prev,
      mockExamHistory: [result, ...prev.mockExamHistory],
    }));
  };

  const addStudyTime = (seconds: number) => {
    setProgress((prev) => ({
      ...prev,
      studyTimeSeconds: prev.studyTimeSeconds + seconds,
    }));
  };

  const reset48HourDeadline = () => {
    const newDeadline = Date.now() + 48 * 60 * 60 * 1000;
    setProgress((prev) => ({
      ...prev,
      deadlineTimestamp: newDeadline,
    }));
  };

  const resetAllProgress = () => {
    const fresh: UserProgress = {
      ...defaultProgress,
      deadlineTimestamp: getInitialDeadline(),
    };
    setProgress(fresh);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Calculations
  const allLessons = modulesData.flatMap((m) => m.lessons);
  const totalLessonsCount = allLessons.length;
  const completedLessonsCount = progress.completedLessons.length;
  const overallProgress = totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0;

  // Day 1 & Day 2 progress
  const day1Tasks = initialStudyTasks.filter((t) => t.day === 1);
  const day2Tasks = initialStudyTasks.filter((t) => t.day === 2);
  const day1Completed = day1Tasks.filter((t) => progress.completedTasks[t.id]).length;
  const day2Completed = day2Tasks.filter((t) => progress.completedTasks[t.id]).length;
  const day1Progress = Math.round((day1Completed / day1Tasks.length) * 100);
  const day2Progress = Math.round((day2Completed / day2Tasks.length) * 100);

  // Weakest topics calculation
  // Aggregate from mistakeVault and mock exams
  const topicStats: Record<string, { fail: number; total: number }> = {};

  progress.mistakeVault.forEach((m) => {
    if (!topicStats[m.topic]) {
      topicStats[m.topic] = { fail: 0, total: 0 };
    }
    topicStats[m.topic].total += 1;
    if (!m.mastered) {
      topicStats[m.topic].fail += 1;
    }
  });

  // Also include mock exam results breakdown if available
  progress.mockExamHistory.forEach((mock) => {
    Object.entries(mock.topicBreakdown).forEach(([topic, stats]) => {
      if (!topicStats[topic]) {
        topicStats[topic] = { fail: 0, total: 0 };
      }
      topicStats[topic].total += stats.total;
      topicStats[topic].fail += stats.total - stats.correct;
    });
  });

  const weakestTopics = Object.entries(topicStats)
    .map(([topic, stats]) => ({
      topic,
      failCount: stats.fail,
      totalTested: stats.total,
      accuracy: Math.round(((stats.total - stats.fail) / stats.total) * 100),
    }))
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 4);

  // Next recommended lesson: first uncompleted lesson, or the first lesson of the weakest topic
  let recommendedLessonId = allLessons[0]?.id || 'js-what-is-js';
  const firstUncompleted = allLessons.find((l) => !progress.completedLessons.includes(l.id));
  if (firstUncompleted) {
    recommendedLessonId = firstUncompleted.id;
  }

  return (
    <AppContext.Provider
      value={{
        progress,
        markLessonComplete,
        setLessonQuizScore,
        toggleTaskComplete,
        addMistake,
        markMistakeMastered,
        recordMockExamResult,
        addStudyTime,
        toggleTheme,
        setActiveTab,
        setActiveLessonId,
        reset48HourDeadline,
        resetAllProgress,
        overallProgress,
        day1Progress,
        day2Progress,
        weakestTopics,
        recommendedLessonId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
