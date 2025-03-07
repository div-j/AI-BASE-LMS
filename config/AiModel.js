const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GERMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const courseOulineAiModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a study material for python for exam and level of difficulty will be EASY with summary of course, list of Chapters, with summary for each chapters, Topic list in each chapter, all output or result in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "course_name": "Introduction to Python Programming (Easy Level)",\n  "course_summary": "This course provides a beginner-friendly introduction to Python programming. It covers the fundamental concepts necessary to write simple Python programs, including data types, operators, control flow, and basic data structures. The focus is on building a solid foundation for further learning in Python.",\n  "level": "Easy",\n  "chapters": [\n    {\n      "chapter_number": 1,\n      "chapter_name": "Getting Started with Python",\n      "chapter_summary": "This chapter introduces the basics of Python, including how to set up your environment and write your first Python program. It also covers fundamental concepts like variables and basic input/output operations.",\n      "topics": [\n        "What is Python?",\n        "Setting up Python environment (installation, IDEs)",\n        "Writing and running your first Python program",\n        "Basic syntax: Comments, Indentation",\n        "Variables: Naming and assigning values",\n        "Data Types: Integers, Floats, Strings",\n        "Basic Input and Output using `print()` and `input()`"\n      ]\n    },\n    {\n      "chapter_number": 2,\n      "chapter_name": "Operators and Expressions",\n      "chapter_summary": "This chapter covers the different types of operators in Python and how to use them to create expressions. It focuses on arithmetic, comparison, and logical operators, as well as operator precedence.",\n      "topics": [\n        "Arithmetic operators (+, -, *, /, %, //, **)",\n        "Assignment operators (=, +=, -=, etc.)",\n        "Comparison operators (==, !=, >, <, >=, <=)",\n        "Logical operators (and, or, not)",\n         "Operator precedence and associativity",\n         "Creating and evaluating simple expressions"\n\n      ]\n    },\n     {\n      "chapter_number": 3,\n      "chapter_name": "Control Flow Statements",\n      "chapter_summary": "This chapter introduces control flow statements such as `if`, `elif`, and `else` for making decisions in your programs, and looping structures (`for` and `while`) for repetitive tasks. ",\n      "topics": [\n         "Conditional Statements (`if`, `elif`, `else`)",\n         "Nested `if` statements",\n         "`for` loops (iterating over sequences)",\n         "`while` loops",\n         "Loop control: `break` and `continue` statements"\n\n      ]\n    },\n     {\n       "chapter_number": 4,\n       "chapter_name": "Basic Data Structures",\n       "chapter_summary": "This chapter covers the essential data structures in Python - Lists and Tuples. It introduces how to create, access, and manipulate these structures. ",\n        "topics": [\n           "Introduction to Lists: Creating, accessing elements, modification",\n           "List methods: `append()`, `insert()`, `remove()`, etc.",\n           "Introduction to Tuples: Creating, accessing elements",\n            "Immutability of Tuples vs. Mutability of Lists",\n           "Iterating through Lists and Tuples"\n        ]\n     },\n    {\n        "chapter_number": 5,\n        "chapter_name": "Working with Strings",\n        "chapter_summary": "This chapter focuses on string manipulation techniques, including slicing, concatenation, and basic string methods.",\n        "topics": [\n            "String basics: Creating strings, escape sequences",\n            "String indexing and slicing",\n             "String concatenation",\n            "Basic String methods: `lower()`, `upper()`, `strip()`, `split()`, `find()`",\n            "String formatting using `format()` and f-strings"\n\n        ]\n    }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

export const generateNotesAiModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Generate study material detail for each chapter, make sure to include all the topics in the content, make sure to give content in HTML format (do not add HTML, Head, Body, title tag), and avoid using newline characters (\\n). The chapters:\n"chapters": [\n    {\n      "chapter_number": 1,\n      "chapter_name": "Python Fundamentals for Coding",\n      "chapter_summary": "This chapter introduces the necessary Python basics, focusing on data types, operators, and control flow required for basic coding challenges.",\n      "topics": [\n        "Variables and data types: integers, floats, strings, booleans",\n        "Arithmetic, comparison, and logical operators",\n        "Conditional statements: if, elif, else",\n        "Looping structures: for and while loops",\n        "Basic input/output using `print()` and `input()`",\n        "Comments and code formatting"\n      ]\n    },\n',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```html\n<div class="chapter">\n  <h2>Chapter 1: Python Fundamentals for Coding</h2>\n  <p><strong>Chapter Summary:</strong> This chapter introduces the necessary Python basics, focusing on data types, operators, and control flow required for basic coding challenges.</p>\n\n  <h3>Study Material Details:</h3>\n\n  <h4>1. Variables and Data Types:</h4>\n  <ul>\n    <li><strong>Understanding:</strong> Define what a variable is and how it\'s used to store data. Explain the difference between different data types.</li>\n    <li><strong>Key Concepts:</strong>\n      <ul>\n        <li>Identifying the data type of a given variable or expression (e.g., what is the data type of `3.14`? of `"Hello"`?).</li>\n        <li>Declaring variables with appropriate names and assigning values of different data types.</li>\n        <li>Converting between data types using built-in functions like `int()`, `float()`, and `str()`.</li>\n        <li>Explaining immutability of strings.</li>\n        <li>Writing code snippets that correctly use integers, floats, strings, and booleans.</li>\n        <li>Example: "Write a function that takes a float as input and returns its integer representation."</li>\n      </ul>\n    </li>\n  </ul>\n\n  <h4>2. Arithmetic, Comparison, and Logical Operators:</h4>\n  <ul>\n    <li><strong>Understanding:</strong> Knowing the purpose and precedence of arithmetic operators (+, -, *, /, //, %, **), comparison operators (==, !=, >, <, >=, <=), and logical operators (and, or, not).</li>\n    <li><strong>Key Concepts:</strong>\n      <ul>\n        <li>Evaluating expressions involving different operators and determining the result.</li>\n        <li>Understanding operator precedence and using parentheses to control the order of operations.</li>\n        <li>Writing conditional statements that use comparison and logical operators to make decisions.</li>\n        <li>Identifying common operator-related errors.</li>\n        <li>Example: "What is the output of `(5 + 3) * 2 > 10 and not (4 / 2 == 2)`?"</li>\n      </ul>\n    </li>\n  </ul>\n\n  <h4>3. Conditional Statements: `if`, `elif`, `else`:</h4>\n  <ul>\n    <li><strong>Understanding:</strong> Grasping the concept of conditional execution and how `if`, `elif`, and `else` statements are used to control the flow of a program.</li>\n    <li><strong>Key Concepts:</strong>\n      <ul>\n        <li>Writing `if` statements to execute code based on a condition.</li>\n        <li>Using `elif` to handle multiple conditions.</li>\n        <li>Using `else` to provide a default execution path.</li>\n        <li>Nested `if` statements.</li>\n        <li>Tracing the execution of code containing conditional statements.</li>\n        <li>Example: "Write a function that takes an integer as input and returns \'Positive\' if it\'s greater than 0, \'Negative\' if it\'s less than 0, and \'Zero\' if it\'s equal to 0."</li>\n      </ul>\n    </li>\n  </ul>\n\n  <h4>4. Looping Structures: `for` and `while` Loops:</h4>\n  <ul>\n    <li><strong>Understanding:</strong> Comprehending how `for` and `while` loops are used to repeat code blocks. Understanding the concept of iteration. Understanding loop control statements (`break`, `continue`).</li>\n    <li><strong>Key Concepts:</strong>\n      <ul>\n        <li>Writing `for` loops to iterate over sequences (e.g., lists, strings, ranges).</li>\n        <li>Writing `while` loops to repeat code as long as a condition is true.</li>\n        <li>Using `break` to exit a loop prematurely.</li>\n        <li>Using `continue` to skip to the next iteration of a loop.</li>\n        <li>Nested loops.</li>\n        <li>Predicting the output of code containing loops.</li>\n        <li>Example: "Write a function that calculates the sum of all even numbers between 1 and a given integer using a `for` loop."</li>\n        <li>Example: "Write a `while` loop that prints numbers from 10 down to 1."</li>\n      </ul>\n    </li>\n  </ul>\n\n  <h4>5. Basic Input/Output Using `print()` and `input()`:</h4>\n  <ul>\n    <li><strong>Understanding:</strong> Knowing how to display output to the user using `print()` and how to get input from the user using `input()`.</li>\n    <li><strong>Key Concepts:</strong>\n      <ul>\n        <li>Writing code that prompts the user for input and stores it in a variable.</li>\n        <li>Using `print()` to display formatted output (e.g., using f-strings or the `.format()` method).</li>\n        <li>Understanding that `input()` returns a string and requires explicit conversion to other data types if needed.</li>\n        <li>Handling potential errors when converting input (e.g., using `try-except` blocks).</li>\n        <li>Example: "Write a program that asks the user for their name and age, then prints a greeting message including their name and age."</li>\n      </ul>\n    </li>\n  </ul>\n\n  <h4>6. Comments and Code Formatting:</h4>\n  <ul>\n    <li><strong>Understanding:</strong> Importance of clear and concise comments to explain code. Following consistent code formatting conventions (PEP 8).</li>\n    <li><strong>Key Concepts:</strong>\n      <ul>\n        <li>Identifying good and bad examples of code commenting.</li>\n        <li>Rewriting poorly formatted code to improve readability.</li>\n        <li>Explaining the purpose of PEP 8 guidelines.</li>\n        <li>Adding appropriate comments to existing code.</li>\n        <li>Recognizing and correcting common formatting errors (e.g., inconsistent indentation).</li>\n        <li>Example: "Add comments to the following code snippet to explain what it does."</li>\n      </ul>\n    </li>\n  </ul>\n</div>\n```',
        },
      ],
    },
  ],
});

export const GenerateStudyTypeContentAiModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate the flashcard on topic: Call on Filter Fundamentals, User Interface (UI) Development, Basic App Navigation in JSON format with front-back content, maximum 15.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "front": "What is the primary purpose of a UI filter?",\n    "back": "To narrow down a dataset based on specific criteria provided by the user."\n  },\n  {\n    "front": "What are some common UI elements used for filtering?",\n    "back": "Checkboxes, radio buttons, dropdown menus, range sliders, and text input fields."\n  },\n  {\n    "front": "Explain the difference between single-select and multi-select filters.",\n    "back": "Single-select allows users to choose only one option, while multi-select allows multiple options."\n  },\n  {\n    "front": "What is the \'AND\' filter logic?",\n    "back": "Requires all selected filter criteria to be true for an item to be included in the results."\n  },\n  {\n    "front": "What is the \'OR\' filter logic?",\n    "back": "Requires at least one of the selected filter criteria to be true for an item to be included in the results."\n  },\n  {\n    "front": "Why is clear visual indication of active filters important?",\n    "back": "It helps users understand which filters are applied and how they are affecting the displayed data."\n  },\n  {\n    "front": "What is the benefit of a \'Clear All\' button in a filter section?",\n    "back": "It provides a quick way to reset all filters to their default state."\n  },\n  {\n    "front": "Name three common navigation patterns in app UI.",\n    "back": "Tab bars, navigation drawers, and breadcrumbs."\n  },\n  {\n    "front": "What is the purpose of a tab bar?",\n    "back": "To allow users to switch between different primary sections or views of the app."\n  },\n  {\n    "front": "What is a navigation drawer typically used for?",\n    "back": "To provide access to secondary navigation options and settings."\n  },\n  {\n    "front": "What is the role of breadcrumbs in app navigation?",\n    "back": "To show the user\'s current location within the app\'s hierarchy and allow them to easily navigate back."\n  },\n  {\n    "front": "Why is consistent navigation important for a good user experience?",\n    "back": "It allows users to easily understand how to move around the app and find what they are looking for."\n  },\n  {\n    "front": "What is the purpose of a \'Back\' button in app navigation?",\n    "back": "To navigate to the previously viewed screen or section."\n  },\n  {\n    "front": "What is a modal window and when should it be used?",\n    "back": "A modal window is a UI element that blocks interaction with the main app content until dismissed. Use it for important alerts, confirmation prompts, or focused tasks."\n  },\n  {\n    "front": "Why is it crucial to design UI filters with accessibility in mind?",\n    "back": "To ensure that users with disabilities can effectively use and benefit from the filtering functionality. Consider screen readers and keyboard navigation."\n  }\n]\n```',
        },
      ],
    },
  ],
});


export  const GenerateQuizAimodel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: " \"Generate Quiz on topic: Call on Filter Fundamentals, User Interface (UI) Development, Basic App Navigation in JSON format  with Questions and Options along with correct answer in JSON format max(10)\n"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"quizTitle\": \"Call on Filter Fundamentals, UI Development & Basic App Navigation\",\n  \"questions\": [\n    {\n      \"question\": \"What is the primary purpose of a filter in a user interface?\",\n      \"options\": [\n        \"To sort data in ascending order.\",\n        \"To display all available data.\",\n        \"To narrow down the data displayed based on specific criteria.\",\n        \"To format the data for presentation.\"\n      ],\n      \"correctAnswer\": \"To narrow down the data displayed based on specific criteria.\"\n    },\n    {\n      \"question\": \"Which UI element is most commonly used to represent a filter option?\",\n      \"options\": [\n        \"Button\",\n        \"Text Field\",\n        \"Checkbox/Radio Button\",\n        \"Image\"\n      ],\n      \"correctAnswer\": \"Checkbox/Radio Button\"\n    },\n    {\n      \"question\": \"In UI development, what does 'UX' stand for?\",\n      \"options\": [\n        \"User X-ray\",\n        \"User Experience\",\n        \"Ultimate Experience\",\n        \"Universal Extension\"\n      ],\n      \"correctAnswer\": \"User Experience\"\n    },\n    {\n      \"question\": \"What is a common UI pattern for allowing users to easily clear all active filters?\",\n      \"options\": [\n        \"Delete button\",\n        \"Reset filters button\",\n        \"Hide filters button\",\n        \"Refresh button\"\n      ],\n      \"correctAnswer\": \"Reset filters button\"\n    },\n    {\n      \"question\": \"Which of the following is NOT a key principle of good UI design?\",\n      \"options\": [\n        \"Clarity\",\n        \"Consistency\",\n        \"Complexity\",\n        \"Efficiency\"\n      ],\n      \"correctAnswer\": \"Complexity\"\n    },\n    {\n      \"question\": \"What is the purpose of 'breadcrumbs' in app navigation?\",\n      \"options\": [\n        \"To provide a visual trail of the user's path through the app.\",\n        \"To allow the user to jump directly to the home screen.\",\n        \"To display related articles.\",\n        \"To provide help documentation.\"\n      ],\n      \"correctAnswer\": \"To provide a visual trail of the user's path through the app.\"\n    },\n    {\n      \"question\": \"Which navigation pattern is best suited for apps with a large number of top-level categories?\",\n      \"options\": [\n        \"Tab Bar\",\n        \"Hamburger Menu\",\n        \"Bottom Navigation Bar\",\n        \"Search Bar\"\n      ],\n      \"correctAnswer\": \"Hamburger Menu\"\n    },\n    {\n      \"question\": \"What is the purpose of a 'modal' window?\",\n      \"options\": [\n        \"To display advertisements.\",\n        \"To present a temporary, focused context that requires user interaction before proceeding.\",\n        \"To navigate to another part of the app.\",\n        \"To download a file.\"\n      ],\n      \"correctAnswer\": \"To present a temporary, focused context that requires user interaction before proceeding.\"\n    },\n    {\n      \"question\": \"What is the importance of considering accessibility in UI design?\",\n      \"options\": [\n        \"To increase the app's download size.\",\n        \"To make the app usable by people with disabilities.\",\n        \"To improve the app's performance on high-end devices.\",\n        \"To reduce the app's development costs.\"\n      ],\n      \"correctAnswer\": \"To make the app usable by people with disabilities.\"\n    },\n    {\n      \"question\": \"Which UI element is commonly used to visually indicate progress, such as during a file upload?\",\n      \"options\": [\n        \"Slider\",\n        \"Progress Bar\",\n        \"Text Area\",\n        \"Icon\"\n      ],\n      \"correctAnswer\": \"Progress Bar\"\n    }\n  ]\n}\n```\n"},
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
