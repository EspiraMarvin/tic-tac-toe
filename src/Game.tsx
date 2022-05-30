import { useState } from 'react'
import Square from './components/Square'

const initial_game_state = ["X", "O", "X", "", "", "", "", "", ""]

function Game() {

  const [gameState, setGameState] = useState(initial_game_state)

  return (
    <div className="h-full h-screen p-8 text-slate-800 bg-gradient-to-r from-cyan-500 to-blue-500">
      <h1 className="text-center text-5xl mb-4 font-display text-white">
      Tic Tac Toe Game Page
      </h1>
    <div>
      <div className="grid grid-cols-3 gap-3 mx-auto w-96">
        { gameState.map((player, index) => (
          <Square key={index}>
            { player }
          </Square>
        )) }
      </div>

      <div>Scores go here</div>
    </div>
    </div>
  )
}

export default Game;