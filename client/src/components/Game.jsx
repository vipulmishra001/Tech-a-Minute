import { useEffect, useState } from 'react'

const GAME_DURATION_SECONDS = 60

function Game({ playerName, onGameEnd }) {
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SECONDS)
  const [status, setStatus] = useState('loading') // 'loading' | 'playing' | 'finished' | 'error'
  const [selectedOption, setSelectedOption] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [feedbackVisible, setFeedbackVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Fetch questions when the game starts
  useEffect(() => {
    async function loadQuestions() {
      try {
        setStatus('loading')
        const response = await fetch('http://localhost:5000/questions')
        if (!response.ok) {
          throw new Error('Could not load questions.')
        }
        const data = await response.json()
        setQuestions(data)
        setStatus('playing')
      } catch (error) {
        setErrorMessage(error.message || 'Something went wrong.')
        setStatus('error')
      }
    }

    loadQuestions()
  }, [])

  // Timer logic
  useEffect(() => {
    if (status !== 'playing') return

    if (timeLeft <= 0) {
      finishGame(score)
      return
    }

    const id = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(id)
  }, [status, timeLeft, score])

  async function finishGame(finalScore) {
    setStatus('finished')

    try {
      await fetch('http://localhost:5000/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: playerName || 'Player',
          score: finalScore
        })
      })
    } catch {
      // If saving fails, we still want the game to end normally.
    }

    onGameEnd(finalScore)
  }

  const currentQuestion = questions[currentIndex]

  const handleAnswer = (option) => {
    if (status !== 'playing' || !currentQuestion || feedbackVisible) return

    const correct = option === currentQuestion.answer
    const updatedScore = correct ? score + 1 : score

    setSelectedOption(option)
    setIsCorrect(correct)
    setFeedbackVisible(true)
    setScore(updatedScore)

    // Move to the next question after a short delay
    setTimeout(() => {
      const isLastQuestion = currentIndex >= questions.length - 1

      if (isLastQuestion) {
        finishGame(updatedScore)
        return
      }

      setCurrentIndex((prev) => prev + 1)
      setSelectedOption(null)
      setIsCorrect(null)
      setFeedbackVisible(false)
    }, 600)
  }

  const timePercentage = (timeLeft / GAME_DURATION_SECONDS) * 100

  if (status === 'loading') {
    return (
      <main className="page">
        <section className="card">
          <p className="subtitle">Loading questions...</p>
        </section>
      </main>
    )
  }

  if (status === 'error') {
    return (
      <main className="page">
        <section className="card">
          <h2 className="title">Something went wrong</h2>
          <p className="subtitle">{errorMessage}</p>
        </section>
      </main>
    )
  }

  if (!currentQuestion) {
    return (
      <main className="page">
        <section className="card">
          <h2 className="title">No questions available</h2>
          <p className="subtitle">Please try again later.</p>
        </section>
      </main>
    )
  }

  return (
    <main className="page">
      <section className="card">
        <header className="game-header">
          <div className="player-info">
            <span className="player-name">
              Playing as{' '}
              <strong>{playerName || 'Player'}</strong>
            </span>
          </div>
          <div className="game-stats">
            <div className="stat">
              <span className="stat-label">Time</span>
              <span className="stat-value">{timeLeft}s</span>
            </div>
            <div className="stat">
              <span className="stat-label">Score</span>
              <span className="stat-value">{score}</span>
            </div>
          </div>
        </header>

        <div className="timer-bar">
          <div
            className="timer-bar-fill"
            style={{ width: `${timePercentage}%` }}
          />
        </div>

        <div className="question-section">
          <p className="question-count">
            Question {currentIndex + 1} of {questions.length}
          </p>
          <h2 className="question-text">{currentQuestion.question}</h2>

          <div className="options">
            {currentQuestion.options.map((option) => {
              let optionClass = 'option-button'

              if (feedbackVisible && option === selectedOption) {
                optionClass += isCorrect ? ' option-correct' : ' option-wrong'
              }

              return (
                <button
                  key={option}
                  type="button"
                  className={optionClass}
                  onClick={() => handleAnswer(option)}
                  disabled={feedbackVisible}
                >
                  {option}
                </button>
              )
            })}
          </div>

          {feedbackVisible && (
            <p className={`feedback ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
              {isCorrect ? 'Correct!' : 'Not quite.'}
            </p>
          )}
        </div>
      </section>
    </main>
  )
}

export default Game

