import { ModuleData } from '../types';

export const modulesData: ModuleData[] = [
  {
    id: 'module-1',
    title: 'Module 1: JavaScript Fundamentals',
    shortDesc: 'Master core JavaScript mechanics, variable behaviors, type coercion traps, and equality checks tested in interviews.',
    badge: 'Exam Core (Must-Know)',
    iconName: 'Code2',
    estimatedHours: 4,
    lessons: [
      {
        id: 'js-what-is-js',
        moduleId: 'module-1',
        title: 'What is JavaScript?',
        durationMinutes: 20,
        importance: 'Fundamental',
        summary: 'Understand JavaScript’s single-threaded, non-blocking, interpreted nature, the V8 engine, and how it executes inside the browser.',
        simpleExplanation: [
          'JavaScript is a high-level, interpreted scripting language that makes web pages interactive and dynamic.',
          'Unlike HTML (which provides structure) and CSS (which provides styling), JavaScript provides behavior, logic, and asynchronous capabilities.',
          'In modern browsers, the JavaScript engine (like Google Chrome\'s V8) compiles JavaScript into native machine code just-in-time (JIT compilation) for speed.',
          'Key architecture point: JavaScript has a single call stack (single-threaded). It executes one statement at a time in sequence, utilizing an Event Loop for asynchronous tasks.'
        ],
        keyPoints: [
          'Single-threaded: One call stack, executes one task at a time.',
          'Non-blocking: Long tasks (e.g., fetch, timer) are offloaded to Web APIs.',
          'Dynamic typing: You do not need to specify variable types; they are resolved at runtime.',
          'Runs in browsers and on servers via Node.js.'
        ],
        practicalExamples: [
          {
            title: 'Your First Dynamic Script',
            explanation: 'See how JavaScript executes sequentially from top to bottom.',
            code: `console.log("1. Application starting...");

let candidateName = "Itransition BD Trainee";
let role = "Front-end Specialist";

console.log("2. Welcome, " + candidateName + "! Preparing for: " + role);
console.log("3. Setup complete.");`,
            expectedOutput: `1. Application starting...
2. Welcome, Itransition BD Trainee! Preparing for: Front-end Specialist
3. Setup complete.`
          }
        ],
        commonMistakes: [
          {
            mistake: 'Confusing Java with JavaScript',
            whyItHappens: 'Similar names due to 1995 marketing, but they are completely different languages.',
            howToFix: 'Remember: "Java is to JavaScript as car is to carpet." Java is statically typed, compiled OOP; JS is dynamically typed multi-paradigm.'
          },
          {
            mistake: 'Assuming JavaScript is purely compiled like C++ or Java',
            whyItHappens: 'Modern engines are fast, leading people to think it is compiled ahead of time.',
            howToFix: 'JavaScript uses Just-In-Time (JIT) compilation at runtime.'
          }
        ],
        knowledgeChecks: [
          {
            question: 'What is the primary role of the JavaScript engine (such as V8) in the browser?',
            options: [
              'To compile HTML tags into CSS styles',
              'To interpret and compile JavaScript code into machine code for execution',
              'To store database records permanently on the client device',
              'To manage network cables and physical Wi-Fi routers'
            ],
            correctIndex: 1,
            explanation: 'The JavaScript engine parses JS source code and uses JIT compilation to turn it into machine code that the CPU can execute.'
          }
        ],
        practiceExercise: {
          id: 'ex-what-is-js',
          title: 'Exercise: Log Candidate Greeting',
          instructions: 'Declare a variable named "portal" with the value "PrepForge" and use console.log to output "Welcome to PrepForge!".',
          starterCode: `// Write your code below:
let portal = "PrepForge";

// Log the greeting
`,
          solutionCode: `let portal = "PrepForge";
console.log("Welcome to " + portal + "!");`,
          hints: ['Use concatenation (+) or template literals (`Welcome to ${portal}!`)', 'Ensure the exact string output matches'],
          testCases: [
            {
              name: 'Outputs Welcome to PrepForge!',
              expectedOutput: 'Welcome to PrepForge!'
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-js-arch-1',
            type: 'mcq',
            difficulty: 'Beginner',
            topic: 'JS Architecture',
            moduleTitle: 'JavaScript Fundamentals',
            question: 'Which of the following statements correctly describes JavaScript\'s threading model?',
            options: [
              'Multi-threaded with automatic parallel thread pooling',
              'Single-threaded with an event loop for non-blocking asynchronous execution',
              'No threads at all, runs purely inside GPU shaders',
              'Two fixed threads: one for math and one for strings'
            ],
            correctAnswer: 1,
            explanation: 'JavaScript runs on a single main thread (one call stack) and uses the Event Loop alongside Web APIs to handle asynchronous actions non-blockingly.'
          }
        ]
      },
      {
        id: 'js-variables',
        moduleId: 'module-1',
        title: 'Variables: let, const, var',
        durationMinutes: 30,
        importance: 'Critical for Placement Test',
        summary: 'Deep dive into scope (function vs block), hoisting, and the Temporal Dead Zone (TDZ). A classic interview favorite.',
        simpleExplanation: [
          'In modern JavaScript (ES6+), you should always use "let" and "const". Avoid using "var" in modern code.',
          'var is FUNCTION-scoped (or globally scoped). It is hoisted to the top and initialized with undefined.',
          'let and const are BLOCK-scoped (restricted to the nearest { } curly braces).',
          'let and const are also hoisted, but they are kept in the "Temporal Dead Zone" (TDZ) until their declaration line is executed. Accessing them before gives a ReferenceError.',
          'const cannot be reassigned. However, if const holds an object or array, the internal properties or items CAN be mutated.'
        ],
        keyPoints: [
          'var: Function-scoped, hoisted to undefined, allows re-declaration.',
          'let: Block-scoped, hoisted to TDZ, re-assignable, no re-declaration in same scope.',
          'const: Block-scoped, hoisted to TDZ, must be initialized at declaration, cannot be reassigned.',
          'TDZ (Temporal Dead Zone): Time between entering scope and declaration execution.'
        ],
        practicalExamples: [
          {
            title: 'Block Scope vs Function Scope',
            explanation: 'Notice how let respects the if-block, while var leaks outside!',
            code: `if (true) {
  var leakedVar = "I escaped the block!";
  let safeLet = "I am trapped in this block!";
}

console.log(leakedVar); // Works!
// console.log(safeLet); // ReferenceError: safeLet is not defined!`,
            expectedOutput: `I escaped the block!`
          },
          {
            title: 'const Mutation vs Reassignment',
            explanation: 'const protects the variable binding, not the object properties.',
            code: `const candidate = { name: "Rahim", score: 85 };

// This is ALLOWED (property mutation):
candidate.score = 92;
console.log("Updated score:", candidate.score);

// This would THROW TypeError: Assignment to constant variable:
// candidate = { name: "Karim", score: 90 };`,
            expectedOutput: `Updated score: 92`
          }
        ],
        commonMistakes: [
          {
            mistake: 'Thinking const makes arrays or objects immutable',
            whyItHappens: 'The keyword "const" sounds like "constant".',
            howToFix: 'const freezes the reference variable pointer, not the contents. Use Object.freeze() if you want immutability.'
          },
          {
            mistake: 'Using var inside for-loops with asynchronous callbacks',
            whyItHappens: 'Because var is function-scoped, all callbacks share the single mutated loop variable index.',
            howToFix: 'Always use let in for-loops so each iteration gets its own fresh lexical binding.'
          }
        ],
        knowledgeChecks: [
          {
            question: 'What happens when you access a "let" variable before its declaration line?',
            options: [
              'It returns undefined',
              'It throws a ReferenceError due to the Temporal Dead Zone (TDZ)',
              'It automatically assigns 0',
              'The browser crashes silently'
            ],
            correctIndex: 1,
            explanation: 'Variables declared with let and const are in the Temporal Dead Zone from the start of the block until the declaration is evaluated. Accessing them throws ReferenceError.'
          }
        ],
        practiceExercise: {
          id: 'ex-variables',
          title: 'Exercise: Fix the Scope Leak',
          instructions: 'Change the variable keyword so that "score" is block-scoped and cannot be reassigned, while "attempts" can be incremented.',
          starterCode: `// Fix the keywords below
var score = 100;
var attempts = 1;

attempts = attempts + 1;

console.log("Score:", score, "Attempts:", attempts);`,
          solutionCode: `const score = 100;
let attempts = 1;

attempts = attempts + 1;

console.log("Score:", score, "Attempts:", attempts);`,
          hints: ['Use const for values that do not change', 'Use let for values that will be reassigned'],
          testCases: [
            {
              name: 'Logs Score: 100 Attempts: 2',
              expectedOutput: 'Score: 100 Attempts: 2'
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-var-output-1',
            type: 'predict-output',
            difficulty: 'Interview Trap',
            topic: 'Hoisting & TDZ',
            moduleTitle: 'JavaScript Fundamentals',
            question: 'What will be printed to the console when executing this code?',
            codeSnippet: `console.log(a);
var a = 10;
console.log(a);`,
            options: [
              '10 followed by 10',
              'undefined followed by 10',
              'ReferenceError: a is not defined',
              'null followed by 10'
            ],
            correctAnswer: 1,
            explanation: 'With "var", the declaration "var a;" is hoisted to the top and initialized with "undefined". The assignment "a = 10" happens on line 2.'
          },
          {
            id: 'q-var-output-2',
            type: 'predict-output',
            difficulty: 'Interview Trap',
            topic: 'Temporal Dead Zone',
            moduleTitle: 'JavaScript Fundamentals',
            question: 'What happens when executing the following snippet?',
            codeSnippet: `console.log(b);
let b = 25;`,
            options: [
              'undefined',
              'ReferenceError: Cannot access "b" before initialization',
              'null',
              '25'
            ],
            correctAnswer: 1,
            explanation: '"let" declarations are hoisted into the Temporal Dead Zone (TDZ). Unlike "var", they are not initialized with undefined, causing a ReferenceError.'
          }
        ]
      },
      {
        id: 'js-data-types',
        moduleId: 'module-1',
        title: 'Data Types',
        durationMinutes: 25,
        importance: 'Critical for Placement Test',
        summary: 'Master the 7 primitive types vs non-primitive (object) types, memory storage (stack vs heap), and the famous typeof null quirk.',
        simpleExplanation: [
          'JavaScript has 8 data types in total, divided into 2 categories:',
          '1. PRIMITIVES (7 types): string, number, bigint, boolean, undefined, symbol, null. Primitives are IMMUTABLE and stored directly in the Stack.',
          '2. NON-PRIMITIVES / OBJECTS: objects, arrays, functions. Stored in Heap memory, passed by reference.',
          'Crucial Placement Test Quirk: typeof null returns "object"! This is a legacy bug from JS 1995 that cannot be fixed without breaking existing websites.',
          'undefined means a variable has been declared but not assigned a value. null is an intentional assignment representing "no value".'
        ],
        keyPoints: [
          '7 Primitives: string, number, boolean, null, undefined, symbol, bigint.',
          'typeof null === "object" (Famous interview trap).',
          'typeof function(){} === "function" (a callable object).',
          'Primitives are compared by value; Objects are compared by memory reference.'
        ],
        practicalExamples: [
          {
            title: 'Type Checking with typeof',
            explanation: 'Observe the output of typeof across different types.',
            code: `console.log("typeof 42:", typeof 42);
console.log("typeof 'Hello':", typeof "Hello");
console.log("typeof true:", typeof true);
console.log("typeof undefined:", typeof undefined);
console.log("typeof null:", typeof null); // Famous bug!
console.log("typeof {}:", typeof {});
console.log("typeof []:", typeof []); // Arrays are objects!
console.log("typeof function(){}:", typeof function(){});`,
            expectedOutput: `typeof 42: number
typeof 'Hello': string
typeof true: boolean
typeof undefined: undefined
typeof null: object
typeof {}: object
typeof []: object
typeof function(){}: function`
          },
          {
            title: 'Value vs Reference Comparison',
            explanation: 'Two distinct objects with identical properties are NEVER equal!',
            code: `let num1 = 10;
let num2 = 10;
console.log("Primitives equal?", num1 === num2); // true (same value)

let obj1 = { id: 1 };
let obj2 = { id: 1 };
console.log("Objects equal?", obj1 === obj2); // false (different heap memory addresses!)`,
            expectedOutput: `Primitives equal? true
Objects equal? false`
          }
        ],
        commonMistakes: [
          {
            mistake: 'Using typeof to check if a variable is an array',
            whyItHappens: 'typeof [] returns "object", which does not confirm an array.',
            howToFix: 'Always use Array.isArray(myVar) to check for arrays.'
          },
          {
            mistake: 'Expecting { a: 1 } === { a: 1 } to be true',
            whyItHappens: 'Assuming JavaScript does deep equality comparison on object literals.',
            howToFix: 'JavaScript compares objects by reference address, not value. Each literal {} allocates new memory.'
          }
        ],
        knowledgeChecks: [
          {
            question: 'Why does "typeof null" return "object" in JavaScript?',
            options: [
              'Because null is an instance of the Object prototype class',
              'Because of a historical bug in the initial JS implementation where null had a type tag of 0 (same as object)',
              'Because null holds key-value pairs',
              'Because ECMA committee voted to make null an object in 2020'
            ],
            correctIndex: 1,
            explanation: 'In the original 1995 JS implementation, values were stored with a type tag. Object tag was 0, and NULL pointer was 0x00, causing typeof to classify it as "object". It is kept for backward compatibility.'
          }
        ],
        practiceExercise: {
          id: 'ex-data-types',
          title: 'Exercise: Correct Array Detection',
          instructions: 'Write code using Array.isArray() to check if "candidates" is an array, and log "Is Array: true" or "Is Array: false".',
          starterCode: `const candidates = ["Turjo", "Ayesha", "Tanvir"];

// Check if candidates is an array and log: "Is Array: " + result
`,
          solutionCode: `const candidates = ["Turjo", "Ayesha", "Tanvir"];
const result = Array.isArray(candidates);
console.log("Is Array: " + result);`,
          hints: ['Use Array.isArray(candidates)', 'Concatenate the boolean result to "Is Array: "'],
          testCases: [
            {
              name: 'Outputs Is Array: true',
              expectedOutput: 'Is Array: true'
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-type-quiz-1',
            type: 'mcq',
            difficulty: 'Intermediate',
            topic: 'Data Types',
            moduleTitle: 'JavaScript Fundamentals',
            question: 'Which of the following is NOT a primitive data type in JavaScript?',
            options: ['Symbol', 'BigInt', 'Array', 'Undefined'],
            correctAnswer: 2,
            explanation: 'Array is an Object type (non-primitive). Symbol, BigInt, and Undefined are all primitive types.'
          }
        ]
      },
      {
        id: 'js-operators',
        moduleId: 'module-1',
        title: 'Operators',
        durationMinutes: 25,
        importance: 'Critical for Placement Test',
        summary: 'Arithmetic, logical operators (&&, ||, ??), ternary operator, precedence, and short-circuit evaluation.',
        simpleExplanation: [
          'Operators perform operations on variables and values.',
          'Arithmetic: +, -, *, /, %, ** (exponentiation), ++, --.',
          'Short-Circuiting in Logical Operators:',
          '- && (AND): Returns the first falsy value, or the last value if all are truthy.',
          '- || (OR): Returns the first truthy value, or the last value if all are falsy.',
          '- ?? (Nullish Coalescing): Returns the right-hand value ONLY if left-hand is null or undefined (it does NOT treat 0 or "" as nullish!).'
        ],
        keyPoints: [
          'Precedence: Multiplication/Division have higher precedence than Addition/Subtraction.',
          'Short-circuit evaluation: JS stops evaluating as soon as the result is determined.',
          '?? vs ||: || treats 0, "", false, NaN, null, undefined as falsy. ?? only treats null and undefined as nullish.'
        ],
        practicalExamples: [
          {
            title: 'Short-Circuit Evaluation in Action',
            explanation: 'See how && and || return actual values, not just booleans.',
            code: `console.log("cat" && "dog"); // "dog" (both truthy, returns last)
console.log(false && "dog"); // false (first falsy)
console.log("" || "fallback"); // "fallback" (first truthy)
console.log("hello" || "fallback"); // "hello"

// Crucial: 0 count with || vs ??
let score = 0;
console.log("With ||:", score || 10); // 10 (Bug! 0 was a valid score!)
console.log("With ??:", score ?? 10); // 0 (Correct! 0 is not nullish!)`,
            expectedOutput: `dog
false
fallback
hello
With ||: 10
With ??: 0`
          }
        ],
        commonMistakes: [
          {
            mistake: 'Using || for default values when 0 or empty string is valid',
            whyItHappens: '0 and "" are falsy in JS, so || skips them.',
            howToFix: 'Use the nullish coalescing operator (??) introduced in ES2020.'
          }
        ],
        knowledgeChecks: [
          {
            question: 'What will "0 || 42" evaluate to?',
            options: ['0', '42', 'true', 'false'],
            correctIndex: 1,
            explanation: '0 is falsy, so the || operator evaluates the right-hand operand and returns 42.'
          }
        ],
        practiceExercise: {
          id: 'ex-operators',
          title: 'Exercise: Safe Fallback with ??',
          instructions: 'Use the nullish coalescing operator ?? to set defaultUser to "Guest" if username is null or undefined, and print it.',
          starterCode: `let username = null;
let defaultUser; // assign using username ?? "Guest"

console.log("Active user:", defaultUser);`,
          solutionCode: `let username = null;
let defaultUser = username ?? "Guest";

console.log("Active user:", defaultUser);`,
          hints: ['Assign defaultUser = username ?? "Guest"'],
          testCases: [
            {
              name: 'Logs Active user: Guest',
              expectedOutput: 'Active user: Guest'
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-op-output-1',
            type: 'predict-output',
            difficulty: 'Intermediate',
            topic: 'Logical Operators',
            moduleTitle: 'JavaScript Fundamentals',
            question: 'What is the output of the following expression?',
            codeSnippet: `console.log(null ?? "Alpha" && "Beta");`,
            options: ['null', 'Alpha', 'Beta', 'undefined'],
            correctAnswer: 2,
            explanation: '?? has lower precedence than &&. "Alpha" && "Beta" evaluates first to "Beta". Then null ?? "Beta" evaluates to "Beta".'
          }
        ]
      },
      {
        id: 'js-type-conversion',
        moduleId: 'module-1',
        title: 'Type Conversion & Coercion',
        durationMinutes: 30,
        importance: 'Critical for Placement Test',
        summary: 'Implicit type coercion vs explicit casting. Understand why "5" + 2 is "52" but "5" - 2 is 3.',
        simpleExplanation: [
          'Type conversion is converting one data type to another.',
          '1. Explicit Conversion (Type Casting): Done manually using String(), Number(), Boolean(), parseInt().',
          '2. Implicit Coercion: Done automatically by JavaScript engine when operands have mismatched types.',
          'The + operator is overloaded: if ANY operand is a string, it converts both to strings and CONCATENATES!',
          'All other math operators (-, *, /, %) coerce strings to numbers mathematically.',
          'Falsy values in JS (Only 8): false, 0, -0, 0n, "", null, undefined, NaN. Everything else is truthy (including empty array [] and empty object {}!).'
        ],
        keyPoints: [
          '"5" + 2 === "52" (String concatenation).',
          '"5" - 2 === 3 (Numeric subtraction coercion).',
          'Boolean([]) is TRUE, Boolean({}) is TRUE, Boolean("") is FALSE.',
          'NaN is of type "number" (typeof NaN === "number"). NaN !== NaN.'
        ],
        visualDemo: {
          type: 'type-coercion',
          title: 'Interactive Type Coercion Matrix',
          description: 'Explore how different types behave when combined with operators.'
        },
        practicalExamples: [
          {
            title: 'Classic Type Coercion Scenarios',
            explanation: 'Common expressions tested in placement quizzes.',
            code: `console.log('"5" + 3 =', "5" + 3); // "53"
console.log('"5" - 3 =', "5" - 3); // 2
console.log('true + 1 =', true + 1); // 2 (true converts to 1)
console.log('false + false =', false + false); // 0
console.log('"10" * "2" =', "10" * "2"); // 20
console.log('"Hello" - 1 =', "Hello" - 1); // NaN (Not a Number)`,
            expectedOutput: `"5" + 3 = 53
"5" - 3 = 2
true + 1 = 2
false + false = 0
"10" * "2" = 20
"Hello" - 1 = NaN`
          }
        ],
        commonMistakes: [
          {
            mistake: 'Checking if a value is NaN using myVal === NaN',
            whyItHappens: 'In math x === x, but in IEEE 754 float specs NaN is never equal to itself.',
            howToFix: 'Always use Number.isNaN(myVal) or isNaN(myVal).'
          },
          {
            mistake: 'Assuming [] or {} is falsy because it is empty',
            whyItHappens: 'Empty strings are falsy, so people assume empty arrays are too.',
            howToFix: 'All objects and arrays are truthy in JavaScript, even if empty. To check if an array is empty, check arr.length === 0.'
          }
        ],
        knowledgeChecks: [
          {
            question: 'What is the boolean evaluation of an empty array: Boolean([])?',
            options: ['false', 'true', 'undefined', 'TypeError'],
            correctIndex: 1,
            explanation: 'All objects (including arrays and empty objects) are truthy in JavaScript.'
          }
        ],
        practiceExercise: {
          id: 'ex-coercion',
          title: 'Exercise: Explicit Number Conversion',
          instructions: 'Convert the string "450" into a number explicitly using Number() and calculate total by adding bonus (50), then log the result.',
          starterCode: `let strSalary = "450";
let bonus = 50;

// Convert strSalary to a number and add bonus:
let total;

console.log("Total:", total);`,
          solutionCode: `let strSalary = "450";
let bonus = 50;
let total = Number(strSalary) + bonus;

console.log("Total:", total);`,
          hints: ['Use Number(strSalary)', 'Add bonus: Number(strSalary) + bonus'],
          testCases: [
            {
              name: 'Logs Total: 500',
              expectedOutput: 'Total: 500'
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-coercion-1',
            type: 'predict-output',
            difficulty: 'Interview Trap',
            topic: 'Type Coercion',
            moduleTitle: 'JavaScript Fundamentals',
            question: 'What will console.log(1 + 2 + "3") output?',
            codeSnippet: `console.log(1 + 2 + "3");`,
            options: ['"123"', '"33"', '"6"', 'NaN'],
            correctAnswer: 1,
            explanation: 'Evaluation happens left to right: 1 + 2 = 3 (numbers). Then 3 + "3" coerces 3 into a string, yielding the string "33".'
          },
          {
            id: 'q-coercion-2',
            type: 'predict-output',
            difficulty: 'Interview Trap',
            topic: 'Type Coercion',
            moduleTitle: 'JavaScript Fundamentals',
            question: 'What will console.log("3" + 1 + 2) output?',
            codeSnippet: `console.log("3" + 1 + 2);`,
            options: ['"33"', '"312"', '6', 'NaN'],
            correctAnswer: 1,
            explanation: 'Left to right: "3" + 1 = "31" (string). Then "31" + 2 = "312" (string).'
          }
        ]
      },
      {
        id: 'js-console-debugging',
        moduleId: 'module-1',
        title: 'console.log() & Debugging',
        durationMinutes: 15,
        importance: 'Fundamental',
        summary: 'Learn console methods: log, warn, error, table, time/timeEnd, and effective debugging techniques.',
        simpleExplanation: [
          'console.log() is the primary tool for printing diagnostic information to the browser developer tools console.',
          'Beyond .log(), professional engineers use: console.error() for exceptions, console.warn() for warnings, console.table() for clean formatted table view of objects/arrays, and console.time() / console.timeEnd() to measure execution speed.',
          'You can log multiple arguments separated by commas, and use string substitution or template literals.'
        ],
        keyPoints: [
          'console.log() accepts multiple arguments separated by commas.',
          'console.table() formats arrays and objects into a readable tabular grid.',
          'console.dir() shows interactive list of object properties.'
        ],
        practicalExamples: [
          {
            title: 'Multiple Console Methods',
            explanation: 'Explore different console capabilities.',
            code: `console.log("Normal log message");
console.warn("Warning: approaching memory limit");
console.error("Error: connection refused");

const candidates = [
  { id: 1, name: "Sakib", score: 88 },
  { id: 2, name: "Nabila", score: 94 }
];
console.table(candidates);`,
            expectedOutput: `Normal log message
Warning: approaching memory limit
Error: connection refused
(Table representation of candidates)`
          }
        ],
        commonMistakes: [
          {
            mistake: 'Leaving console.log statements in production code',
            whyItHappens: 'Forgetting to clean up debugging logs before pushing to GitHub.',
            howToFix: 'Remove logs or use an ESLint rule (no-console) or build stripper before deploying.'
          }
        ],
        knowledgeChecks: [
          {
            question: 'Which console method renders an array of objects as an easy-to-read graphical table?',
            options: ['console.log()', 'console.table()', 'console.grid()', 'console.view()'],
            correctIndex: 1,
            explanation: 'console.table() renders array/object items into an ASCII or visual interactive table in developer tools.'
          }
        ],
        practiceExercise: {
          id: 'ex-console',
          title: 'Exercise: Log Candidate Status',
          instructions: 'Use console.log to print "Candidate: " followed by the name "Sadia" and " - Ready for test: " followed by true.',
          starterCode: `let name = "Sadia";
let isReady = true;

// Use console.log to print: "Candidate: Sadia - Ready for test: true"
`,
          solutionCode: `let name = "Sadia";
let isReady = true;
console.log("Candidate: " + name + " - Ready for test: " + isReady);`,
          hints: ['Use string concatenation or template string `Candidate: ${name} - Ready for test: ${isReady}`'],
          testCases: [
            {
              name: 'Outputs Candidate: Sadia - Ready for test: true',
              expectedOutput: 'Candidate: Sadia - Ready for test: true'
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-console-1',
            type: 'mcq',
            difficulty: 'Beginner',
            topic: 'Debugging',
            moduleTitle: 'JavaScript Fundamentals',
            question: 'What is printed if you pass multiple arguments to console.log("A", 1, true)?',
            options: [
              'A1true (concatenated without space)',
              'A 1 true (separated by spaces)',
              'An array ["A", 1, true]',
              'Only the first argument "A"'
            ],
            correctAnswer: 1,
            explanation: 'console.log separates multiple comma-separated arguments with a single space.'
          }
        ]
      },
      {
        id: 'js-strict-vs-loose-equality',
        moduleId: 'module-1',
        title: 'Strict vs Loose Equality',
        durationMinutes: 30,
        importance: 'Critical for Placement Test',
        summary: 'Master == (loose) vs === (strict). Understand coercion rules, edge cases, and why === is mandatory in modern web development.',
        simpleExplanation: [
          'The single most frequently tested JavaScript question in interview screenings is the difference between == and ===.',
          '=== (Strict Equality): Checks BOTH value AND type. If types differ, it immediately returns FALSE without converting anything.',
          '== (Loose Equality): Performs IMPLICIT TYPE COERCION before comparing values if the types differ.',
          'Key Loose Equality Rules:',
          '- null == undefined is TRUE (they are loosely equal to each other and nothing else).',
          '- When comparing number with string, the string is coerced to number (e.g. 5 == "5" -> 5 == 5 -> true).',
          '- When comparing boolean with any other type, the boolean is coerced to number first! (false -> 0, true -> 1). That is why "0" == false is TRUE ("0" == 0 -> 0 == 0 -> true)!',
          'Golden Rule: ALWAYS use === and !== in production code to prevent subtle bugs.'
        ],
        keyPoints: [
          '5 === "5" is false (number vs string).',
          '5 == "5" is true (string coerced to number).',
          'null === undefined is false; null == undefined is true.',
          '0 == false is true, but 0 === false is false.',
          'NaN === NaN is FALSE (NaN is the only value in JS not strictly equal to itself).'
        ],
        visualDemo: {
          type: 'equality-matrix',
          title: 'Interactive Equality Explorer (== vs ===)',
          description: 'Compare values across different types and see exact coercion mechanics in real time.'
        },
        practicalExamples: [
          {
            title: 'Strict vs Loose Comparison Table',
            explanation: 'Run these essential test cases and observe the difference.',
            code: `console.log('5 === "5":', 5 === "5"); // false
console.log('5 == "5":', 5 == "5");   // true

console.log('0 === false:', 0 === false); // false
console.log('0 == false:', 0 == false);   // true

console.log('null === undefined:', null === undefined); // false
console.log('null == undefined:', null == undefined);   // true

console.log('"" == false:', "" == false); // true ("" -> 0, false -> 0)
console.log('"" === false:', "" === false); // false`,
            expectedOutput: `5 === "5": false
5 == "5": true
0 === false: false
0 == false: true
null === undefined: false
null == undefined: true
"" == false: true
"" === false: false`
          }
        ],
        commonMistakes: [
          {
            mistake: 'Using == in if-conditions expecting strict type safety',
            whyItHappens: 'Coming from languages like Python or Java where == is strict.',
            howToFix: 'In JavaScript, always default to ===. Only use == if you explicitly want to check if a value is null OR undefined (val == null).'
          },
          {
            mistake: 'Thinking [] == [] evaluates to true',
            whyItHappens: 'They look identical.',
            howToFix: 'Arrays and objects are compared by memory pointer reference. Two newly created arrays occupy two different memory addresses.'
          }
        ],
        knowledgeChecks: [
          {
            question: 'What is the result of `null === undefined` vs `null == undefined`?',
            options: [
              'Both are true',
              'Both are false',
              'false and true respectively',
              'true and false respectively'
            ],
            correctIndex: 2,
            explanation: 'null and undefined have different types (object vs undefined), so strict equality (===) is false. However, loose equality (==) defines them as equal to each other, so it is true.'
          }
        ],
        practiceExercise: {
          id: 'ex-equality',
          title: 'Exercise: Strict Type Guard',
          instructions: 'Write a function checkExactEquality(a, b) that returns true if a and b have the exact same value AND type, and false otherwise.',
          starterCode: `function checkExactEquality(a, b) {
  // Use strict equality operator:
  return /* your code here */;
}

console.log(checkExactEquality(10, "10")); // Should be false
console.log(checkExactEquality(10, 10));   // Should be true`,
          solutionCode: `function checkExactEquality(a, b) {
  return a === b;
}

console.log(checkExactEquality(10, "10"));
console.log(checkExactEquality(10, 10));`,
          hints: ['Use the === operator: return a === b;'],
          testCases: [
            {
              name: 'checkExactEquality(10, "10") is false and (10, 10) is true',
              expectedOutput: `false\ntrue`
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-eq-1',
            type: 'predict-output',
            difficulty: 'Interview Trap',
            topic: 'Equality',
            moduleTitle: 'JavaScript Fundamentals',
            question: 'What is the output of the following statement?',
            codeSnippet: `console.log([] == 0);`,
            options: ['true', 'false', 'TypeError', 'undefined'],
            correctAnswer: 0,
            explanation: '[] is coerced to a primitive using [].toString(), which gives "". Then "" == 0 coerces "" to number 0, resulting in 0 == 0 which is true!'
          },
          {
            id: 'q-eq-2',
            type: 'predict-output',
            difficulty: 'Interview Trap',
            topic: 'Equality',
            moduleTitle: 'JavaScript Fundamentals',
            question: 'What is the output of the following statement?',
            codeSnippet: `console.log(NaN === NaN);`,
            options: ['true', 'false', 'TypeError', 'undefined'],
            correctAnswer: 1,
            explanation: 'NaN is not equal to anything, including itself. NaN === NaN is false. Always use Number.isNaN() to test for NaN.'
          }
        ]
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Module 2: Programming Fundamentals',
    shortDesc: 'Master conditional logic, loops, function signatures, lexical scope, array transformations, and core placement algorithms.',
    badge: 'Logic & Problem Solving',
    iconName: 'Cpu',
    estimatedHours: 6,
    lessons: [
      {
        id: 'prog-if-else',
        moduleId: 'module-2',
        title: 'if/else statements & Conditions',
        durationMinutes: 25,
        importance: 'Fundamental',
        summary: 'Control program flow with conditionals, nested branching, truthy/falsy evaluation, and ternary operator patterns.',
        simpleExplanation: [
          'Conditional statements execute different blocks of code based on whether a boolean expression is truthy or falsy.',
          'Structure: if (condition) { ... } else if (otherCondition) { ... } else { ... }',
          'Remember the 8 falsy values: false, 0, -0, 0n, "", null, undefined, NaN. Any other value passed into if (val) evaluates to TRUE.',
          'Ternary operator: condition ? expressionIfTrue : expressionIfFalse. Great for concise inline assignments.'
        ],
        keyPoints: [
          'if conditions automatically coerce expressions to booleans.',
          'Always use === inside if conditions.',
          'Ternary operator is an expression that returns a value.'
        ],
        practicalExamples: [
          {
            title: 'Grading Logic Example',
            explanation: 'Determining placement test qualification.',
            code: `function evaluateCandidate(score) {
  if (score >= 80) {
    return "Direct Interview Qualification";
  } else if (score >= 60) {
    return "Eligible for Secondary Review";
  } else {
    return "Needs 48-Hour Revision";
  }
}

console.log(evaluateCandidate(85));
console.log(evaluateCandidate(55));`,
            expectedOutput: `Direct Interview Qualification
Needs 48-Hour Revision`
          }
        ],
        commonMistakes: [
          {
            mistake: 'Using assignment = instead of comparison === inside if',
            whyItHappens: 'Typo: if (x = 5) assigns 5 to x, which is truthy, so the branch always executes!',
            howToFix: 'Always use === or !== for comparisons.'
          }
        ],
        knowledgeChecks: [
          {
            question: 'What happens if you execute: if ("false") { console.log("Run"); }?',
            options: [
              'It does not run because "false" means false',
              'It runs and prints "Run" because any non-empty string is truthy',
              'It throws a SyntaxError',
              'It runs only in strict mode'
            ],
            correctIndex: 1,
            explanation: 'The string "false" is a non-empty string, and all non-empty strings are truthy in JavaScript!'
          }
        ],
        practiceExercise: {
          id: 'ex-if-else',
          title: 'Exercise: Pass/Fail Classifier',
          instructions: 'Write an if/else check: if score is 70 or higher, print "Status: PASSED", otherwise print "Status: FAILED".',
          starterCode: `let score = 75;

// Write your if/else statement below:
`,
          solutionCode: `let score = 75;
if (score >= 70) {
  console.log("Status: PASSED");
} else {
  console.log("Status: FAILED");
}`,
          hints: ['Use score >= 70 as the condition'],
          testCases: [
            {
              name: 'Outputs Status: PASSED for 75',
              expectedOutput: 'Status: PASSED'
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-if-1',
            type: 'predict-output',
            difficulty: 'Intermediate',
            topic: 'Conditionals',
            moduleTitle: 'Programming Fundamentals',
            question: 'What will be logged by this code?',
            codeSnippet: `let val = [];
if (val) {
  console.log("Branch A");
} else {
  console.log("Branch B");
}`,
            options: ['Branch A', 'Branch B', 'undefined', 'TypeError'],
            correctAnswer: 0,
            explanation: 'An empty array [] is an object, and all objects are truthy. Therefore, Branch A executes.'
          }
        ]
      },
      {
        id: 'prog-switch',
        moduleId: 'module-2',
        title: 'Switch statements',
        durationMinutes: 20,
        importance: 'Fundamental',
        summary: 'Multi-branch decision making using switch, case clauses, strict matching, and the mandatory break statement.',
        simpleExplanation: [
          'A switch statement evaluates an expression and matches its value against multiple case clauses.',
          'Crucial: switch uses STRICT EQUALITY (===) to match cases. Types must match!',
          'The "break" keyword is required at the end of each case; otherwise, execution "falls through" to the next case regardless of whether it matches.'
        ],
        keyPoints: [
          'Switch uses === for comparisons.',
          'Always include break unless fallthrough is intentional.',
          'Use default: as the fallback branch.'
        ],
        practicalExamples: [
          {
            title: 'Role-Based Routing',
            explanation: 'Switch statement with default handler.',
            code: `let testModule = "JS";

switch (testModule) {
  case "HTML":
    console.log("Topic: Markup & Semantics");
    break;
  case "CSS":
    console.log("Topic: Layouts & Styling");
    break;
  case "JS":
    console.log("Topic: Algorithms & Async");
    break;
  default:
    console.log("Topic: Unknown Module");
}`,
            expectedOutput: `Topic: Algorithms & Async`
          }
        ],
        commonMistakes: [
          {
            mistake: 'Omitting the break statement accidentally',
            whyItHappens: 'Forgetting break causes fallthrough to execute subsequent cases.',
            howToFix: 'Ensure every case ends with break or return.'
          }
        ],
        knowledgeChecks: [
          {
            question: 'Does the switch statement use == (loose) or === (strict) equality when matching cases?',
            options: ['== (loose)', '=== (strict)', 'Depends on browser', 'Object.is()'],
            correctIndex: 1,
            explanation: 'JavaScript switch statements strictly compare case values using === without type coercion.'
          }
        ],
        practiceExercise: {
          id: 'ex-switch',
          title: 'Exercise: HTTP Status Code Resolver',
          instructions: 'Use a switch statement on statusCode (200, 404, 500) to log "OK", "Not Found", or "Server Error".',
          starterCode: `let statusCode = 404;

// Switch statement here:
`,
          solutionCode: `let statusCode = 404;
switch (statusCode) {
  case 200:
    console.log("OK");
    break;
  case 404:
    console.log("Not Found");
    break;
  case 500:
    console.log("Server Error");
    break;
}`,
          hints: ['case 404: console.log("Not Found"); break;'],
          testCases: [
            {
              name: 'Outputs Not Found for 404',
              expectedOutput: 'Not Found'
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-sw-1',
            type: 'predict-output',
            difficulty: 'Intermediate',
            topic: 'Switch Fallthrough',
            moduleTitle: 'Programming Fundamentals',
            question: 'What will be output by this code?',
            codeSnippet: `let level = 2;
switch (level) {
  case 1:
    console.log("Junior");
  case 2:
    console.log("Mid");
  case 3:
    console.log("Senior");
    break;
}`,
            options: ['Mid', 'Mid followed by Senior', 'Senior', 'Junior, Mid, Senior'],
            correctAnswer: 1,
            explanation: 'Because case 2 has no "break", execution falls through into case 3, printing both "Mid" and "Senior".'
          }
        ]
      },
      {
        id: 'prog-loops',
        moduleId: 'module-2',
        title: 'For and While Loops',
        durationMinutes: 30,
        importance: 'Critical for Placement Test',
        summary: 'Master standard for-loops, while, do-while, for...of (iterables), for...in (object keys), and break/continue.',
        simpleExplanation: [
          'Loops allow repeating actions until a specified condition becomes false.',
          'for loop: for (initialization; condition; increment) { ... }',
          'while loop: repeats while condition is true. Check condition before running.',
          'do...while: runs AT LEAST ONCE before evaluating the condition.',
          'for...of: iterates over iterable VALUES (arrays, strings, sets).',
          'for...in: iterates over enumerable KEYS/PROPERTIES of an object.'
        ],
        keyPoints: [
          'for...of: for arrays & values.',
          'for...in: for object property keys.',
          'break exits loop immediately; continue skips to next iteration.',
          'Always ensure loop termination condition to prevent infinite loops.'
        ],
        practicalExamples: [
          {
            title: 'for...of vs for...in Comparison',
            explanation: 'Crucial distinction frequently tested.',
            code: `const skills = ["HTML", "CSS", "JS"];

console.log("--- for...in (indexes) ---");
for (let key in skills) {
  console.log(key); // 0, 1, 2
}

console.log("--- for...of (values) ---");
for (let skill of skills) {
  console.log(skill); // HTML, CSS, JS
}`,
            expectedOutput: `--- for...in (indexes) ---
0
1
2
--- for...of (values) ---
HTML
CSS
JS`
          }
        ],
        commonMistakes: [
          {
            mistake: 'Using for...in to iterate over array values',
            whyItHappens: 'Assuming "in" gives values.',
            howToFix: 'for...in gives the property keys (strings "0", "1", etc.). Use for...of to get array values.'
          }
        ],
        knowledgeChecks: [
          {
            question: 'Which loop is guaranteed to execute its code block at least once, even if the condition is false initially?',
            options: ['for loop', 'while loop', 'do...while loop', 'for...in loop'],
            correctIndex: 2,
            explanation: 'A do...while loop evaluates its condition after running the block, guaranteeing at least one execution.'
          }
        ],
        practiceExercise: {
          id: 'ex-loops',
          title: 'Exercise: Sum of Even Numbers',
          instructions: 'Use a for-loop from 1 to 10. Sum all even numbers and log "Even Sum: " followed by the sum.',
          starterCode: `let sum = 0;

// Write loop from i = 1 to 10
// If i is even (i % 2 === 0), add to sum

console.log("Even Sum:", sum);`,
          solutionCode: `let sum = 0;
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    sum += i;
  }
}
console.log("Even Sum:", sum);`,
          hints: ['Check if i % 2 === 0 inside the loop', 'The even numbers are 2, 4, 6, 8, 10 -> Sum is 30'],
          testCases: [
            {
              name: 'Outputs Even Sum: 30',
              expectedOutput: 'Even Sum: 30'
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-loop-1',
            type: 'predict-output',
            difficulty: 'Intermediate',
            topic: 'Loop Closure with var vs let',
            moduleTitle: 'Programming Fundamentals',
            question: 'What is the output of this classic interview snippet?',
            codeSnippet: `for (var i = 0; i < 3; i++) {
  // empty
}
console.log(i);`,
            options: ['3', '2', 'undefined', 'ReferenceError'],
            correctAnswer: 0,
            explanation: 'Because var is not block-scoped, "i" leaks outside the loop. The loop finishes when i reaches 3 (failing i < 3), so console.log(i) prints 3.'
          }
        ]
      },
      {
        id: 'prog-functions',
        moduleId: 'module-2',
        title: 'Functions: Declarations, Arrow & Scope',
        durationMinutes: 35,
        importance: 'Critical for Placement Test',
        summary: 'Function declarations vs expressions, arrow functions, this binding, default parameters, and rest parameters.',
        simpleExplanation: [
          'Functions are reusable blocks of code that take inputs (arguments) and return an output.',
          'Function Declaration: function greet() { ... } (HOISTED completely, can be called before declaration).',
          'Function Expression: const greet = function() { ... } (Not hoisted before initialization).',
          'Arrow Function: const greet = () => { ... } (Concise syntax, lexical "this", no own "arguments" object).',
          'Default parameters: function add(a, b = 0) { return a + b; }'
        ],
        keyPoints: [
          'Declarations are hoisted; arrow functions and expressions are not.',
          'Arrow functions do not bind their own "this"; they inherit "this" from enclosing scope.',
          'If no return statement is specified, a function returns undefined.'
        ],
        practicalExamples: [
          {
            title: 'Hoisting: Declaration vs Arrow Function',
            explanation: 'Observe why function declarations can be called early.',
            code: `console.log(declaredFn()); // Works! Prints: "I was hoisted!"

function declaredFn() {
  return "I was hoisted!";
}

// console.log(arrowFn()); // TypeError: arrowFn is not a function (if var) or ReferenceError (if const)
const arrowFn = () => "I was NOT hoisted!";
console.log(arrowFn());`,
            expectedOutput: `I was hoisted!
I was NOT hoisted!`
          }
        ],
        commonMistakes: [
          {
            mistake: 'Forgetting to return a value in a multi-line arrow function',
            whyItHappens: 'Single line arrows have implicit return: () => 5. Multi-line with {} REQUIRES explicit return!',
            howToFix: 'If you use curly braces {}, always write "return ...".'
          }
        ],
        knowledgeChecks: [
          {
            question: 'What do arrow functions inherit from their parent lexical scope?',
            options: ['Their own prototype', 'The "this" binding and arguments object', 'The this context', 'Global scope only'],
            correctIndex: 2,
            explanation: 'Arrow functions do not have their own "this" context; they lexically inherit "this" from the outer enclosing scope.'
          }
        ],
        practiceExercise: {
          id: 'ex-functions',
          title: 'Exercise: Arrow Function with Default Parameter',
          instructions: 'Create an arrow function named "calculateTotal" that accepts price and tax (default tax is 0.05) and returns price + (price * tax).',
          starterCode: `// Write arrow function calculateTotal here:

const calculateTotal = (price, tax = 0.05) => {
  // your code here
};

console.log("Total:", calculateTotal(100));`,
          solutionCode: `const calculateTotal = (price, tax = 0.05) => {
  return price + (price * tax);
};

console.log("Total:", calculateTotal(100));`,
          hints: ['return price + (price * tax);', '100 + (100 * 0.05) = 105'],
          testCases: [
            {
              name: 'Outputs Total: 105',
              expectedOutput: 'Total: 105'
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-fn-1',
            type: 'predict-output',
            difficulty: 'Intermediate',
            topic: 'Implicit Return',
            moduleTitle: 'Programming Fundamentals',
            question: 'What does this function call return?',
            codeSnippet: `const multiply = (a, b) => { a * b };
console.log(multiply(3, 4));`,
            options: ['12', 'undefined', 'NaN', 'TypeError'],
            correctAnswer: 1,
            explanation: 'Because curly braces {} were used, an explicit "return" statement was required. Without it, the function returns undefined.'
          }
        ]
      },
      {
        id: 'prog-scope-closures',
        moduleId: 'module-2',
        title: 'Scope & Closures',
        durationMinutes: 35,
        importance: 'Critical for Placement Test',
        summary: 'Global, function, and block scope. Closures: functions retaining access to outer variables even after execution finishes.',
        simpleExplanation: [
          'Scope determines where variables can be accessed in your code.',
          'Global Scope: accessible everywhere.',
          'Function Scope: accessible only inside that function (var, let, const).',
          'Block Scope: accessible only inside the { } pair (let, const).',
          'CLOSURE: A closure is the combination of a function bundled together with references to its surrounding lexical environment.',
          'In plain English: A function remembers the variables from the place where it was CREATED, even when executed somewhere else!'
        ],
        keyPoints: [
          'Lexical scoping means inner functions have access to outer scope variables.',
          'Closures enable data privacy (encapsulation) without classes.',
          'Every JavaScript function is a closure.'
        ],
        practicalExamples: [
          {
            title: 'Counter Factory Using Closure',
            explanation: 'Private state that cannot be modified directly from outside.',
            code: `function createCounter() {
  let count = 0; // Private variable!
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counterA = createCounter();
console.log(counterA.increment()); // 1
console.log(counterA.increment()); // 2
console.log(counterA.getCount());  // 2
// count variable is inaccessible directly: counterA.count is undefined!`,
            expectedOutput: `1
2
2`
          }
        ],
        commonMistakes: [
          {
            mistake: 'Believing closures copy variables by value',
            whyItHappens: 'Thinking the closure creates a snapshot at that moment.',
            howToFix: 'Closures keep a live reference to the outer variable, not a static copy.'
          }
        ],
        knowledgeChecks: [
          {
            question: 'What is a closure in JavaScript?',
            options: [
              'A syntax error when a function is not closed with a bracket',
              'A function that retains access to its outer lexical scope even after the outer function has returned',
              'A built-in method that terminates a web browser tab',
              'A way to delete variables from memory'
            ],
            correctIndex: 1,
            explanation: 'A closure gives an inner function persistent access to an outer function’s scope variables even after execution completes.'
          }
        ],
        practiceExercise: {
          id: 'ex-closure',
          title: 'Exercise: Multiplier Closure',
          instructions: 'Create a function createMultiplier(factor) that returns a function which takes a number and returns number * factor.',
          starterCode: `function createMultiplier(factor) {
  // Return an inner function that takes num and returns num * factor
}

const double = createMultiplier(2);
console.log("Double 7:", double(7));`,
          solutionCode: `function createMultiplier(factor) {
  return function(num) {
    return num * factor;
  };
}

const double = createMultiplier(2);
console.log("Double 7:", double(7));`,
          hints: ['return (num) => num * factor;'],
          testCases: [
            {
              name: 'Outputs Double 7: 14',
              expectedOutput: 'Double 7: 14'
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-closure-1',
            type: 'predict-output',
            difficulty: 'Interview Trap',
            topic: 'Closures',
            moduleTitle: 'Programming Fundamentals',
            question: 'What is the output of the following code?',
            codeSnippet: `function outer() {
  let x = 10;
  return function() {
    x += 5;
    return x;
  };
}

const fn = outer();
console.log(fn());
console.log(fn());`,
            options: ['15 followed by 15', '15 followed by 20', 'undefined followed by undefined', '10 followed by 15'],
            correctAnswer: 1,
            explanation: 'The closure maintains state across calls. First call increments x to 15. Second call increments the same x to 20.'
          }
        ]
      },
      {
        id: 'prog-arrays-methods',
        moduleId: 'module-2',
        title: 'Arrays & Array Methods',
        durationMinutes: 40,
        importance: 'Critical for Placement Test',
        summary: 'Master map, filter, reduce, find, includes, slice, splice. Crucial for coding challenges.',
        simpleExplanation: [
          'Arrays are ordered, index-based collections of values.',
          'Modern JavaScript programming heavily relies on functional array methods that do NOT mutate the original array:',
          '- map(): transforms each element and returns a NEW array of equal length.',
          '- filter(): returns a NEW array with elements that satisfy a condition.',
          '- reduce(): boils down an array into a single accumulated value (sum, tally, object).',
          '- find(): returns the FIRST element that matches condition (or undefined).',
          '- includes(): checks if array contains a primitive value (returns boolean).',
          'Mutation warning: push(), pop(), shift(), unshift(), splice(), sort(), reverse() MUTATE the original array!'
        ],
        keyPoints: [
          'map, filter, and slice return NEW arrays (immutable pattern).',
          'splice, push, pop mutate the original array.',
          'reduce syntax: arr.reduce((accumulator, current) => ..., initialValue)'
        ],
        practicalExamples: [
          {
            title: 'Map, Filter & Reduce in Action',
            explanation: 'Transforming applicant scores.',
            code: `const scores = [45, 82, 90, 60, 78];

// Filter passing scores (>= 70)
const passed = scores.filter(s => s >= 70);
console.log("Passed:", passed); // [82, 90, 78]

// Map to curved scores (+5)
const curved = passed.map(s => s + 5);
console.log("Curved:", curved); // [87, 95, 83]

// Reduce to calculate average
const sum = curved.reduce((acc, curr) => acc + curr, 0);
console.log("Average:", Math.round(sum / curved.length));`,
            expectedOutput: `Passed: [ 82, 90, 78 ]
Curved: [ 87, 95, 83 ]
Average: 88`
          }
        ],
        commonMistakes: [
          {
            mistake: 'Confusing slice() with splice()',
            whyItHappens: 'Similar names.',
            howToFix: 'slice(start, end) DOES NOT modify original array. splice(start, deleteCount) MUTATES original array in place!'
          },
          {
            mistake: 'Using map() when you do not need the returned array',
            whyItHappens: 'Treating map as a generic forEach loop.',
            howToFix: 'If you are performing side effects without using the returned array, use forEach() or for...of instead.'
          }
        ],
        knowledgeChecks: [
          {
            question: 'Which method returns a new array containing only elements that return true for a predicate condition?',
            options: ['map()', 'filter()', 'reduce()', 'find()'],
            correctIndex: 1,
            explanation: 'filter() creates a shallow copy of a portion of the array filtered down to just the elements that pass the test.'
          }
        ],
        practiceExercise: {
          id: 'ex-array-methods',
          title: 'Exercise: Double Positive Numbers',
          instructions: 'Given an array of numbers, filter out negative numbers, double the positive numbers, and log the resulting array.',
          starterCode: `const numbers = [-5, 3, -1, 10, 2];

// Filter numbers > 0 and then map to double each:
const result = numbers
  .filter(n => n > 0)
  .map(n => n * 2);

console.log("Result:", result);`,
          solutionCode: `const numbers = [-5, 3, -1, 10, 2];
const result = numbers
  .filter(n => n > 0)
  .map(n => n * 2);

console.log("Result:", result);`,
          hints: ['filter(n => n > 0) followed by map(n => n * 2)'],
          testCases: [
            {
              name: 'Outputs Result: [ 6, 20, 4 ]',
              expectedOutput: 'Result: [ 6, 20, 4 ]'
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-arr-1',
            type: 'predict-output',
            difficulty: 'Intermediate',
            topic: 'Array Methods',
            moduleTitle: 'Programming Fundamentals',
            question: 'What is the value of result after this code runs?',
            codeSnippet: `const nums = [1, 2, 3];
const result = nums.map(x => {
  x * 2;
});
console.log(result);`,
            options: ['[2, 4, 6]', '[undefined, undefined, undefined]', '[1, 2, 3]', 'TypeError'],
            correctAnswer: 1,
            explanation: 'Notice the arrow function has curly braces { x * 2; } but no "return" keyword! It implicitly returns undefined for each item.'
          }
        ]
      },
      {
        id: 'prog-objects-strings',
        moduleId: 'module-2',
        title: 'Objects, Destructuring & Strings',
        durationMinutes: 30,
        importance: 'High Frequency',
        summary: 'Key-value pairs, property access, object destructuring, spread operator, template literals, and string methods.',
        simpleExplanation: [
          'Objects store keyed collections of complex data.',
          'Accessing properties: dot notation (obj.name) or bracket notation (obj["name"]). Use bracket notation when key is dynamic or contains hyphens.',
          'Destructuring: unpack properties into distinct variables: const { name, age } = user;',
          'Spread operator (...): creates shallow copies or merges objects: const merged = { ...obj1, ...obj2 };',
          'String methods: toUpperCase(), toLowerCase(), trim(), split(), slice(), replace(), includes().'
        ],
        keyPoints: [
          'Object.keys(), Object.values(), Object.entries() return arrays for iteration.',
          'Destructuring provides clean property extraction and default values.',
          'Strings in JavaScript are immutable; string methods return new strings.'
        ],
        practicalExamples: [
          {
            title: 'Destructuring and Spread in Practice',
            explanation: 'Clean data manipulation.',
            code: `const candidate = {
  id: "IT-2026",
  name: "Farhan",
  location: "Dhaka",
  skills: ["HTML", "CSS"]
};

// Destructuring with renaming & defaults:
const { name, location: city, rating = "Pending" } = candidate;
console.log(name, "lives in", city, "- Rating:", rating);

// Spread into updated candidate:
const updatedCandidate = { ...candidate, rating: "A+" };
console.log("Updated rating:", updatedCandidate.rating);`,
            expectedOutput: `Farhan lives in Dhaka - Rating: Pending
Updated rating: A+`
          }
        ],
        commonMistakes: [
          {
            mistake: 'Assuming the spread operator (...) performs deep clone',
            whyItHappens: 'It copies top-level properties.',
            howToFix: 'Spread does a shallow copy. Nested objects or arrays still share references. Use structuredClone(obj) for deep copying.'
          }
        ],
        knowledgeChecks: [
          {
            question: 'How do you extract property "email" from an object "user" into a variable using ES6 destructuring?',
            options: ['const user = email;', 'const { email } = user;', 'const [ email ] = user;', 'user.destruct("email");'],
            correctIndex: 1,
            explanation: 'Object destructuring syntax uses curly braces: const { email } = user;'
          }
        ],
        practiceExercise: {
          id: 'ex-obj-destruct',
          title: 'Exercise: Object Destructuring',
          instructions: 'Destructure "title" and "deadlineHours" from the testConfig object and print them formatted.',
          starterCode: `const testConfig = {
  title: "Itransition Technical Test",
  deadlineHours: 48,
  passingScore: 70
};

// Destructure title and deadlineHours:


console.log(title + " - " + deadlineHours + "h");`,
          solutionCode: `const testConfig = {
  title: "Itransition Technical Test",
  deadlineHours: 48,
  passingScore: 70
};

const { title, deadlineHours } = testConfig;

console.log(title + " - " + deadlineHours + "h");`,
          hints: ['const { title, deadlineHours } = testConfig;'],
          testCases: [
            {
              name: 'Outputs Itransition Technical Test - 48h',
              expectedOutput: 'Itransition Technical Test - 48h'
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-obj-1',
            type: 'predict-output',
            difficulty: 'Intermediate',
            topic: 'Object References',
            moduleTitle: 'Programming Fundamentals',
            question: 'What is logged by the following code?',
            codeSnippet: `const a = { x: 1 };
const b = a;
b.x = 2;
console.log(a.x);`,
            options: ['1', '2', 'undefined', 'ReferenceError'],
            correctAnswer: 1,
            explanation: 'Variables a and b point to the exact same object reference in memory. Mutating b.x also mutates a.x.'
          }
        ]
      },
      {
        id: 'prog-basic-algorithms',
        moduleId: 'module-2',
        title: 'Basic Algorithms for Placement Tests',
        durationMinutes: 45,
        importance: 'Critical for Placement Test',
        summary: 'Reverse a string, check palindrome, FizzBuzz, find max number, and count character occurrences.',
        simpleExplanation: [
          'Technical placement tests frequently include short algorithm challenges to assess your problem-solving logic.',
          'Key algorithms to memorize and understand:',
          '1. Reverse a string: str.split("").reverse().join("") or using a decremental loop.',
          '2. Palindrome check: check if str === reversedStr.',
          '3. FizzBuzz: for 1..n, if divisible by 15 "FizzBuzz", if 3 "Fizz", if 5 "Buzz", else number.',
          '4. Find max in array: Math.max(...arr) or loop with a max tracker.',
          '5. Count character frequencies using an object hash map.'
        ],
        keyPoints: [
          'Always check edge cases: empty strings, single element arrays, negative numbers.',
          'Break down problems into small logical steps before writing code.'
        ],
        practicalExamples: [
          {
            title: 'Palindrome Algorithm',
            explanation: 'Checking if a word reads the same forwards and backwards.',
            code: `function isPalindrome(str) {
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  const reversed = cleanStr.split("").reverse().join("");
  return cleanStr === reversed;
}

console.log("racecar:", isPalindrome("racecar")); // true
console.log("frontend:", isPalindrome("frontend")); // false`,
            expectedOutput: `racecar: true
frontend: false`
          }
        ],
        commonMistakes: [
          {
            mistake: 'In FizzBuzz, checking divisible by 3 before checking divisible by 15',
            whyItHappens: 'If you check i % 3 === 0 first, 15 will match Fizz and never reach FizzBuzz.',
            howToFix: 'Check the most specific condition (i % 15 === 0) first!'
          }
        ],
        knowledgeChecks: [
          {
            question: 'What is the most idiomatic 1-line way to reverse a string in JavaScript?',
            options: [
              'str.reverse()',
              'str.split("").reverse().join("")',
              'str.flip()',
              'Array.reverse(str)'
            ],
            correctIndex: 1,
            explanation: 'Strings do not have a .reverse() method. You split the string into an array of characters, reverse the array, and join it back into a string.'
          }
        ],
        practiceExercise: {
          id: 'ex-reverse-string',
          title: 'Exercise: Reverse a String Function',
          instructions: 'Implement reverseString(word) to return the reversed string.',
          starterCode: `function reverseString(word) {
  // your code here:
}

console.log(reverseString("Itransition"));`,
          solutionCode: `function reverseString(word) {
  return word.split("").reverse().join("");
}

console.log(reverseString("Itransition"));`,
          hints: ['word.split("").reverse().join("")'],
          testCases: [
            {
              name: 'Reverses Itransition to noitisnarIt',
              expectedOutput: 'noitisnarIt'
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-algo-1',
            type: 'code-challenge',
            difficulty: 'Intermediate',
            topic: 'Algorithms',
            moduleTitle: 'Programming Fundamentals',
            question: 'What will be returned for FizzBuzz when i = 30?',
            options: ['Fizz', 'Buzz', 'FizzBuzz', '30'],
            correctAnswer: 2,
            explanation: '30 is divisible by both 3 and 5 (30 % 15 === 0), so it outputs "FizzBuzz".'
          }
        ]
      }
    ]
  },
  {
    id: 'module-3',
    title: 'Module 3: HTML',
    shortDesc: 'Structure web documents, forms, input types, semantic accessibility, and key attributes expected in front-end tests.',
    badge: 'Structure & Accessibility',
    iconName: 'Layout',
    estimatedHours: 3,
    lessons: [
      {
        id: 'html-document-structure',
        moduleId: 'module-3',
        title: 'HTML Document Structure',
        durationMinutes: 20,
        importance: 'Fundamental',
        summary: 'Understand <!DOCTYPE html>, <html>, <head>, <body>, meta viewport, and browser rendering fundamentals.',
        simpleExplanation: [
          'HTML (HyperText Markup Language) provides the skeleton and structural meaning of web pages.',
          'Every standard HTML5 document starts with `<!DOCTYPE html>` which tells the browser to render the page in standard standards mode (avoiding Quirks mode).',
          '<head> contains machine-readable metadata: charset, title, meta viewport (crucial for mobile responsiveness), and linked stylesheets.',
          '<body> contains visible page content: text, images, forms, buttons.'
        ],
        keyPoints: [
          '<!DOCTYPE html> ensures standards-compliant rendering.',
          '<meta name="viewport" content="width=device-width, initial-scale=1.0"> is essential for responsive design.',
          '<title> sets the browser tab title and search engine display.'
        ],
        practicalExamples: [
          {
            title: 'Standard HTML5 Boilerplate',
            explanation: 'The minimal valid boilerplate for every modern website.',
            code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PrepForge Portal</title>
</head>
<body>
  <h1>Welcome to Front-end Prep</h1>
  <p>Your 48-hour journey begins here.</p>
</body>
</html>`,
            expectedOutput: `(Renders clean page with H1 heading and paragraph text)`,
            language: 'html'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Putting visible content tags inside the <head> tag',
            whyItHappens: 'Misunderstanding the role of <head>.',
            howToFix: 'Only metadata, links, styles, and title belong in <head>. Visible markup belongs in <body>.'
          }
        ],
        knowledgeChecks: [
          {
            question: 'What is the purpose of `<meta name="viewport" content="width=device-width, initial-scale=1.0">`?',
            options: [
              'It turns on dark mode automatically',
              'It controls viewport width and scaling so the site renders properly on mobile devices',
              'It translates the page into the user’s local language',
              'It accelerates GPU hardware rendering'
            ],
            correctIndex: 1,
            explanation: 'The viewport meta tag tells mobile browsers to set screen width to the device width and scale at 1.0, enabling responsive CSS media queries.'
          }
        ],
        practiceExercise: {
          id: 'ex-html-struct',
          title: 'Exercise: Identify Valid Boilerplate Elements',
          instructions: 'Output the exact name of the DOCTYPE declaration that activates HTML5 standards mode in modern browsers.',
          starterCode: `// Log the HTML5 doctype declaration string (e.g. "<!DOCTYPE html>")
console.log("<!DOCTYPE html>");`,
          solutionCode: `console.log("<!DOCTYPE html>");`,
          hints: ['Log "<!DOCTYPE html>"'],
          testCases: [
            {
              name: 'Outputs <!DOCTYPE html>',
              expectedOutput: '<!DOCTYPE html>'
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-html-1',
            type: 'mcq',
            difficulty: 'Beginner',
            topic: 'HTML Structure',
            moduleTitle: 'HTML',
            question: 'Which HTML element must be the parent of `<head>` and `<body>`?',
            options: ['<!DOCTYPE>', '<main>', '<html>', '<doctype>'],
            correctAnswer: 2,
            explanation: 'The `<html>` element is the root element that wraps the `<head>` and `<body>`.'
          }
        ]
      },
      {
        id: 'html-forms-inputs',
        moduleId: 'module-3',
        title: 'Forms and Input Types',
        durationMinutes: 30,
        importance: 'Critical for Placement Test',
        summary: 'Form elements, GET vs POST methods, input types (text, email, password, radio, checkbox), labels, and validation attributes.',
        simpleExplanation: [
          'Forms allow users to enter data and send it to a server.',
          'Always associate `<label>` with `<input>` using the `for` attribute matching the input\'s `id`. This is critical for accessibility and usability (clicking the label focuses the input).',
          'Input types: text, email (built-in format validation), password (masked input), radio (single selection in a group with same name), checkbox (multiple selections).',
          'Built-in validation attributes: required, minlength, maxlength, pattern, min, max.'
        ],
        keyPoints: [
          '<label for="id"> matches <input id="id">.',
          'Radio buttons in the same question must share the exact same `name` attribute.',
          '<button type="submit"> triggers form submission.'
        ],
        practicalExamples: [
          {
            title: 'Accessible Registration Form',
            explanation: 'Standard form layout with validation attributes.',
            code: `<form action="/submit" method="POST">
  <div>
    <label for="fullName">Full Name:</label>
    <input type="text" id="fullName" name="fullName" required minlength="3">
  </div>
  <div>
    <label for="email">Email Address:</label>
    <input type="email" id="email" name="email" required>
  </div>
  <button type="submit">Submit Application</button>
</form>`,
            expectedOutput: `(Form with validated Name and Email inputs and submit button)`,
            language: 'html'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Grouping radio buttons without giving them the same "name" attribute',
            whyItHappens: 'Forgetting that browser groups radios by their name attribute.',
            howToFix: 'Give all radio options in a question the same name (e.g. name="gender").'
          }
        ],
        knowledgeChecks: [
          {
            question: 'What happens if two radio buttons have different "name" attributes?',
            options: [
              'The browser automatically merges them',
              'The user can select both simultaneously because they belong to different groups',
              'The form will fail to submit',
              'The labels become hidden'
            ],
            correctIndex: 1,
            explanation: 'Radio buttons only mutually exclude each other when they share the exact same `name` attribute.'
          }
        ],
        practiceExercise: {
          id: 'ex-form-radio',
          title: 'Exercise: Form Radio Grouping',
          instructions: 'Log the attribute name that ensures only one radio button can be selected at a time in a group.',
          starterCode: `// Log the attribute name: e.g. "name"
console.log("name");`,
          solutionCode: `console.log("name");`,
          hints: ['Log "name"'],
          testCases: [
            {
              name: 'Outputs name',
              expectedOutput: 'name'
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-form-1',
            type: 'mcq',
            difficulty: 'Beginner',
            topic: 'HTML Forms',
            moduleTitle: 'HTML',
            question: 'Which attribute connects a `<label>` element directly to an `<input>` for screen readers and click targeting?',
            options: ['target', 'for', 'href', 'bind'],
            correctAnswer: 1,
            explanation: 'The `for` attribute of the `<label>` corresponds to the `id` of the form `<input>`.'
          }
        ]
      },
      {
        id: 'html-semantic-html',
        moduleId: 'module-3',
        title: 'Semantic HTML & Accessibility',
        durationMinutes: 25,
        importance: 'Critical for Placement Test',
        summary: 'Why <div> soup is bad. Learn <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>, and alt text.',
        simpleExplanation: [
          'Semantic HTML means using HTML tags that convey their MEANING to both the browser and developer, rather than generic `<div>` and `<span>`.',
          'Benefits: superior SEO rankings, screen reader accessibility for visually impaired users, cleaner maintainable code.',
          'Key Semantic Elements:',
          '- `<header>`: introductory content or navigation container.',
          '- `<nav>`: major navigational links.',
          '- `<main>`: dominant, unique content of the page (only one per document!).',
          '- `<article>`: self-contained piece of content that could be distributed independently (e.g., blog post, forum card).',
          '- `<section>`: thematic grouping of content with a heading.',
          '- `<aside>`: tangentially related content (sidebar, callouts).',
          '- `<footer>`: author, copyright, footnotes.'
        ],
        keyPoints: [
          'Never replace buttons with clickable divs without ARIA and keyboard handling.',
          'Only one `<main>` tag per document.',
          'Always supply meaningful `alt` attributes on `<img>` tags.'
        ],
        practicalExamples: [
          {
            title: 'Semantic Page Skeleton',
            explanation: 'Modern accessible web page structure.',
            code: `<header>
  <h1>PrepForge Portal</h1>
  <nav>
    <a href="#lessons">Lessons</a>
    <a href="#mock">Mock Exam</a>
  </nav>
</header>

<main>
  <article>
    <h2>JavaScript Closures</h2>
    <p>A closure gives you access to an outer function's scope...</p>
  </article>
</main>

<footer>
  <p>&copy; 2026 PrepForge - Placement Prep</p>
</footer>`,
            expectedOutput: `(Structured document accessible to screen readers and SEO spiders)`,
            language: 'html'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Using `<div onclick="...">` instead of `<button>`',
            whyItHappens: 'Thinking styling a div is easier.',
            howToFix: 'A div is not focusable via keyboard tab key and does not emit Enter/Space key events. Always use `<button>`.'
          }
        ],
        knowledgeChecks: [
          {
            question: 'How many `<main>` elements should appear as direct children of the document in a standard HTML page?',
            options: ['As many as needed', 'Exactly 1', 'At least 3', 'None, main is deprecated'],
            correctIndex: 1,
            explanation: 'A document must not have more than one `<main>` element to represent the primary unique content of the document.'
          }
        ],
        practiceExercise: {
          id: 'ex-semantic',
          title: 'Exercise: Identify Navigation Tag',
          instructions: 'Log the semantic HTML tag name used to enclose major navigation links.',
          starterCode: `// Log the tag name: "nav"
console.log("nav");`,
          solutionCode: `console.log("nav");`,
          hints: ['Log "nav"'],
          testCases: [
            {
              name: 'Outputs nav',
              expectedOutput: 'nav'
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-sem-1',
            type: 'mcq',
            difficulty: 'Intermediate',
            topic: 'Semantic HTML',
            moduleTitle: 'HTML',
            question: 'Which semantic element is best suited for an independent, self-contained piece of content like a blog post or tweet?',
            options: ['<div>', '<section>', '<article>', '<aside>'],
            correctAnswer: 2,
            explanation: '`<article>` represents a complete, self-contained composition in a document, page, application, or site and that is, in principle, independently distributable.'
          }
        ]
      }
    ]
  },
  {
    id: 'module-4',
    title: 'Module 4: CSS',
    shortDesc: 'Box model, specificity calculation, flexbox layouts, grid mechanics, and responsive design queries.',
    badge: 'Styling & Layouts',
    iconName: 'Paintbrush',
    estimatedHours: 5,
    lessons: [
      {
        id: 'css-box-model',
        moduleId: 'module-4',
        title: 'The CSS Box Model',
        durationMinutes: 30,
        importance: 'Critical for Placement Test',
        summary: 'Content, padding, border, margin. box-sizing: content-box vs border-box. Margin collapsing.',
        simpleExplanation: [
          'Every HTML element rendered on a page is treated as a rectangular box.',
          'The Box Model layers from inside to outside:',
          '1. CONTENT: Where text and images appear.',
          '2. PADDING: Transparent clearance around the content (inside the border).',
          '3. BORDER: A border surrounding the padding and content.',
          '4. MARGIN: Transparent clearance outside the border (spacing between elements).',
          'THE CRUCIAL INTERVIEW TOPIC: box-sizing!',
          '- content-box (Default): width = content only. Total element width = width + padding + border!',
          '- border-box (Modern Standard): width = content + padding + border! If you set width: 200px, padding: 20px, the total width remains exactly 200px.'
        ],
        keyPoints: [
          '* { box-sizing: border-box; } is the universal reset used in modern web development.',
          'Vertical margins collapse into the largest single margin between adjacent block elements.',
          'Padding adds space inside; margin adds space outside.'
        ],
        visualDemo: {
          type: 'box-model',
          title: 'Interactive Box Model Visualizer',
          description: 'Adjust margin, border, padding, and toggle box-sizing to visualize sizing calculations.'
        },
        practicalExamples: [
          {
            title: 'content-box vs border-box calculation',
            explanation: 'Why border-box prevents broken layout overflows.',
            code: `/* With content-box: */
.box1 {
  box-sizing: content-box;
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* Actual rendered width: 200 + 40 (left+right padding) + 10 (borders) = 250px! */
}

/* With border-box: */
.box2 {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* Actual rendered width is EXACTLY 200px. Content shrinks automatically. */
}`,
            expectedOutput: `Box 1 rendered width: 250px
Box 2 rendered width: 200px`,
            language: 'css'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Not knowing why a 50% width box overflows when padding is added',
            whyItHappens: 'Default box-sizing: content-box adds padding on top of 50%.',
            howToFix: 'Set `box-sizing: border-box;` on all elements.'
          }
        ],
        knowledgeChecks: [
          {
            question: 'If an element has width: 100px, padding: 10px, border: 2px, and `box-sizing: content-box`, what is its total rendered width?',
            options: ['100px', '112px', '124px', '120px'],
            correctIndex: 2,
            explanation: 'Under content-box: Total width = width (100) + left/right padding (10 + 10 = 20) + left/right border (2 + 2 = 4) = 124px.'
          }
        ],
        practiceExercise: {
          id: 'ex-box-calc',
          title: 'Exercise: Calculate Total Element Width',
          instructions: 'Given width = 150, padding = 15, border = 5 under content-box, log the total width as a number.',
          starterCode: `const width = 150;
const padding = 15;
const border = 5;

// Total width = width + 2*padding + 2*border
const totalWidth = width + (2 * padding) + (2 * border);

console.log("Total:", totalWidth);`,
          solutionCode: `const width = 150;
const padding = 15;
const border = 5;
const totalWidth = width + (2 * padding) + (2 * border);
console.log("Total:", totalWidth);`,
          hints: ['150 + 30 + 10 = 190'],
          testCases: [
            {
              name: 'Outputs Total: 190',
              expectedOutput: 'Total: 190'
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-box-1',
            type: 'mcq',
            difficulty: 'Interview Trap',
            topic: 'Box Model',
            moduleTitle: 'CSS',
            question: 'What is the effect of setting `box-sizing: border-box` on an element?',
            options: [
              'It hides the border of the box',
              'The element width includes content, padding, and border',
              'Margin is included inside the width calculation',
              'It forces the box to be inline'
            ],
            correctAnswer: 1,
            explanation: 'With border-box, the width and height properties include content, padding, and border, keeping the overall outer dimensions predictable.'
          }
        ]
      },
      {
        id: 'css-flexbox',
        moduleId: 'module-4',
        title: 'Flexbox Layouts',
        durationMinutes: 35,
        importance: 'Critical for Placement Test',
        summary: 'Main axis vs cross axis, justify-content, align-items, flex-direction, flex-wrap, and flex-grow/shrink.',
        simpleExplanation: [
          'Flexbox (Flexible Box Layout) is a 1-dimensional CSS layout model designed to distribute space along a row or column.',
          'To activate: `display: flex;` on the PARENT container.',
          'Core Concept: The Two Axes:',
          '- MAIN AXIS: Controlled by `flex-direction` (row by default, or column). `justify-content` aligns items along the main axis.',
          '- CROSS AXIS: Perpendicular to the main axis. `align-items` aligns items along the cross axis.',
          'How to perfectly center a child in CSS (Classic test question!):',
          'display: flex; justify-content: center; align-items: center;'
        ],
        keyPoints: [
          'justify-content: flex-start | center | flex-end | space-between | space-around | space-evenly.',
          'align-items: stretch | flex-start | center | flex-end | baseline.',
          'flex: 1 is shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0%.'
        ],
        visualDemo: {
          type: 'flexbox',
          title: 'Interactive Flexbox Playground',
          description: 'Switch justify-content, align-items, and direction live and inspect layout adjustments.'
        },
        practicalExamples: [
          {
            title: 'The Holy Grail of Centering',
            explanation: 'Centering any element horizontally and vertically in 3 lines of CSS.',
            code: `.parent-container {
  display: flex;
  justify-content: center; /* Main axis alignment (horizontal in row) */
  align-items: center;     /* Cross axis alignment (vertical in row) */
  height: 100vh;
}

.child-card {
  width: 300px;
  padding: 24px;
}`,
            expectedOutput: `(Child card appears dead center on the screen)`,
            language: 'css'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Applying justify-content or align-items to the child element instead of the parent container',
            whyItHappens: 'Thinking the alignment property belongs on the item being moved.',
            howToFix: 'justify-content and align-items are set on the FLEX CONTAINER (parent).'
          }
        ],
        knowledgeChecks: [
          {
            question: 'When `flex-direction: column` is set, which property controls the HORIZONTAL alignment of items?',
            options: ['justify-content', 'align-items', 'text-align', 'float'],
            correctIndex: 1,
            explanation: 'When flex-direction is column, the main axis becomes vertical, which means the cross axis becomes horizontal! Therefore, `align-items` controls horizontal alignment.'
          }
        ],
        practiceExercise: {
          id: 'ex-flex-center',
          title: 'Exercise: Flexbox Centering Properties',
          instructions: 'Log the two flexbox property values needed to center an element along both axes in a row container: "center center".',
          starterCode: `// Log "center center"
console.log("center center");`,
          solutionCode: `console.log("center center");`,
          hints: ['Log "center center"'],
          testCases: [
            {
              name: 'Outputs center center',
              expectedOutput: 'center center'
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-flex-1',
            type: 'mcq',
            difficulty: 'Intermediate',
            topic: 'Flexbox',
            moduleTitle: 'CSS',
            question: 'Which flexbox property distributes items evenly so that the first item is flush with the start and the last item is flush with the end edge?',
            options: ['space-around', 'space-between', 'space-evenly', 'stretch'],
            correctAnswer: 1,
            explanation: '`justify-content: space-between` places the first item at the start edge and the last item at the end edge, distributing remaining space between items.'
          }
        ]
      },
      {
        id: 'css-selectors-specificity',
        moduleId: 'module-4',
        title: 'Selectors & Specificity',
        durationMinutes: 30,
        importance: 'Critical for Placement Test',
        summary: 'Learn specificity scoring (Inline > ID > Class/Attribute/Pseudo > Element) and rule resolution.',
        simpleExplanation: [
          'When multiple conflicting CSS rules target the same HTML element, the browser calculates SPECIFICITY to determine which style wins.',
          'Specificity Hierarchy (Weight 4-column tuple: Inline, ID, Class, Element):',
          '1. Inline styles (`style="..."`): Score 1,0,0,0 (beats everything except !important).',
          '2. IDs (`#header`): Score 0,1,0,0.',
          '3. Classes, attributes, pseudo-classes (`.card`, `[type="text"]`, `:hover`): Score 0,0,1,0.',
          '4. Element / Type selectors & pseudo-elements (`div`, `p`, `::before`): Score 0,0,0,1.',
          'Universal selector (`*`) has 0 specificity.',
          '`!important` overrides normal specificity, but should be avoided in production as it breaks cascade maintainability.'
        ],
        keyPoints: [
          '1 ID (0,1,0,0) beats 100 classes (0,0,100,0) — specificity does not carry over between levels!',
          'If two rules have identical specificity, the one declared LATER in the CSS stylesheet wins.'
        ],
        practicalExamples: [
          {
            title: 'Specificity Clash Example',
            explanation: 'Guess which color is applied to the button.',
            code: `/* Specificity: 0, 0, 0, 1 (one element) */
button {
  color: black;
}

/* Specificity: 0, 0, 1, 0 (one class) */
.btn-primary {
  color: blue;
}

/* Specificity: 0, 1, 0, 0 (one ID - WINS!) */
#submit-btn {
  color: green;
}`,
            expectedOutput: `Result: Color is green because #submit-btn has highest specificity (0,1,0,0)`,
            language: 'css'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Using !important to fix styling bugs instead of understanding specificity',
            whyItHappens: 'Quick fix mentality.',
            howToFix: 'Refactor class names or reduce selector nesting rather than applying !important.'
          }
        ],
        knowledgeChecks: [
          {
            question: 'Which of the following selectors has the HIGHEST specificity?',
            options: ['div.container p.intro', 'body header #logo', '#logo.icon', 'nav ul li a:hover'],
            correctIndex: 1,
            explanation: 'Both "body header #logo" and "#logo.icon" have 1 ID. But "#logo.icon" has 1 ID + 1 Class = (0,1,1,0), whereas "body header #logo" has 1 ID + 2 Elements = (0,1,0,2). Actually, #logo.icon (0,1,1,0) beats (0,1,0,2)! Wait, let\'s check: Class is higher than Element! (0,1,1,0) > (0,1,0,2). Correct is #logo.icon.'
          }
        ],
        practiceExercise: {
          id: 'ex-spec-rank',
          title: 'Exercise: Rank Specificity',
          instructions: 'Order these from highest specificity to lowest: "id, class, element". Print the ordered string.',
          starterCode: `// Log "id > class > element"
console.log("id > class > element");`,
          solutionCode: `console.log("id > class > element");`,
          hints: ['Log "id > class > element"'],
          testCases: [
            {
              name: 'Outputs id > class > element',
              expectedOutput: 'id > class > element'
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-spec-1',
            type: 'mcq',
            difficulty: 'Interview Trap',
            topic: 'CSS Specificity',
            moduleTitle: 'CSS',
            question: 'An element has an ID selector `#menu` and an inline style `style="color: red"`. Assuming no `!important`, which color wins?',
            options: ['The ID selector', 'The inline style', 'Whichever was written last', 'Neither, it reverts to browser default'],
            correctAnswer: 1,
            explanation: 'Inline styles have a specificity score of (1,0,0,0), which overrides any ID selector (0,1,0,0).'
          }
        ]
      }
    ]
  },
  {
    id: 'module-5',
    title: 'Module 5: Web Development Concepts',
    shortDesc: 'DOM traversal & manipulation, event delegation & bubbling, HTTP verbs & status codes, Fetch API, and Git workflows.',
    badge: 'Integration & Protocols',
    iconName: 'Globe',
    estimatedHours: 5,
    lessons: [
      {
        id: 'web-dom-manipulation',
        moduleId: 'module-5',
        title: 'DOM Manipulation',
        durationMinutes: 30,
        importance: 'Critical for Placement Test',
        summary: 'querySelector vs getElementById, createElement, appendChild, classList (add, remove, toggle), and textContent vs innerHTML.',
        simpleExplanation: [
          'The DOM (Document Object Model) is a tree-like object representation of the HTML document created by the browser.',
          'Selecting elements:',
          '- document.querySelector("#id" or ".class"): returns the first matching element.',
          '- document.querySelectorAll(".class"): returns a NodeList of all matching elements.',
          'Modifying elements:',
          '- textContent: sets or returns plain text (safe from XSS attacks).',
          '- innerHTML: parses HTML tags inside string (danger: vulnerable to Cross-Site Scripting if user input is unescaped!).',
          '- classList: element.classList.add("active"), element.classList.remove("hidden"), element.classList.toggle("dark").'
        ],
        keyPoints: [
          'Prefer textContent over innerHTML for plain text to prevent XSS security vulnerabilities.',
          'querySelector uses standard CSS selector syntax.',
          'NodeList from querySelectorAll is not an Array, but supports .forEach().'
        ],
        practicalExamples: [
          {
            title: 'Dynamic Element Creation',
            explanation: 'Creating and appending a badge dynamically.',
            code: `// Select container
const container = document.querySelector("#app");

// Create element
const badge = document.createElement("span");
badge.textContent = "Itransition BD Candidate";
badge.classList.add("bg-teal-500", "text-white", "px-2", "py-1", "rounded");

// Append to DOM tree
container.appendChild(badge);`,
            expectedOutput: `(Creates <span class="...">Itransition BD Candidate</span> inside #app)`,
            language: 'javascript'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Using innerHTML with untrusted user input',
            whyItHappens: 'Convenience of inserting HTML strings.',
            howToFix: 'Never use innerHTML with raw user input. Use textContent or sanitize inputs to prevent XSS.'
          }
        ],
        knowledgeChecks: [
          {
            question: 'Why is `element.textContent` preferred over `element.innerHTML` when displaying user-supplied text?',
            options: [
              'textContent is rendered in bold by default',
              'textContent treats the input strictly as text, preventing Cross-Site Scripting (XSS) code injection',
              'innerHTML cannot handle numbers',
              'textContent runs faster on mobile networks'
            ],
            correctIndex: 1,
            explanation: 'textContent treats the input as raw text and does not parse HTML or script tags, making it immune to XSS.'
          }
        ],
        practiceExercise: {
          id: 'ex-dom-selector',
          title: 'Exercise: Select ID with querySelector',
          instructions: 'Log the querySelector string needed to target an element with id="timer": "#timer".',
          starterCode: `// Log the CSS selector string for id timer
console.log("#timer");`,
          solutionCode: `console.log("#timer");`,
          hints: ['Log "#timer"'],
          testCases: [
            {
              name: 'Outputs #timer',
              expectedOutput: '#timer'
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-dom-1',
            type: 'mcq',
            difficulty: 'Intermediate',
            topic: 'DOM Manipulation',
            moduleTitle: 'Web Development Concepts',
            question: 'What does `element.classList.toggle("active")` do?',
            options: [
              'Deletes the element if it has the active class',
              'Adds the class if it is missing, or removes it if it is already present',
              'Renames the class to "inactive"',
              'Throws an error if the class does not exist'
            ],
            correctAnswer: 1,
            explanation: 'toggle() checks if the class exists: if it does, it removes it; if not, it adds it, returning a boolean.'
          }
        ]
      },
      {
        id: 'web-events-bubbling',
        moduleId: 'module-5',
        title: 'Events & Event Bubbling',
        durationMinutes: 35,
        importance: 'Critical for Placement Test',
        summary: 'addEventListener, Event Bubbling vs Capturing, event.stopPropagation(), event.preventDefault(), and Event Delegation.',
        simpleExplanation: [
          'Events are signals that something has happened in the browser (click, keypress, submit, scroll).',
          'Event Propagation has 3 phases: 1. Capturing (top down) -> 2. Target -> 3. Bubbling (bottom up to window).',
          'Event Bubbling: When an event occurs on an element (like a button), it then bubbles up to its parent, then grandparent, all the way to `window`.',
          'event.stopPropagation(): stops the event from bubbling up the DOM tree.',
          'event.preventDefault(): prevents the browser default behavior (e.g., stopping form submit from refreshing page).',
          'EVENT DELEGATION: Instead of adding 100 event listeners to 100 list items, you attach 1 listener to the parent `<ul>` and use `event.target` to know which item was clicked!'
        ],
        keyPoints: [
          'Event delegation relies on event bubbling to save memory and handle dynamically added elements.',
          'event.target is the element that actually triggered the event.',
          'event.currentTarget is the element that owns the event listener.'
        ],
        practicalExamples: [
          {
            title: 'Event Delegation in Practice',
            explanation: 'Handling clicks on any list item with a single parent listener.',
            code: `const list = document.querySelector("#candidateList");

list.addEventListener("click", (event) => {
  // Check if clicked element was an LI or button inside it
  if (event.target.tagName === "LI") {
    console.log("Candidate selected:", event.target.textContent);
  }
});`,
            expectedOutput: `(Clicks on any dynamic <li> item bubble to #candidateList listener)`,
            language: 'javascript'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Confusing event.target with event.currentTarget',
            whyItHappens: 'Both look like "the target".',
            howToFix: 'event.target is the innermost element that was clicked. event.currentTarget is the element the event listener is attached to.'
          }
        ],
        knowledgeChecks: [
          {
            question: 'What pattern attaches a single listener to a parent container instead of multiple listeners to child elements?',
            options: ['Event Bubbling', 'Event Delegation', 'Event Hijacking', 'Event Dispatching'],
            correctIndex: 1,
            explanation: 'Event Delegation is the design pattern of attaching one listener to a parent to manage events for all current and future children via bubbling.'
          }
        ],
        practiceExercise: {
          id: 'ex-event-prevent',
          title: 'Exercise: Prevent Default Form Refresh',
          instructions: 'Output the method name called on an event object to prevent standard form submit page reloading: "event.preventDefault()".',
          starterCode: `// Log "event.preventDefault()"
console.log("event.preventDefault()");`,
          solutionCode: `console.log("event.preventDefault()");`,
          hints: ['Log "event.preventDefault()"'],
          testCases: [
            {
              name: 'Outputs event.preventDefault()',
              expectedOutput: 'event.preventDefault()'
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-evt-1',
            type: 'mcq',
            difficulty: 'Interview Trap',
            topic: 'Event Propagation',
            moduleTitle: 'Web Development Concepts',
            question: 'What is the default direction of event propagation when using standard `element.addEventListener("click", fn)`?',
            options: [
              'Capturing (Window downwards to target)',
              'Bubbling (Target upwards to Window)',
              'Bidirectional simultaneously',
              'Random selection'
            ],
            correctAnswer: 1,
            explanation: 'By default, the third parameter of addEventListener (`useCapture`) is false, which means event listeners trigger during the Bubbling phase.'
          }
        ]
      },
      {
        id: 'web-http-api',
        moduleId: 'module-5',
        title: 'HTTP, Fetch API & JSON',
        durationMinutes: 35,
        importance: 'Critical for Placement Test',
        summary: 'HTTP methods (GET, POST, PUT, DELETE), status codes (200, 201, 400, 401, 404, 500), JSON.stringify/parse, and async/await with fetch.',
        simpleExplanation: [
          'HTTP (HyperText Transfer Protocol) is how clients (browsers) communicate with web servers.',
          'HTTP Verbs: GET (retrieve), POST (create new record), PUT (replace full record), PATCH (partial update), DELETE (remove).',
          'HTTP Status Code Families:',
          '- 2xx (Success): 200 OK, 201 Created.',
          '- 3xx (Redirection): 301 Moved Permanently.',
          '- 4xx (Client Error): 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found.',
          '- 5xx (Server Error): 500 Internal Server Error, 502 Bad Gateway.',
          'Fetch API with async/await:',
          '- fetch() returns a Promise.',
          '- Crucial Interview Trap: fetch() does NOT reject on 404 or 500! It only rejects on network failures. You must check `response.ok`!'
        ],
        keyPoints: [
          'fetch() only rejects on network error, not HTTP 4xx/5xx status codes. Check `response.ok`.',
          'JSON.stringify(obj) converts JS object to JSON string.',
          'JSON.parse(str) converts JSON string back into JS object.'
        ],
        practicalExamples: [
          {
            title: 'Robust Fetch with async/await',
            explanation: 'Proper error checking with response.ok.',
            code: `async function fetchQuestions() {
  try {
    const response = await fetch("https://api.example.com/questions");
    
    // Crucial check:
    if (!response.ok) {
      throw new Error("HTTP Error status: " + response.status);
    }
    
    const data = await response.json();
    console.log("Loaded questions:", data.length);
  } catch (error) {
    console.error("Fetch failed:", error.message);
  }
}`,
            expectedOutput: `(Fetches JSON payload and logs question count safely)`
          }
        ],
        commonMistakes: [
          {
            mistake: 'Assuming fetch().catch() handles HTTP 404 or 500 errors',
            whyItHappens: 'Other libraries like Axios reject on 4xx/5xx.',
            howToFix: 'Always check `if (!response.ok)` after fetch.'
          }
        ],
        knowledgeChecks: [
          {
            question: 'Which HTTP status code indicates that the request was successful and a new resource was created?',
            options: ['200 OK', '201 Created', '204 No Content', '302 Found'],
            correctIndex: 1,
            explanation: 'HTTP 201 Created indicates that the request succeeded and a new resource was created as a result (typically from a POST request).'
          }
        ],
        practiceExercise: {
          id: 'ex-json-parse',
          title: 'Exercise: Parse JSON String',
          instructions: 'Parse the given JSON string using JSON.parse() and log candidate name: "Candidate: " + obj.name.',
          starterCode: `const jsonStr = '{"name":"Afsana","program":"Itransition"}';

// Parse jsonStr using JSON.parse:
const candidate = JSON.parse(jsonStr);

console.log("Candidate: " + candidate.name);`,
          solutionCode: `const jsonStr = '{"name":"Afsana","program":"Itransition"}';
const candidate = JSON.parse(jsonStr);
console.log("Candidate: " + candidate.name);`,
          hints: ['Use JSON.parse(jsonStr)'],
          testCases: [
            {
              name: 'Outputs Candidate: Afsana',
              expectedOutput: 'Candidate: Afsana'
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-http-1',
            type: 'mcq',
            difficulty: 'Intermediate',
            topic: 'HTTP Status Codes',
            moduleTitle: 'Web Development Concepts',
            question: 'Which status code family represents client-side errors (such as missing authentication or invalid request payloads)?',
            options: ['2xx', '3xx', '4xx', '5xx'],
            correctAnswer: 2,
            explanation: '4xx status codes (such as 400 Bad Request, 401 Unauthorized, 404 Not Found) indicate client errors.'
          }
        ]
      },
      {
        id: 'web-git-basics',
        moduleId: 'module-5',
        title: 'Git & GitHub Basics',
        durationMinutes: 20,
        importance: 'Fundamental',
        summary: 'git init, add, commit, status, branch, checkout/switch, merge, and remote GitHub workflow.',
        simpleExplanation: [
          'Git is a distributed version control system that tracks changes in source code during software development.',
          'Core Workflow Stages:',
          '1. Working Directory: where you edit files.',
          '2. Staging Area (`git add .`): prepping changes to be committed.',
          '3. Local Repository (`git commit -m "msg"`): permanent snapshot in history.',
          '4. Remote Repository (`git push origin main`): syncing commits to GitHub.',
          'Branching: `git checkout -b feature-branch` or `git switch -c feature-branch` allows working on isolated features without breaking main.'
        ],
        keyPoints: [
          'git status shows modified, staged, and untracked files.',
          'git commit -m saves a new checkpoint.',
          'Always pull before pushing to avoid rejected fast-forward conflicts.'
        ],
        practicalExamples: [
          {
            title: 'Essential Git Commands Sequence',
            explanation: 'Standard feature branch development workflow.',
            code: `# Check current status
git status

# Stage all modified files
git add .

# Create snapshot with clear message
git commit -m "feat: complete JavaScript fundamentals practice exercises"

# Push branch to GitHub
git push origin feature/js-prep`,
            expectedOutput: `(Commits code and synchronizes with GitHub remote)`,
            language: 'javascript'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Committing node_modules or secret .env files to GitHub',
            whyItHappens: 'Forgetting to create a .gitignore file.',
            howToFix: 'Always include node_modules/ and .env in your .gitignore file before running git add .'
          }
        ],
        knowledgeChecks: [
          {
            question: 'Which command moves files from the working directory to the Git staging index?',
            options: ['git push', 'git commit', 'git add', 'git checkout'],
            correctIndex: 2,
            explanation: '`git add` stages changes for the next commit snapshot.'
          }
        ],
        practiceExercise: {
          id: 'ex-git-commit',
          title: 'Exercise: Git Commit Command',
          instructions: 'Log the exact git command used to commit with message "Initial commit": `git commit -m "Initial commit"`.',
          starterCode: `// Log git commit command
console.log('git commit -m "Initial commit"');`,
          solutionCode: `console.log('git commit -m "Initial commit"');`,
          hints: ['Log `git commit -m "Initial commit"`'],
          testCases: [
            {
              name: 'Outputs git commit -m "Initial commit"',
              expectedOutput: 'git commit -m "Initial commit"'
            }
          ]
        },
        finalAssessment: [
          {
            id: 'q-git-1',
            type: 'mcq',
            difficulty: 'Beginner',
            topic: 'Git',
            moduleTitle: 'Web Development Concepts',
            question: 'What is the purpose of the `.gitignore` file?',
            options: [
              'To encrypt the repository with a password',
              'To specify intentionally untracked files that Git should ignore',
              'To delete files automatically when pushing to GitHub',
              'To speed up CPU processing during build'
            ],
            correctAnswer: 1,
            explanation: '.gitignore specifies intentionally untracked files (such as build artifacts, node_modules, and secret environment files) that Git should ignore.'
          }
        ]
      }
    ]
  }
];
