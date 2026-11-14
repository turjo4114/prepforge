import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { modulesData } from '../../data/modulesData';
import { initialStudyTasks } from '../../data/studyPlanData';
import {
  Clock,
  Flame,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  BookOpen,
  GraduationCap,
  Sparkles,
  Calendar,
  Hourglass,
  Layers,
  Award,
  Zap,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    progress,
    overallProgress,
    day1Progress,
    day2Progress,
    weakestTopics,
    recommendedLessonId,
    setActiveLessonId,
    setActiveTab,
  } = useApp();

  // 48-hour countdown calculation
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 48,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calc = () => {
      const diff = progress.deadlineTimestamp - Date.now();
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [progress.deadlineTimestamp]);

  const allLessons = modulesData.flatMap((m) => m.lessons);
  const totalLessons = allLessons.length;
  const completedLessonsCount = progress.completedLessons.length;
  const pendingLessonsCount = totalLessons - completedLessonsCount;

  // Find recommended lesson object
  const recommendedLesson =
    allLessons.find((l) => l.id === recommendedLessonId) || allLessons[0];

  // Daily study time calculation
  const todayStr = new Date().toISOString().split('T')[0];
  const todayMinutes = Math.round(progress.dailyStudyMinutes[todayStr] || 0);
  const dailyTargetMinutes = 240; // 4 hours daily target
  const dailyCompletionPct = Math.min(100, Math.round((todayMinutes / dailyTargetMinutes) * 100));

  const formatStudyTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
  };

  // Next 3 upcoming study tasks
  const upcomingTasks = initialStudyTasks
    .filter((t) => !progress.completedTasks[t.id])
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Hero Welcome & Deadline Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Itransition Front-end Specialization Placement Prep</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome back, <span className="text-brand-400">{progress.studentName}</span>!
            </h1>

            <p className="text-slate-300 text-sm leading-relaxed">
              You are on a high-intensity 48-hour sprint to build rock-solid front-end fundamentals, conquer JavaScript
              traps, and clear the Itransition placement test. Stay focused, execute the plan, and practice code daily.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveLessonId(recommendedLesson.id)}
                className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-sm shadow-lg hover:shadow-brand-500/20 transition-all flex items-center gap-2 group"
              >
                <span>Continue Learning: {recommendedLesson.title}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setActiveTab('mock-exam')}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-semibold transition flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-brand-400" />
                <span>Take Mock Placement Exam</span>
              </button>
            </div>
          </div>

          {/* 48-Hour Exam Deadline Card */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm lg:w-80 shadow-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-rose-400" /> Exam Deadline
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                48h Clock
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center my-2">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-2xl font-black font-mono text-brand-300">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Hours</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-2xl font-black font-mono text-brand-300">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Minutes</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-2xl font-black font-mono text-brand-300">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Seconds</div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 text-center mt-2">
              {timeLeft.hours < 12 ? (
                <span className="text-rose-400 font-semibold">⚠️ Final sprint! Prioritize Mock Test & Weak Topics.</span>
              ) : (
                'Target: 4+ hours daily study commitment.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid (Progress, Daily Goal, Study Time, Streak) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Progress */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition hover:border-brand-500/40">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Preparation</span>
            <div className="p-2 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">{overallProgress}%</span>
            <span className="text-xs text-slate-500">completed</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 mt-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-600 to-teal-400 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            {completedLessonsCount} of {totalLessons} curriculum lessons cleared
          </p>
        </div>

        {/* Daily Study Completion */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition hover:border-cyan-500/40">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Daily Study Target</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
              {todayMinutes}m / 240m
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 mt-3 overflow-hidden">
            <div
              className="h-full bg-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${dailyCompletionPct}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            {dailyCompletionPct}% of today's 4-hour target achieved
          </p>
        </div>

        {/* Total Study Time */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition hover:border-indigo-500/40">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Study Time</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Hourglass className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
              {formatStudyTime(progress.studyTimeSeconds)}
            </span>
            <span className="text-xs text-emerald-500 font-medium">active</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-5">
            Real-time tracker actively counting while studying
          </p>
        </div>

        {/* Learning Streak */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition hover:border-amber-500/40">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Preparation Streak</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
              Day {progress.streakDays}
            </span>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">on fire 🔥</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-5">
            48-hour sprint active (Day 1: Basics, Day 2: Mastery)
          </p>
        </div>
      </div>

      {/* Middle Grid: 48-Hour Plan Roadmap & Weakest Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 48-Hour Day 1 & Day 2 Progress Overview */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-500" />
                48-Hour Study Schedule Progress
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Track your Day 1 Foundation and Day 2 Exam Mastery completion.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('planner')}
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              <span>Full Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Day 1 Card */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  DAY 1: Intensive Foundation
                </span>
                <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                  {day1Progress}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 mb-3 overflow-hidden">
                <div
                  className="h-full bg-brand-500 rounded-full transition-all duration-300"
                  style={{ width: `${day1Progress}%` }}
                />
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" />
                  <span>JS Variables, Data Types &amp; Coercion</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" />
                  <span>Conditions, Loops &amp; Functions</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" />
                  <span>HTML Basics &amp; CSS Box Model</span>
                </li>
              </ul>
            </div>

            {/* Day 2 Card */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  DAY 2: Advanced Logic &amp; Mock Exam
                </span>
                <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                  {day2Progress}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 mb-3 overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full transition-all duration-300"
                  style={{ width: `${day2Progress}%` }}
                />
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Arrays, Objects &amp; Core Algorithms</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />
                  <span>DOM Manipulation, Events &amp; Flexbox</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Full 35-Question Mock Placement Exam</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Upcoming Study Sessions List */}
          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Upcoming Study Sessions
            </h4>
            <div className="space-y-2">
              {upcomingTasks.length === 0 ? (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Incredible! All planned study sessions are completed. Take the Mock Exam!</span>
                </div>
              ) : (
                upcomingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs transition hover:border-slate-300 dark:hover:border-slate-700"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-300 font-semibold">
                        Day {task.day}
                      </span>
                      <div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                          {task.title}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {task.timeSlot} • {task.durationMinutes} mins
                        </span>
                      </div>
                    </div>

                    {task.lessonId && (
                      <button
                        onClick={() => setActiveLessonId(task.lessonId!)}
                        className="px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 hover:bg-brand-500 hover:text-slate-950 text-slate-700 dark:text-slate-300 transition text-[11px] font-medium"
                      >
                        Start
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Weakest Topics & Mistake Vault Callout */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Weakest Topics
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                Needs Revision
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 my-3">
              Calculated dynamically from quizzes and practice exams to highlight areas requiring immediate review.
            </p>

            {weakestTopics.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center my-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  No Weak Areas Detected Yet
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Complete lesson assessments and mock exams to track areas of improvement.
                </p>
              </div>
            ) : (
              <div className="space-y-3 my-2">
                {weakestTopics.map((topic, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {topic.topic}
                      </span>
                      <span className="font-mono text-xs font-bold text-rose-500">
                        {topic.accuracy}% accuracy
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-rose-500 rounded-full"
                        style={{ width: `${topic.accuracy}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
                      {topic.failCount} incorrect answers logged
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('mistakes')}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Open Mistake Vault ({progress.mistakeVault.length} questions)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Curriculum Snapshot: 5 Modules Overview */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-500" />
              Curriculum Modules Overview
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              5 comprehensive modules designed in the exact required learning order.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('modules')}
            className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            <span>Explore All Lessons</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {modulesData.map((m, idx) => {
            const completedInMod = m.lessons.filter((l) => progress.completedLessons.includes(l.id)).length;
            const modPct = Math.round((completedInMod / m.lessons.length) * 100);

            return (
              <div
                key={m.id}
                onClick={() => {
                  setActiveLessonId(m.lessons[0].id);
                }}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 hover:border-brand-500/40 cursor-pointer transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-300">
                      Module {idx + 1}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 font-bold">{modPct}%</span>
                  </div>

                  <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 group-hover:text-brand-500 transition line-clamp-1 mb-1">
                    {m.title.replace(/Module \d+: /, '')}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {m.shortDesc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800/80">
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden mb-1.5">
                    <div
                      className="h-full bg-brand-500 rounded-full transition-all duration-300"
                      style={{ width: `${modPct}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {completedInMod}/{m.lessons.length} lessons
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
