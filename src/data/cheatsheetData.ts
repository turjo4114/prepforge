export interface CheatCategory {
  title: string;
  badge: string;
  items: {
    title: string;
    code?: string;
    summary: string;
    whyTested: string;
  }[];
}

export const cheatsheetData: CheatCategory[] = [
  {
    title: 'Top 10 JavaScript Interview Traps',
    badge: 'High Frequency',
    items: [
      {
        title: 'typeof null === "object"',
        code: `typeof null; // "object" (1995 legacy bug)`,
        summary: 'null is a primitive, but due to early 32-bit type tagging where 000 was object and NULL was 0x00, typeof returns "object".',
        whyTested: 'Tests if you understand JS engine history and why this cannot be fixed without breaking old sites.'
      },
      {
        title: '[] == ![] evaluates to true',
        code: `[] == ![]; // true`,
        summary: '![] is false. Then [] == false -> [] == 0 -> "" == 0 -> 0 == 0 -> true.',
        whyTested: 'Tests your understanding of the 4 steps of the Abstract Equality Comparison Algorithm.'
      },
      {
        title: 'NaN === NaN is false',
        code: `NaN === NaN; // false\nNumber.isNaN(NaN); // true`,
        summary: 'NaN is not equal to any value, including itself. Always check with Number.isNaN().',
        whyTested: 'Tests whether you know IEEE 754 floating point specifications.'
      },
      {
        title: 'Event Loop Order: Microtasks vs Macrotasks',
        code: `console.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);\n// Output: 1, 4, 3, 2`,
        summary: 'Synchronous stack runs first (1, 4), then Microtask queue (Promises: 3), then Macrotask queue (Timers/I/O: 2).',
        whyTested: 'Tests if you comprehend browser concurrency and asynchronous mechanics.'
      },
      {
        title: 'var in For-Loops with setTimeout',
        code: `for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}\n// Prints: 3, 3, 3 (not 0, 1, 2!)`,
        summary: 'var is function-scoped; all 3 callbacks share the same mutated variable. Use `let` to give each iteration a block-scoped binding.',
        whyTested: 'Classic test of lexical scope vs closure execution timing.'
      },
      {
        title: 'fetch() does not reject on HTTP 404 or 500',
        code: `const res = await fetch(url);\nif (!res.ok) throw new Error("HTTP error " + res.status);`,
        summary: 'fetch() only rejects on network failures. 404 and 500 are valid HTTP responses, so `res.ok` is false but the Promise resolves.',
        whyTested: 'Tests real-world API consumption competence.'
      }
    ]
  },
  {
    title: 'CSS Layout & Specificity Formulas',
    badge: 'Quick Recall',
    items: [
      {
        title: 'Universal Box Sizing Reset',
        code: `*, *::before, *::after {\n  box-sizing: border-box;\n}`,
        summary: 'Ensures padding and border are included in declared width and height, preventing unexpected horizontal scrollbars and broken grid overflows.',
        whyTested: 'Standard industry requirement for modern CSS architectures.'
      },
      {
        title: 'Perfect Flexbox Centering in 3 Lines',
        code: `.container {\n  display: flex;\n  justify-content: center; /* Main axis */\n  align-items: center;     /* Cross axis */\n}`,
        summary: 'Centers child items along both dimensions regardless of height or text length.',
        whyTested: 'The quintessential front-end interview question.'
      },
      {
        title: 'Specificity Hierarchy (Inline > ID > Class > Element)',
        code: `/* (Inline, ID, Class, Element) */\nstyle="..."       /* 1, 0, 0, 0 */\n#main-nav         /* 0, 1, 0, 0 */\n.btn.active:hover /* 0, 0, 3, 0 */\nnav ul li a       /* 0, 0, 0, 4 */`,
        summary: 'A higher category always trumps lower categories. One ID beats 1,000 classes.',
        whyTested: 'Essential for debugging styles in complex component libraries.'
      }
    ]
  },
  {
    title: 'HTTP Status Codes Reference',
    badge: 'Placement Core',
    items: [
      {
        title: '200 OK vs 201 Created',
        summary: '200 is standard successful response for GET/PUT. 201 means a new resource was created, typically returned by POST.',
        whyTested: 'REST API design fundamentals.'
      },
      {
        title: '401 Unauthorized vs 403 Forbidden',
        summary: '401: Client is unauthenticated (log in). 403: Client is authenticated, but forbidden by role permissions.',
        whyTested: 'Authentication & authorization logic.'
      },
      {
        title: '500 vs 502 vs 504',
        summary: '500: Internal Server Error. 502: Bad Gateway (proxy received invalid upstream response). 504: Gateway Timeout.',
        whyTested: 'Production system debugging.'
      }
    ]
  }
];
