import { QuizQuestion } from '../types';

export const mockExamQuestions: QuizQuestion[] = [
  // 1. JS Output Prediction
  {
    id: 'mock-1',
    type: 'predict-output',
    difficulty: 'Interview Trap',
    topic: 'JavaScript Fundamentals',
    moduleTitle: 'JavaScript Fundamentals',
    question: 'What is the output of the following JavaScript code?',
    codeSnippet: `console.log(typeof NaN);
console.log(NaN === NaN);`,
    options: [
      '"undefined" and false',
      '"number" and false',
      '"number" and true',
      '"NaN" and false'
    ],
    correctAnswer: 1,
    explanation: 'In JavaScript, NaN (Not-a-Number) is a special numeric value, so typeof NaN is "number". In IEEE 754 floating point standard, NaN is never equal to anything, including itself, so NaN === NaN is false.'
  },
  // 2. JS Equality
  {
    id: 'mock-2',
    type: 'predict-output',
    difficulty: 'Interview Trap',
    topic: 'JavaScript Fundamentals',
    moduleTitle: 'JavaScript Fundamentals',
    question: 'What will be printed when comparing these values?',
    codeSnippet: `console.log([] == ![]);`,
    options: [
      'true',
      'false',
      'TypeError',
      'undefined'
    ],
    correctAnswer: 0,
    explanation: 'Step 1: ![] is evaluated first. An empty array [] is truthy, so ![] becomes false. Step 2: [] == false. Step 3: When comparing to boolean false, false coerces to number 0. Step 4: [] == 0. [].toString() yields "", and Number("") is 0. 0 == 0 evaluates to true!'
  },
  // 3. JS Hoisting & TDZ
  {
    id: 'mock-3',
    type: 'predict-output',
    difficulty: 'Interview Trap',
    topic: 'JavaScript Fundamentals',
    moduleTitle: 'JavaScript Fundamentals',
    question: 'What happens when this snippet is executed?',
    codeSnippet: `var x = 5;
function test() {
  console.log(x);
  var x = 10;
}
test();`,
    options: [
      '5',
      '10',
      'undefined',
      'ReferenceError: x is not defined'
    ],
    correctAnswer: 2,
    explanation: 'Due to variable hoisting, "var x;" inside function test() is hoisted to the top of test()\'s scope and initialized to undefined, shadowing the outer variable x. Therefore, console.log(x) logs undefined before the assignment x = 10 occurs.'
  },
  // 4. JS Event Loop & Timers
  {
    id: 'mock-4',
    type: 'predict-output',
    difficulty: 'Interview Trap',
    topic: 'JavaScript Fundamentals',
    moduleTitle: 'JavaScript Fundamentals',
    question: 'In what order will the numbers be logged to the console?',
    codeSnippet: `console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);`,
    options: [
      '1, 2, 3, 4',
      '1, 4, 3, 2',
      '1, 4, 2, 3',
      '1, 3, 4, 2'
    ],
    correctAnswer: 1,
    explanation: '1 and 4 are synchronous and run on the main Call Stack immediately. Promise .then() is placed in the Microtask Queue, which executes right after synchronous execution finishes (logging 3). setTimeout is a Macrotask, which executes after all microtasks have cleared (logging 2).'
  },
  // 5. JS Closures
  {
    id: 'mock-5',
    type: 'predict-output',
    difficulty: 'Intermediate',
    topic: 'Programming Fundamentals',
    moduleTitle: 'Programming Fundamentals',
    question: 'What is the output of the following closure code?',
    codeSnippet: `function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}
const add5 = makeAdder(5);
console.log(add5(3));
console.log(add5(7));`,
    options: [
      '8 followed by 12',
      '8 followed by 15',
      'NaN followed by NaN',
      'TypeError: add5 is not a function'
    ],
    correctAnswer: 0,
    explanation: 'add5 forms a closure over variable x = 5. add5(3) returns 5 + 3 = 8. add5(7) returns 5 + 7 = 12.'
  },
  // 6. JS Array Methods
  {
    id: 'mock-6',
    type: 'predict-output',
    difficulty: 'Intermediate',
    topic: 'Programming Fundamentals',
    moduleTitle: 'Programming Fundamentals',
    question: 'What is the value of the `result` variable?',
    codeSnippet: `const numbers = [1, 2, 3, 4, 5];
const result = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 3)
  .reduce((acc, curr) => acc + curr, 0);
console.log(result);`,
    options: [
      '18',
      '24',
      '30',
      '12'
    ],
    correctAnswer: 0,
    explanation: 'filter(n => n % 2 === 0) keeps [2, 4]. map(n => n * 3) transforms it to [6, 12]. reduce((acc, curr) => acc + curr, 0) calculates 6 + 12 = 18.'
  },
  // 7. JS Object Reference
  {
    id: 'mock-7',
    type: 'predict-output',
    difficulty: 'Intermediate',
    topic: 'Programming Fundamentals',
    moduleTitle: 'Programming Fundamentals',
    question: 'What will be logged by the following code?',
    codeSnippet: `const userA = { name: "Tanvir", skills: ["HTML"] };
const userB = { ...userA };
userB.name = "Nayeem";
userB.skills.push("CSS");

console.log(userA.name, userA.skills.length);`,
    options: [
      'Tanvir 1',
      'Tanvir 2',
      'Nayeem 2',
      'Nayeem 1'
    ],
    correctAnswer: 1,
    explanation: 'The spread operator shallow-copies userA. The primitive string property `name` is copied by value (so userA.name stays "Tanvir"), but nested array `skills` is copied by reference. Modifying userB.skills pushes "CSS" to the shared array in heap memory, giving length 2.'
  },
  // 8. JS Rest & Spread
  {
    id: 'mock-8',
    type: 'predict-output',
    difficulty: 'Intermediate',
    topic: 'Programming Fundamentals',
    moduleTitle: 'Programming Fundamentals',
    question: 'What does this function return?',
    codeSnippet: `function calculate(multiplier, ...nums) {
  return nums.map(n => n * multiplier);
}
console.log(calculate(2, 5, 10, 15));`,
    options: [
      '[10, 20, 30]',
      '[2, 5, 10, 15]',
      '30',
      'NaN'
    ],
    correctAnswer: 0,
    explanation: 'multiplier receives 2. The rest parameter ...nums gathers the remaining arguments [5, 10, 15]. Mapping each item by * 2 produces [10, 20, 30].'
  },
  // 9. JS Loop Closure with Var
  {
    id: 'mock-9',
    type: 'predict-output',
    difficulty: 'Interview Trap',
    topic: 'Programming Fundamentals',
    moduleTitle: 'Programming Fundamentals',
    question: 'What will be printed when this loop runs with setTimeout?',
    codeSnippet: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 10);
}`,
    options: [
      '0, 1, 2',
      '3, 3, 3',
      'undefined, undefined, undefined',
      '2, 2, 2'
    ],
    correctAnswer: 1,
    explanation: 'Because "var" is function-scoped rather than block-scoped, there is only one shared binding of variable "i". By the time the asynchronous setTimeout callbacks execute after 10ms, the loop has already terminated with i = 3, so all three callbacks print 3.'
  },
  // 10. JS Logic & Algorithm
  {
    id: 'mock-10',
    type: 'logical-reasoning',
    difficulty: 'Intermediate',
    topic: 'Programming Fundamentals',
    moduleTitle: 'Programming Fundamentals',
    question: 'Given an array `const arr = [10, 25, 4, 88, 3]`, which line of code correctly finds the maximum number?',
    options: [
      'Math.max(arr)',
      'Math.max(...arr)',
      'arr.max()',
      'Array.findMax(arr)'
    ],
    correctAnswer: 1,
    explanation: 'Math.max() expects individual numeric arguments, not an array. Math.max(arr) returns NaN. Using the spread operator `Math.max(...arr)` unpacks the elements into individual arguments.'
  },
  // 11. HTML Semantic Tags
  {
    id: 'mock-11',
    type: 'mcq',
    difficulty: 'Beginner',
    topic: 'HTML',
    moduleTitle: 'HTML',
    question: 'Which HTML5 semantic element is most appropriate for containing tangential content like sidebars, callout boxes, or advertising?',
    options: [
      '<section>',
      '<aside>',
      '<article>',
      '<header>'
    ],
    correctAnswer: 1,
    explanation: 'The `<aside>` element represents a portion of a document whose content is only indirectly related to the document\'s main content, ideal for sidebars and pull-quotes.'
  },
  // 12. HTML Forms & Accessibility
  {
    id: 'mock-12',
    type: 'mcq',
    difficulty: 'Intermediate',
    topic: 'HTML',
    moduleTitle: 'HTML',
    question: 'Which pair of attributes is strictly required to link a `<label>` to its corresponding `<input>` element for accessibility?',
    options: [
      'label `name` and input `name`',
      'label `for` and input `id`',
      'label `id` and input `for`',
      'label `target` and input `href`'
    ],
    correctAnswer: 1,
    explanation: 'The `for` attribute on the `<label>` must match the `id` attribute on the `<input>` so assistive technologies can announce the label and clicking it focuses the input.'
  },
  // 13. HTML Doctypes
  {
    id: 'mock-13',
    type: 'mcq',
    difficulty: 'Beginner',
    topic: 'HTML',
    moduleTitle: 'HTML',
    question: 'What is the primary technical consequence of omitting `<!DOCTYPE html>` from an HTML document?',
    options: [
      'The browser fails to load CSS files',
      'The browser triggers Quirks Mode and emulates 1990s legacy bugs',
      'JavaScript execution is disabled for security',
      'The page is permanently blocked from Google indexing'
    ],
    correctAnswer: 1,
    explanation: 'Omitting the doctype switches modern browsers into Quirks Mode, where layout rules revert to buggy legacy behaviors (such as non-standard box model calculations in older Internet Explorer).'
  },
  // 14. HTML Self-closing Elements
  {
    id: 'mock-14',
    type: 'find-error',
    difficulty: 'Beginner',
    topic: 'HTML',
    moduleTitle: 'HTML',
    question: 'Which of the following is a void (self-closing) element that must NEVER have a closing tag or inner text in HTML5?',
    options: [
      '<button>',
      '<img>',
      '<textarea>',
      '<label>'
    ],
    correctAnswer: 1,
    explanation: '`<img>`, `<br>`, `<hr>`, `<input>`, and `<meta>` are void elements and cannot have closing tags or child content. `<button>`, `<textarea>`, and `<label>` all require closing tags.'
  },
  // 15. CSS Box Model Calculation
  {
    id: 'mock-15',
    type: 'predict-output',
    difficulty: 'Interview Trap',
    topic: 'CSS',
    moduleTitle: 'CSS',
    question: 'Consider the following CSS. What is the total rendered width of this element on screen?',
    codeSnippet: `.card {
  box-sizing: content-box;
  width: 200px;
  padding: 15px;
  border: 5px solid blue;
  margin: 20px;
}`,
    options: [
      '200px',
      '240px',
      '280px',
      '220px'
    ],
    correctAnswer: 1,
    explanation: 'Under content-box, element width on screen = width (200px) + left/right padding (15 + 15 = 30px) + left/right border (5 + 5 = 10px) = 240px. (Margins are outer spacing and do not count toward the element\'s rendered width box).'
  },
  // 16. CSS Border-Box Standard
  {
    id: 'mock-16',
    type: 'mcq',
    difficulty: 'Beginner',
    topic: 'CSS',
    moduleTitle: 'CSS',
    question: 'If `.box` has `box-sizing: border-box`, `width: 300px`, and `padding: 30px`, what is the width of its inner content area?',
    options: [
      '300px',
      '240px',
      '360px',
      '270px'
    ],
    correctAnswer: 1,
    explanation: 'Under border-box, the declared width includes content + padding + border. Content width = 300px - (30px left + 30px right padding) = 240px.'
  },
  // 17. CSS Flexbox Centering
  {
    id: 'mock-17',
    type: 'mcq',
    difficulty: 'Beginner',
    topic: 'CSS',
    moduleTitle: 'CSS',
    question: 'Which CSS declaration combination will center a child element both horizontally and vertically inside a parent flex container?',
    options: [
      'display: flex; align-content: center; text-align: center;',
      'display: flex; justify-content: center; align-items: center;',
      'display: flex; margin: auto; float: center;',
      'display: flex; flex-direction: center; items: center;'
    ],
    correctAnswer: 1,
    explanation: '`justify-content: center` centers along the main axis, and `align-items: center` centers along the cross axis.'
  },
  // 18. CSS Specificity Calculation
  {
    id: 'mock-18',
    type: 'predict-output',
    difficulty: 'Interview Trap',
    topic: 'CSS',
    moduleTitle: 'CSS',
    question: 'Which rule will determine the final text color of the button?',
    codeSnippet: `/* Rule 1 */
