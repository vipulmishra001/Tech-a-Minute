import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import path from 'node:path'

const dataFilePath = path.join(process.cwd(), 'leaderboard.json')

function readScores() {
  if (!existsSync(dataFilePath)) {
    return []
  }

  try {
    const raw = readFileSync(dataFilePath, 'utf-8')
    if (!raw.trim()) {
      return []
    }
    return JSON.parse(raw)
  } catch {
    // If the file is corrupted, start fresh instead of crashing the server.
    return []
  }
}

function writeScores(scores) {
  writeFileSync(dataFilePath, JSON.stringify(scores, null, 2), 'utf-8')
}

export function addScore(name, score) {
  const trimmedName = typeof name === 'string' ? name.trim() : ''
  const numericScore = Number(score)

  if (!trimmedName || Number.isNaN(numericScore) || numericScore < 0) {
    return
  }

  const scores = readScores()
  scores.push({
    name: trimmedName,
    score: numericScore,
    createdAt: new Date().toISOString()
  })

  writeScores(scores)
}

export function getTopScores(limit = 10) {
  const scores = readScores()

  return scores
    .sort((a, b) => b.score - a.score || new Date(a.createdAt) - new Date(b.createdAt))
    .slice(0, limit)
}

