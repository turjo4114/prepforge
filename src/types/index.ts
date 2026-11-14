export type Theme = 'dark' | 'light';

export type QuestionType =
  | 'mcq'
  | 'predict-output'
  | 'find-error'
  | 'fill-in-blank'
  | 'code-challenge'
  | 'logical-reasoning';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Interview Trap';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  topic: string;
  moduleTitle: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  starterCode?: string;
  expectedOutput?: string;
}

export interface CodeExercise {
  id: string;
  title: string;
  instructions: string;
  starterCode: string;
  solutionCode: string;
  hints: string[];
  testCases: {
    name: string;
    input?: any;
    expectedOutput: string;
    testFn?: string; // JS code snippet returning boolean
  }[];
}

export interface VisualDemo {
  type: 'box-model' | 'flexbox' | 'equality-matrix' | 'dom-tree' | 'type-coercion';
  title: string;
  description: string;
}

export interface LessonContent {
  id: string;
  moduleId: string;
  title: string;
  durationMinutes: number;
  summary: string;
  importance: 'Critical for Placement Test' | 'High Frequency' | 'Fundamental';
  simpleExplanation: string[];
  keyPoints: string[];
  practicalExamples: {
    title: string;
    explanation: string;
    code: string;
    expectedOutput: string;
    language?: 'javascript' | 'html' | 'css';
  }[];
  visualDemo?: VisualDemo;
  commonMistakes: {
    mistake: string;
    whyItHappens: string;
    howToFix: string;
    wrongCode?: string;
    correctCode?: string;
  }[];
  knowledgeChecks: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  practiceExercise: CodeExercise;
  finalAssessment: QuizQuestion[];
}

export interface ModuleData {
  id: string;
  title: string;
  shortDesc: string;
  badge: string;
  iconName: string;
  estimatedHours: number;
  lessons: LessonContent[];
}

export interface StudyTask {
  id: string;
  day: 1 | 2;
  timeSlot: string;
  title: string;
  moduleId?: string;
  lessonId?: string;
  durationMinutes: number;
  description: string;
  keyGoals: string[];
  isCompleted: boolean;
}

export interface MistakeRecord {
  id: string;
  questionId: string;
  topic: string;
  moduleTitle: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  userChoice: number;
  correctAnswer: number;
  explanation: string;
  timestamp: number;
  mastered: boolean;
}

export interface MockExamResult {
  id: string;
  date: string;
  score: number;
  total: number;
  percentage: number;
  timeTakenSeconds: number;
  topicBreakdown: Record<string, { correct: number; total: number }>;
  userAnswers: Record<number, number>; // questionIndex -> selectedOptionIndex
  flaggedQuestions: number[];
}

export interface UserProgress {
  studentName: string;
  targetExam: string;
  deadlineTimestamp: number; // 48-hour timestamp
  completedLessons: string[]; // lesson IDs
  lessonQuizScores: Record<string, number>; // lessonId -> percentage
  completedTasks: Record<string, boolean>; // taskId -> boolean
  mistakeVault: MistakeRecord[];
  mockExamHistory: MockExamResult[];
  studyTimeSeconds: number;
  dailyStudyMinutes: Record<string, number>; // YYYY-MM-DD -> minutes
  streakDays: number;
  lastActiveDate: string;
  theme: Theme;
  activeTab: 'dashboard' | 'modules' | 'planner' | 'mock-exam' | 'mistakes' | 'playground' | 'cheatsheet';
  activeLessonId: string | null;
}
