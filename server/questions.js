// Question bank for Tech a Minute backend
// This mirrors the questions used on the frontend.

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Machine Learning",
      "Hyper Tool Markup Language",
      "Home Tool Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which protocol is used to securely browse the web?",
    options: ["HTTP", "FTP", "HTTPS", "SMTP"],
    answer: "HTTPS"
  },
  {
    question: "In JavaScript, which keyword declares a block-scoped variable?",
    options: ["var", "let", "static", "def"],
    answer: "let"
  },
  {
    question: "What does CSS primarily control on a web page?",
    options: ["Structure", "Behavior", "Styling and layout", "Database queries"],
    answer: "Styling and layout"
  },
  {
    question: "Which of these is a NoSQL database?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
    answer: "MongoDB"
  },
  {
    question: "What does the acronym CPU stand for?",
    options: [
      "Central Processing Unit",
      "Central Program Unit",
      "Computer Personal Unit",
      "Central Power Unit"
    ],
    answer: "Central Processing Unit"
  },
  {
    question: "Which HTML tag is used to include JavaScript code in a page?",
    options: ["<javascript>", "<link>", "<script>", "<code>"],
    answer: "<script>"
  },
  {
    question: "In Git, which command creates a copy of a remote repository?",
    options: ["git pull", "git clone", "git init", "git fork"],
    answer: "git clone"
  },
  {
    question: "What is the main goal of responsive web design?",
    options: [
      "Faster back-end logic",
      "Adapting layout across devices",
      "Stronger encryption",
      "Reducing server cost"
    ],
    answer: "Adapting layout across devices"
  },
  {
    question: "Which of the following is an example of a strong password?",
    options: ["password123", "123456", "P@ssw0rd!98", "qwerty"],
    answer: "P@ssw0rd!98"
  },
  {
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Applied Program Internet",
      "Advanced Programming Input",
      "Application Performance Index"
    ],
    answer: "Application Programming Interface"
  },
  {
    question: "Which JavaScript method is commonly used to make HTTP requests in modern code?",
    options: ["alert()", "fetch()", "prompt()", "console.log()"],
    answer: "fetch()"
  },
  {
    question: "Which HTTP status code means 'Not Found'?",
    options: ["200", "301", "404", "500"],
    answer: "404"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheet",
      "Cascading Style Sheets",
      "Creative Styling System",
      "Central Style Service"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which of these languages runs in the browser without plugins?",
    options: ["Python", "Java", "C#", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "In machine learning, what is 'training data'?",
    options: [
      "Data used to test a model",
      "Data used to teach the model patterns",
      "Encrypted data only",
      "Data stored in production only"
    ],
    answer: "Data used to teach the model patterns"
  },
  {
    question: "Which of these is a common hashing algorithm?",
    options: ["AES", "RSA", "SHA-256", "TLS"],
    answer: "SHA-256"
  },
  {
    question: "What is the main purpose of a firewall in cybersecurity?",
    options: [
      "Encrypt files on disk",
      "Scan for viruses",
      "Control network traffic",
      "Backup data to the cloud"
    ],
    answer: "Control network traffic"
  },
  {
    question: "Which of these is a front-end JavaScript framework?",
    options: ["Django", "Laravel", "React", "Flask"],
    answer: "React"
  },
  {
    question: "In object-oriented programming, what is 'inheritance'?",
    options: [
      "Storing backups",
      "One class reusing properties of another",
      "Encrypting data",
      "Connecting to a database"
    ],
    answer: "One class reusing properties of another"
  },
  {
    question: "What does the 'const' keyword mean in JavaScript?",
    options: [
      "Variable cannot be redeclared or reassigned",
      "Variable is global only",
      "Variable is a number",
      "Variable will auto-increment"
    ],
    answer: "Variable cannot be redeclared or reassigned"
  },
  {
    question: "In web development, what is a CDN mainly used for?",
    options: [
      "Running databases",
      "Delivering static assets closer to users",
      "Compiling source code",
      "Encrypting HTTP traffic"
    ],
    answer: "Delivering static assets closer to users"
  },
  {
    question: "What is SQL primarily used for?",
    options: [
      "Styling web pages",
      "Querying and manipulating relational data",
      "Routing network packets",
      "Designing user interfaces"
    ],
    answer: "Querying and manipulating relational data"
  },
  {
    question: "Which of these describes phishing?",
    options: [
      "Scanning for open ports",
      "Guessing passwords by brute force",
      "Tricking users into revealing information",
      "Encrypting files for ransom"
    ],
    answer: "Tricking users into revealing information"
  },
  {
    question: "In version control, what does 'commit' represent?",
    options: [
      "A remote backup",
      "A snapshot of changes",
      "A network request",
      "A merge conflict"
    ],
    answer: "A snapshot of changes"
  },
  {
    question: "What is Big-O notation used for in computer science?",
    options: [
      "Measuring RAM size",
      "Describing algorithm performance",
      "Encrypting passwords",
      "Defining screen resolution"
    ],
    answer: "Describing algorithm performance"
  },
  {
    question: "Which part of an HTTP request usually carries JSON data?",
    options: ["URL", "Headers", "Body", "Cookies"],
    answer: "Body"
  },
  {
    question: "What is the main purpose of Docker in development?",
    options: [
      "Managing source control",
      "Containerizing applications",
      "Editing text files",
      "Designing graphics"
    ],
    answer: "Containerizing applications"
  },
  {
    question: "Which of the following is an example of multi-factor authentication (MFA)?",
    options: [
      "Username and password only",
      "Password plus one-time SMS code",
      "Password reused across sites",
      "Public Wi‑Fi login page"
    ],
    answer: "Password plus one-time SMS code"
  },
  {
    question: "In AI, what is 'overfitting'?",
    options: [
      "Model that trains too quickly",
      "Model that only works on training data",
      "Model that ignores labels",
      "Model that uses too little data"
    ],
    answer: "Model that only works on training data"
  }
];

module.exports = questions;

