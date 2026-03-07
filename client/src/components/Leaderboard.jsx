import { useEffect, useState } from 'react'

function Leaderboard({ playerName, lastScore, onPlayAgain }) {
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:5000/leaderboard')
        if (!response.ok) {
          throw new Error('Could not load leaderboard.')
        }
        const data = await response.json()
        setScores(data)
      } catch (err) {
        setError(err.message || 'Something went wrong.')
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [])

  return (
    <main className="page">
      <section className="card">
        <h1 className="title">Game Over</h1>

        {typeof lastScore === 'number' && (
          <p className="subtitle">
            {playerName || 'You'} scored{' '}
            <strong>{lastScore}</strong>
            .
          </p>
        )}

        <button
          type="button"
          className="button button-primary"
          onClick={onPlayAgain}
        >
          Play Again
        </button>
      </section>

      <section className="card leaderboard-card">
        <h2 className="title">Top 10 Scores</h2>

        {loading && <p className="subtitle">Loading leaderboard...</p>}
        {error && (
          <p className="subtitle error-text">
            {error}
          </p>
        )}

        {!loading && !error && scores.length === 0 && (
          <p className="subtitle">No scores yet. Be the first to play!</p>
        )}

        {!loading && !error && scores.length > 0 && (
          <div className="leaderboard">
            <div className="leaderboard-row leaderboard-header">
              <span>#</span>
              <span>Player</span>
              <span>Score</span>
            </div>

            {scores.map((item, index) => (
              <div
                key={`${item.name}-${item.createdAt}-${index}`}
                className="leaderboard-row"
              >
                <span>{index + 1}</span>
                <span>{item.name}</span>
                <span>{item.score}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Leaderboard

