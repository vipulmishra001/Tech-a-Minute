// Core game state
let questions = [];
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval = null;
let currentPlayerName = "Player";

// DOM references
const homeScreen = document.getElementById("home-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");

const playerNameInput = document.getElementById("player-name");
const startButton = document.getElementById("start-button");
const playAgainButton = document.getElementById("play-again-button");

const timerValueEl = document.getElementById("timer-value");
const timerBarEl = document.getElementById("timer-bar");
const scoreValueEl = document.getElementById("score-value");

const questionTextEl = document.getElementById("question-text");
const optionButtons = Array.from(document.querySelectorAll(".option-btn"));

const summaryNameEl = document.getElementById("summary-name");
const summaryScoreEl = document.getElementById("summary-score");
const leaderboardBodyEl = document.getElementById("leaderboard-body");
const leaderboardEmptyEl = document.getElementById("leaderboard-empty");

const LEADERBOARD_STORAGE_KEY = "tech-a-minute-leaderboard";
const GAME_DURATION_SECONDS = 60;
// When running on localhost, automatically talk to the Node backend at /api/*.
// On GitHub Pages there is no backend, so this stays empty and the game uses localStorage only.
const REMOTE_API_BASE =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "/api"
    : "";

// Question bank (30 technology questions)
questions = [
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

// Utility: shuffle an array in place using Fisher–Yates
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function switchScreen(targetScreen) {
  [homeScreen, gameScreen, endScreen].forEach((screen) => {
    if (!screen) return;
    if (screen === targetScreen) {
      screen.classList.add("screen-active");
      screen.classList.remove("screen-hidden");
    } else {
      screen.classList.remove("screen-active");
      screen.classList.add("screen-hidden");
    }
  });
}

function resetGameState() {
  score = 0;
  timeLeft = GAME_DURATION_SECONDS;
  shuffledQuestions = shuffle(questions);
  currentQuestionIndex = 0;
  scoreValueEl.textContent = String(score);
  timerValueEl.textContent = String(timeLeft);
  if (timerBarEl) {
    timerBarEl.style.width = "100%";
  }
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft -= 1;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
    timerValueEl.textContent = String(timeLeft);

    const progress = (timeLeft / GAME_DURATION_SECONDS) * 100;
    if (timerBarEl) {
      timerBarEl.style.width = `${Math.max(progress, 0)}%`;
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function loadNextQuestion() {
  if (!shuffledQuestions.length) {
    shuffledQuestions = shuffle(questions);
    currentQuestionIndex = 0;
  }

  if (currentQuestionIndex >= shuffledQuestions.length) {
    shuffledQuestions = shuffle(questions);
    currentQuestionIndex = 0;
  }

  const current = shuffledQuestions[currentQuestionIndex];
  currentQuestionIndex += 1;

  questionTextEl.textContent = current.question;

  // Reset option button state
  optionButtons.forEach((btn, idx) => {
    btn.disabled = false;
    btn.classList.remove("correct", "wrong", "neutral");
    const optionText = current.options[idx];
    btn.textContent = optionText ?? "";
    btn.dataset.correct = optionText === current.answer ? "true" : "false";
  });
}

function handleOptionClick(event) {
  const clickedButton = event.currentTarget;
  if (!clickedButton || clickedButton.disabled) {
    return;
  }

  const isCorrect = clickedButton.dataset.correct === "true";

  // Freeze all buttons for this question
  optionButtons.forEach((btn) => {
    btn.disabled = true;
  });

  if (isCorrect) {
    score += 1;
    scoreValueEl.textContent = String(score);
    clickedButton.classList.add("correct");
  } else {
    clickedButton.classList.add("wrong");
    const correctButton = optionButtons.find((btn) => btn.dataset.correct === "true");
    if (correctButton) {
      correctButton.classList.add("correct");
    }
    optionButtons.forEach((btn) => {
      if (!btn.classList.contains("correct") && !btn.classList.contains("wrong")) {
        btn.classList.add("neutral");
      }
    });
  }

  // Move to next question after a brief delay to let animations play
  setTimeout(() => {
    if (timeLeft > 0) {
      loadNextQuestion();
    }
  }, 550);
}

function startGame() {
  const nameInputValue = (playerNameInput.value || "").trim();
  currentPlayerName = nameInputValue || "Player";

  resetGameState();
  switchScreen(gameScreen);
  startTimer();
  loadNextQuestion();
}

function endGame() {
  summaryNameEl.textContent = currentPlayerName;
  summaryScoreEl.textContent = String(score);

  saveScoreLocally(currentPlayerName, score);
  renderLeaderboard();
  trySendScoreToServer(currentPlayerName, score);

  switchScreen(endScreen);
}

function handlePlayAgain() {
  switchScreen(homeScreen);
}

// Leaderboard: localStorage-backed
function loadLocalLeaderboard() {
  try {
    const raw = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch (error) {
    return [];
  }
}

function saveLocalLeaderboard(entries) {
  try {
    localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    // If storage fails, ignore and continue without crashing the game
  }
}

function saveScoreLocally(name, scoreValue) {
  const list = loadLocalLeaderboard();
  list.push({
    name,
    score: scoreValue,
    timestamp: Date.now()
  });

  list.sort((a, b) => {
    if (b.score === a.score) {
      return a.timestamp - b.timestamp;
    }
    return b.score - a.score;
  });

  const trimmed = list.slice(0, 50);
  saveLocalLeaderboard(trimmed);
}

function renderLeaderboard() {
  const list = loadLocalLeaderboard()
    .slice()
    .sort((a, b) => {
      if (b.score === a.score) {
        return a.timestamp - b.timestamp;
      }
      return b.score - a.score;
    })
    .slice(0, 10);

  leaderboardBodyEl.innerHTML = "";

  if (!list.length) {
    leaderboardEmptyEl.style.display = "block";
    return;
  }

  leaderboardEmptyEl.style.display = "none";

  list.forEach((entry, index) => {
    const row = document.createElement("tr");

    const rankCell = document.createElement("td");
    rankCell.textContent = String(index + 1);

    const nameCell = document.createElement("td");
    nameCell.textContent = entry.name || "Player";

    const scoreCell = document.createElement("td");
    scoreCell.textContent = String(entry.score);

    row.appendChild(rankCell);
    row.appendChild(nameCell);
    row.appendChild(scoreCell);

    leaderboardBodyEl.appendChild(row);
  });
}

// Optional backend integration (safe fallback to local-only mode)
async function trySendScoreToServer(name, scoreValue) {
  if (!REMOTE_API_BASE) return;

  try {
    await fetch(`${REMOTE_API_BASE}/score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, score: scoreValue })
    });
  } catch (error) {
    // Ignore network errors and keep local leaderboard as primary source
  }
}

async function tryLoadLeaderboardFromServer() {
  if (!REMOTE_API_BASE) {
    renderLeaderboard();
    return;
  }

  try {
    const response = await fetch(`${REMOTE_API_BASE}/leaderboard`);
    if (!response.ok) {
      renderLeaderboard();
      return;
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      renderLeaderboard();
      return;
    }

    // Mirror server leaderboard to local storage for offline usage
    const mapped = data.map((item) => ({
      name: item.name || "Player",
      score: Number(item.score) || 0,
      timestamp: item.timestamp || Date.now()
    }));
    saveLocalLeaderboard(mapped);
    renderLeaderboard();
  } catch (error) {
    renderLeaderboard();
  }
}

function wireEvents() {
  if (startButton) {
    startButton.addEventListener("click", startGame);
  }

  if (playerNameInput) {
    playerNameInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        startGame();
      }
    });
  }

  if (playAgainButton) {
    playAgainButton.addEventListener("click", handlePlayAgain);
  }

  optionButtons.forEach((btn) => {
    btn.addEventListener("click", handleOptionClick);
  });
}

function init() {
  switchScreen(homeScreen);
  wireEvents();
  tryLoadLeaderboardFromServer();
}

// Ensure DOM is ready – script is loaded with defer, but this is safe and explicit
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

