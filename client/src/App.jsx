import { useState } from 'react'
import './App.css'

import Home from './components/Home.jsx'
import Game from './components/Game.jsx'
import Leaderboard from './components/Leaderboard.jsx'

function App() {
  const [screen, setScreen] = useState('home') // 'home' | 'game' | 'leaderboard'
  const [playerName, setPlayerName] = useState('')
  const [lastScore, setLastScore] = useState(null)

  const handleStartGame = (name) => {
    setPlayerName(name)
    setScreen('game')
  }

  const handleGameEnd = (score) => {
    setLastScore(score)
    setScreen('leaderboard')
  }

  const handlePlayAgain = () => {
    setScreen('home')
  }

  return (
    <div className="app-root">
      {screen === 'home' && (
        <Home
          onStartGame={handleStartGame}
          initialName={playerName}
        />
      )}

      {screen === 'game' && (
        <Game
          playerName={playerName}
          onGameEnd={handleGameEnd}
        />
      )}

      {screen === 'leaderboard' && (
        <Leaderboard
          playerName={playerName}
          lastScore={lastScore}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  )
}

export default App
