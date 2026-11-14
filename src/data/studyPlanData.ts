import { StudyTask } from '../types';

export const initialStudyTasks: StudyTask[] = [
  // DAY 1 (Intensive Foundation - 4+ Hours)
  {
    id: 'day1-task-1',
    day: 1,
    timeSlot: 'Hour 1 (00:00 - 01:00)',
    title: 'JavaScript Fundamentals & Engine Architecture',
    moduleId: 'module-1',
    lessonId: 'js-what-is-js',
    durationMinutes: 60,
    description: 'Understand the single-threaded event loop, dynamic typing, and write your first dynamic script in the sandbox.',
    keyGoals: [
      'Understand how the V8 engine compiles JS',
      'Understand single-threaded vs non-blocking async execution',
      'Run greeting exercise in code editor'
    ],
    isCompleted: false
  },
  {
    id: 'day1-task-2',
    day: 1,
    timeSlot: 'Hour 2 (01:00 - 02:00)',
    title: 'Variables, Data Types & Equality Quirks',
    moduleId: 'module-1',
    lessonId: 'js-variables',
    durationMinutes: 60,
    description: 'Master let vs const vs var, Temporal Dead Zone (TDZ), 7 primitives, typeof null quirk, and == vs ===.',
    keyGoals: [
      'Master block scope vs function scope',
      'Explain TDZ and why accessing let early throws ReferenceError',
      'Practice == vs === comparison matrix'
    ],
    isCompleted: false
  },
  {
    id: 'day1-task-3',
    day: 1,
    timeSlot: 'Hour 3 (02:00 - 03:00)',
    title: 'Operators & Type Coercion Traps',
    moduleId: 'module-1',
    lessonId: 'js-operators',
    durationMinutes: 60,
    description: 'Examine implicit coercion rules ("5" + 2 vs "5" - 2), nullish coalescing (?? vs ||), and truthy/falsy values.',
    keyGoals: [
      'Memorize the 8 falsy values',
      'Understand short-circuit evaluation logic',
      'Complete Type Coercion Interactive Lab'
    ],
    isCompleted: false
  },
  {
    id: 'day1-task-4',
    day: 1,
    timeSlot: 'Hour 4 (03:00 - 04:00)',
    title: 'Conditions, Loops & Functions Foundations',
    moduleId: 'module-2',
    lessonId: 'prog-if-else',
    durationMinutes: 60,
    description: 'Control flow with if/else, switch strict equality, for/while loops, and function declarations vs arrow syntax.',
    keyGoals: [
      'Avoid var closure loop pitfalls',
      'Master arrow function lexical "this"',
      'Complete even numbers sum coding exercise'
    ],
    isCompleted: false
  },
  {
    id: 'day1-task-5',
    day: 1,
    timeSlot: 'Hour 5 (04:00 - 05:00)',
    title: 'HTML Basics & Semantic Accessibility',
    moduleId: 'module-3',
    lessonId: 'html-document-structure',
    durationMinutes: 60,
    description: 'Document structure, viewport meta tags, semantic tags (<main>, <article>, <nav>), and form accessibility.',
    keyGoals: [
      'Explain <!DOCTYPE html> role',
      'Connect form inputs to labels with for/id',
      'Avoid div soup using semantic tags'
    ],
    isCompleted: false
  },
  {
    id: 'day1-task-6',
    day: 1,
    timeSlot: 'Hour 6 (05:00 - 06:00)',
    title: 'CSS Fundamentals & The Box Model',
    moduleId: 'module-4',
    lessonId: 'css-box-model',
    durationMinutes: 60,
    description: 'Master content-box vs border-box sizing calculations, margin collapse, and specificity scoring rules.',
    keyGoals: [
      'Calculate total width under content-box and border-box',
      'Calculate specificity tuples (Inline, ID, Class, Element)',
      'Experiment with Box Model Visualizer'
    ],
    isCompleted: false
  },

  // DAY 2 (Advanced Logic, DOM, Integration & Full Mock Exam - 4+ Hours)
  {
    id: 'day2-task-1',
    day: 2,
    timeSlot: 'Hour 1 (00:00 - 01:00)',
    title: 'Arrays, Objects & Functional Methods',
    moduleId: 'module-2',
    lessonId: 'prog-arrays-methods',
    durationMinutes: 60,
    description: 'Harness map, filter, reduce, find, object destructuring, and shallow vs deep cloning.',
    keyGoals: [
      'Chain filter and map for data pipelines',
      'Differentiate slice() (immutable) vs splice() (mutating)',
      'Understand object references and spread operator limitations'
    ],
    isCompleted: false
  },
  {
    id: 'day2-task-2',
    day: 2,
    timeSlot: 'Hour 2 (01:00 - 02:00)',
    title: 'JavaScript Problem-Solving & Core Algorithms',
    moduleId: 'module-2',
    lessonId: 'prog-basic-algorithms',
    durationMinutes: 60,
    description: 'Practice high-frequency interview code challenges: string reversals, palindromes, FizzBuzz, and closures.',
    keyGoals: [
      'Solve reverse string and palindrome in under 3 minutes',
      'Explain closure state preservation with private counters',
      'Practice algorithms in sandboxed editor'
    ],
    isCompleted: false
  },
  {
    id: 'day2-task-3',
    day: 2,
    timeSlot: 'Hour 3 (02:00 - 03:00)',
    title: 'DOM Manipulation, Events & Delegation',
    moduleId: 'module-5',
    lessonId: 'web-dom-manipulation',
    durationMinutes: 60,
    description: 'querySelector vs getElementById, textContent vs innerHTML XSS prevention, event bubbling, and delegation.',
    keyGoals: [
      'Understand capturing vs bubbling phase',
      'Implement event delegation on parent container',
      'Use event.preventDefault() and stopPropagation()'
    ],
    isCompleted: false
  },
  {
    id: 'day2-task-4',
    day: 2,
    timeSlot: 'Hour 4 (03:00 - 04:00)',
    title: 'CSS Flexbox Layouts & Responsive Design',
    moduleId: 'module-4',
    lessonId: 'css-flexbox',
    durationMinutes: 60,
    description: 'Main axis vs cross axis alignment, centering elements, flex-grow/shrink, and media query breakpoints.',
    keyGoals: [
      'Center any element using 3 flexbox properties',
      'Distinguish justify-content vs align-items',
      'Play with Flexbox Interactive Sandbox'
    ],
    isCompleted: false
  },
  {
    id: 'day2-task-5',
    day: 2,
    timeSlot: 'Hour 5 (04:00 - 05:00)',
    title: 'Web Concepts, HTTP Status Codes & Fetch API',
    moduleId: 'module-5',
    lessonId: 'web-http-api',
    durationMinutes: 60,
    description: 'HTTP verbs, status code families (2xx, 4xx, 5xx), fetch with async/await, and Git branch workflows.',
    keyGoals: [
      'Recognize 200, 201, 400, 401, 403, 404, 500',
      'Explain why fetch() does not reject on 404 or 500',
      'Review Git branch checkout and commit commands'
    ],
    isCompleted: false
  },
  {
    id: 'day2-task-6',
    day: 2,
    timeSlot: 'Hour 6 (05:00 - 06:00)',
    title: 'Full Mock Placement Examination (35 Questions, 40 Mins)',
    moduleId: 'module-5',
    lessonId: 'mock-exam',
    durationMinutes: 60,
    description: 'Take the realistic timed 35-question placement simulation. Review incorrect answers and weak topics in Mistake Vault.',
    keyGoals: [
      'Complete 35 questions within 40 minutes',
      'Score 75%+ to achieve qualification benchmark',
      'Auto-save missed questions to Mistake Vault for targeted revision'
    ],
    isCompleted: false
  }
];