nav ul li .btn { color: red; }

/* Rule 2 */
#navbar .btn { color: blue; }

/* Rule 3 */
button.btn.primary { color: green; }`,
    options: [
      'Rule 1 (red) because it has more element selectors',
      'Rule 2 (blue) because it contains an ID selector (#navbar)',
      'Rule 3 (green) because it was declared last',
      'Rule 1 (red) because of cascade hierarchy'
    ],
    correctAnswer: 1,
    explanation: 'Rule 2 has specificity score (0, 1, 1, 0) due to 1 ID (#navbar) and 1 Class (.btn). Rule 1 is (0, 0, 1, 3) and Rule 3 is (0, 0, 2, 1). A single ID beats any number of classes and elements.'
  },
  // 19. CSS Position Fixed vs Absolute
  {
    id: 'mock-19',
    type: 'mcq',
    difficulty: 'Intermediate',
    topic: 'CSS',
    moduleTitle: 'CSS',
    question: 'What is the reference boundary for an element styled with `position: fixed`?',
    options: [
      'Its nearest parent with position: relative',
      'The browser viewport window',
      'The root <html> element always',
      'The nearest block-level container'
    ],
    correctAnswer: 1,
    explanation: 'An element with `position: fixed` is positioned relative to the browser viewport and does not move when the page is scrolled (unless an ancestor has a transform/perspective filter).'
  },
  // 20. CSS Margin Collapsing
  {
    id: 'mock-20',
    type: 'predict-output',
    difficulty: 'Intermediate',
    topic: 'CSS',
    moduleTitle: 'CSS',
    question: 'Two sibling `<div>` elements are stacked vertically. Element 1 has `margin-bottom: 30px`. Element 2 has `margin-top: 20px`. What is the vertical distance between them?',
    options: [
      '50px',
      '30px',
      '20px',
      '10px'
    ],
    correctAnswer: 1,
    explanation: 'In standard CSS block formatting, adjoining vertical margins collapse into a single margin equal to the maximum of the two (Math.max(30, 20) = 30px).'
  },
  // 21. DOM querySelector vs querySelectorAll
  {
    id: 'mock-21',
    type: 'mcq',
    difficulty: 'Beginner',
    topic: 'DOM & Events',
    moduleTitle: 'Web Development Concepts',
    question: 'What does `document.querySelector(".badge")` return if there are five elements with class "badge" on the page?',
    options: [
      'An array containing all 5 elements',
      'Only the FIRST matching element in document tree order',
      'The LAST matching element',
      'A NodeList of 5 elements'
    ],
    correctAnswer: 1,
    explanation: '`querySelector()` returns the first Element within the document that matches the specified selector. To get all of them, you must use `querySelectorAll()`.'
  },
  // 22. DOM Event Propagation
  {
    id: 'mock-22',
    type: 'predict-output',
    difficulty: 'Intermediate',
    topic: 'DOM & Events',
    moduleTitle: 'Web Development Concepts',
    question: 'A button is clicked inside a div. Both have click listeners. What is the execution order by default?',
    codeSnippet: `parentDiv.addEventListener("click", () => console.log("Div clicked"));
