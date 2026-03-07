import { useState } from 'react'

function Home({ onStartGame, initialName = '' }) {
  const [name, setName] = useState(initialName)

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onStartGame(trimmed)
  }

  return (
    <main className="page">
      <section className="card">
        <h1 className="title">Tech a Minute</h1>
        <p className="subtitle">
          Answer as many tech questions as you can in 60 seconds.
        </p>

        <form
          className="form"
          onSubmit={handleSubmit}
        >
          <label className="field">
            <span className="field-label">Your name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              className="input"
            />
          </label>

          <button
            type="submit"
            className="button button-primary"
            disabled={!name.trim()}
          >
            Start Game
          </button>
        </form>
      </section>
    </main>
  )
}

export default Home

