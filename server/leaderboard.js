const fs = require("fs").promises;
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "database", "scores.json");

async function readScores() {
  try {
    const data = await fs.readFile(DB_PATH, "utf8");
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    return [];
  }
}

async function writeScores(scores) {
  const payload = JSON.stringify(scores, null, 2);
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, payload, "utf8");
}

function sortScores(list) {
  return list.sort((a, b) => {
    if (b.score === a.score) {
      return a.timestamp - b.timestamp;
    }
    return b.score - a.score;
  });
}

async function addScore(name, score) {
  const safeName = (name || "Player").toString().slice(0, 32);
  const numericScore = Number(score) || 0;

  const list = await readScores();
  list.push({
    name: safeName,
    score: numericScore,
    timestamp: Date.now()
  });

  const sorted = sortScores(list);
  const trimmed = sorted.slice(0, 50);

  await writeScores(trimmed);

  return trimmed.slice(0, 10);
}

async function getTopScores(limit = 10) {
  const list = await readScores();
  const sorted = sortScores(list);
  return sorted.slice(0, limit);
}

module.exports = {
  addScore,
  getTopScores
};