childBtn.addEventListener("click", () => console.log("Btn clicked"));`,
    options: [
      '"Div clicked" then "Btn clicked"',
      '"Btn clicked" then "Div clicked"',
      'Only "Btn clicked" executes',
      'Random order depending on browser'
    ],
    correctAnswer: 1,
    explanation: 'By default, event listeners listen during the Bubbling phase. The event fires on the innermost target first ("Btn clicked") and then bubbles up the DOM tree to ancestors ("Div clicked").'
  },
  // 23. DOM Event Delegation
  {
    id: 'mock-23',
    type: 'mcq',
    difficulty: 'Intermediate',
    topic: 'DOM & Events',
    moduleTitle: 'Web Development Concepts',
    question: 'In an event listener attached to a parent element, which property references the actual element that was clicked by the user?',
    options: [
      'event.currentTarget',
      'event.target',
      'event.origin',
      'event.source'
    ],
    correctAnswer: 1,
    explanation: '`event.target` refers to the element that dispatched the event (e.g., the clicked button), while `event.currentTarget` refers to the element to which the event handler is attached.'
  },
  // 24. DOM Prevent Default
  {
    id: 'mock-24',
    type: 'mcq',
    difficulty: 'Beginner',
    topic: 'DOM & Events',
    moduleTitle: 'Web Development Concepts',
    question: 'Why do developers call `event.preventDefault()` inside a form submit handler in single-page applications?',
    options: [
      'To prevent the browser from submitting the form and refreshing/reloading the page',
      'To delete invalid user passwords automatically',
      'To prevent the user from clicking the submit button a second time',
      'To bypass HTTPS security validation'
    ],
    correctAnswer: 0,
    explanation: 'The default browser action for a form submit is to initiate a page navigation/refresh to the action URL. `event.preventDefault()` suppresses this so JS can process data asynchronously via fetch.'
  },
  // 25. Web HTTP Status Codes
  {
    id: 'mock-25',
    type: 'mcq',
    difficulty: 'Beginner',
    topic: 'Web Concepts',
    moduleTitle: 'Web Development Concepts',
    question: 'Which HTTP response status code signifies that the client must authenticate themselves to get the requested response?',
    options: [
      '400 Bad Request',
      '401 Unauthorized',
      '403 Forbidden',
      '404 Not Found'
    ],
    correctAnswer: 1,
    explanation: '401 Unauthorized indicates that the request has not been applied because it lacks valid authentication credentials.'
  },
  // 26. Web HTTP 403 vs 401
  {
    id: 'mock-26',
    type: 'mcq',
    difficulty: 'Intermediate',
    topic: 'Web Concepts',
    moduleTitle: 'Web Development Concepts',
    question: 'What is the key difference between HTTP 401 Unauthorized and HTTP 403 Forbidden?',
    options: [
      '401 means unknown identity (needs login); 403 means identity is known, but access is not permitted (insufficient permissions)',
      '401 is a server error; 403 is a client error',
      '401 is used for GET; 403 is used for POST',
      'There is no difference, they are interchangeable'
    ],
    correctAnswer: 0,
    explanation: '401 means "unauthenticated" (the server doesn\'t know who you are). 403 means "forbidden" (the server knows who you are, but you do not have permission to access the resource).'
  },
  // 27. Web Fetch API Rejection
  {
    id: 'mock-27',
    type: 'predict-output',
    difficulty: 'Interview Trap',
    topic: 'Web Concepts',
    moduleTitle: 'Web Development Concepts',
    question: 'What will happen when calling `fetch()` to an endpoint that returns HTTP 404 Not Found?',
    codeSnippet: `fetch("https://api.example.com/missing-data")
  .then(res => console.log("Resolved:", res.status))
  .catch(err => console.log("Rejected:", err.message));`,
    options: [
      'The catch block runs and prints "Rejected: 404"',
      'The then block runs and prints "Resolved: 404"',
      'The browser throws an uncaught syntax error',
      'fetch() hangs forever'
    ],
    correctAnswer: 1,
    explanation: 'The Promise returned by fetch() rejects ONLY on network failures or DNS errors. An HTTP 404 or 500 error response is still a successful network exchange, so the Promise resolves with `response.ok === false`.'
  },
  // 28. Web Storage: Local vs Session vs Cookie
  {
    id: 'mock-28',
    type: 'mcq',
    difficulty: 'Intermediate',
    topic: 'Web Concepts',
    moduleTitle: 'Web Development Concepts',
    question: 'Which client-side storage mechanism persists data across browser restarts until explicitly cleared by the user or code, without transmitting data in HTTP request headers?',
    options: [
      'sessionStorage',
      'localStorage',
      'HTTP Cookies',
      'Window variables'
    ],
    correctAnswer: 1,
    explanation: '`localStorage` stores key-value pairs with no expiration date, surviving browser closes, and is strictly accessible on the client side without being sent over HTTP headers like cookies.'
  },
  // 29. Git Branching
  {
    id: 'mock-29',
    type: 'mcq',
    difficulty: 'Beginner',
    topic: 'Web Concepts',
    moduleTitle: 'Web Development Concepts',
    question: 'Which Git command creates a new branch named "feature-login" AND switches your working directory directly to it in one step?',
    options: [
      'git branch feature-login',
      'git checkout -b feature-login',
      'git merge feature-login',
      'git commit -b feature-login'
    ],
    correctAnswer: 1,
    explanation: '`git checkout -b <name>` (or `git switch -c <name>`) creates the branch and immediately checks it out.'
  },
  // 30. JS Type Conversion Edge Case
  {
    id: 'mock-30',
    type: 'predict-output',
    difficulty: 'Interview Trap',
    topic: 'JavaScript Fundamentals',
    moduleTitle: 'JavaScript Fundamentals',
    question: 'What is the evaluated output of this expression?',
    codeSnippet: `console.log(+"10" + 20);`,
    options: [
      '"1020"',
      '30',
      'NaN',
      'TypeError'
    ],
    correctAnswer: 1,
    explanation: 'The unary plus operator `+"10"` explicitly coerces the string "10" into the number 10. Then 10 + 20 results in 30.'
  },
  // 31. JS String Immutability
  {
    id: 'mock-31',
    type: 'predict-output',
    difficulty: 'Intermediate',
    topic: 'Programming Fundamentals',
    moduleTitle: 'Programming Fundamentals',
    question: 'What is logged to the console?',
    codeSnippet: `let str = "hello";
