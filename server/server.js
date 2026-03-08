const express = require("express");
const cors = require("cors");
const path = require("path");

const questions = require("./questions");
const { addScore, getTopScores } = require("./leaderboard");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve the static frontend so you can open http://localhost:3000
app.use(express.static(path.join(__dirname, "..")));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", name: "tech-a-minute", time: Date.now() });
});

// GET /api/questions - return all questions in random order
app.get("/api/questions", (req, res) => {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  res.json(shuffled);
});

// POST /api/score - save a player score
app.post("/api/score", async (req, res) => {
  try {
    const { name, score } = req.body || {};
    const leaderboard = await addScore(name, score);
    res.status(201).json({ ok: true, leaderboard });
  } catch (error) {
    res.status(500).json({ ok: false, error: "Failed to save score" });
  }
});

// GET /api/leaderboard - return top 10 scores
app.get("/api/leaderboard", async (req, res) => {
  try {
    const leaderboard = await getTopScores(10);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ ok: false, error: "Failed to read leaderboard" });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Tech a Minute server listening on http://localhost:${PORT}`);
});

