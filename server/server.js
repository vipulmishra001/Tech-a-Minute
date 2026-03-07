import express from 'express'
import cors from 'cors'

import { questions } from './questions.js'
import { addScore, getTopScores } from './leaderboard.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Helper to shuffle the questions so each game is different.
function shuffle(array) {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

// GET /questions - return all questions in random order
app.get('/questions', (req, res) => {
  const randomized = shuffle(questions)
  res.json(randomized)
})

// POST /score - save player name and score
app.post('/score', (req, res) => {
  const { name, score } = req.body || {}

  if (typeof name !== 'string' || typeof score !== 'number') {
    return res.status(400).json({ message: 'Invalid payload' })
  }

  addScore(name, score)
  return res.status(201).json({ message: 'Score saved' })
})

// GET /leaderboard - return top 10 scores
app.get('/leaderboard', (req, res) => {
  const topScores = getTopScores(10)
  res.json(topScores)
})

app.listen(PORT, () => {
  // Simple startup message
  // eslint-disable-next-line no-console
  console.log(`Tech a Minute server listening on http://localhost:${PORT}`)
})