str[0] = "H";
console.log(str);`,
    options: [
      '"Hello"',
      '"hello"',
      'TypeError: Cannot assign to read only property',
      'undefined'
    ],
    correctAnswer: 1,
    explanation: 'Strings in JavaScript are immutable primitives. Modifying a string via index access fails silently in non-strict mode (or throws TypeError in strict mode), leaving `str` unchanged as "hello".'
  },
  // 32. CSS Display None vs Visibility Hidden
  {
    id: 'mock-32',
    type: 'mcq',
    difficulty: 'Beginner',
    topic: 'CSS',
    moduleTitle: 'CSS',
    question: 'What is the visual difference between `display: none;` and `visibility: hidden;`?',
    options: [
      '`display: none;` removes the element from document flow and takes no space; `visibility: hidden;` hides the element but preserves its space in the layout',
      '`visibility: hidden;` removes the element completely; `display: none;` only makes it transparent',
      '`display: none;` disables JavaScript events; `visibility: hidden;` does not',
      'They produce identical results in modern browsers'
    ],
    correctAnswer: 0,
    explanation: '`display: none;` removes the element entirely from the rendered layout flow. `visibility: hidden;` makes the element invisible, but its physical box dimensions still occupy layout space.'
  },
  // 33. JS Array Mutation
  {
    id: 'mock-33',
    type: 'find-error',
    difficulty: 'Intermediate',
    topic: 'Programming Fundamentals',
    moduleTitle: 'Programming Fundamentals',
    question: 'Which of the following array methods MUTATES the original array instead of returning a new array copy?',
    options: [
      'arr.concat()',
      'arr.slice()',
      'arr.splice()',
      'arr.map()'
    ],
    correctAnswer: 2,
    explanation: '`splice()` mutates the original array in place by removing or replacing existing elements. `concat()`, `slice()`, and `map()` return new arrays.'
  },
  // 34. Algorithm: Palindrome Logic
  {
    id: 'mock-34',
    type: 'logical-reasoning',
    difficulty: 'Intermediate',
    topic: 'Programming Fundamentals',
    moduleTitle: 'Programming Fundamentals',
    question: 'Which function correctly verifies whether a string is a palindrome (reads identically forwards and backward)?',
    options: [
      'function check(s) { return s.split("").reverse().join("") === s; }',
      'function check(s) { return s.reverse() === s; }',
      'function check(s) { return s.sort() === s; }',
      'function check(s) { return Array.from(s) === s; }'
    ],
    correctAnswer: 0,
    explanation: 'Strings do not have a `.reverse()` method. Splitting into characters, reversing the array, and joining back into a string compares the reversed version to the original string.'
  },
  // 35. Web Client vs Server Responsibility
  {
    id: 'mock-35',
    type: 'mcq',
    difficulty: 'Beginner',
    topic: 'Web Concepts',
    moduleTitle: 'Web Development Concepts',
    question: 'Which of the following responsibilities strictly belongs to the client-side front-end application rather than the backend?',
    options: [
      'Directly connecting to a SQL database with database credentials',
      'Rendering the interactive user interface and responding to browser DOM events',
      'Hashing user passwords with bcrypt for storage',
      'Generating private cryptographic signing keys'
    ],
    correctAnswer: 1,
    explanation: 'The front-end client is responsible for rendering the UI and handling user interaction events. Database access and password hashing must always stay securely on the backend server.'
  }
];
