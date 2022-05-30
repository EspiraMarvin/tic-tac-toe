import { useState, useEffect } from 'react'
import Square from './components/Square'

const initial_game_state = ["", "", "", "", "", "", "", "", ""]

// combinations to win the game
const winning_combos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function Game() {

  const [gameState, setGameState] = useState(initial_game_state)
  const [currentPlayer, setCurrentPlayer] = useState("X")

  useEffect(() => {
    // check for a winner after every move
    checkForWinner()
  }, [gameState])

  const handleWin = () => {
    window.alert(`Congrats Player ${currentPlayer} You Won.`)
  }

  const handleDraw = () => {
    window.alert(`The game ended in a draw`)
  }

  const checkForWinner = () => {
    let roundWon = false
     
    for (const i in winning_combos) {
      // console.log('i', winning_combos[i])
      const winCombo = winning_combos[i]
      // console.log('winCombo', winCombo)

      let a = gameState[winCombo[0]]
      let b = gameState[winCombo[1]]
      let c = gameState[winCombo[2]]

      // console.log('ABC', a, b, c)
      if([a, b, c].includes("")) {
        continue
      }

      if (a === b && b === c) {
        roundWon = true
        break;
      }
      
    }

    if (roundWon) {
      setTimeout(() => handleWin(), 500)
      return
    }

    // if game if finished/ doesnt include any empty strings/ all squares has been filled in, the game ends as a draw
    if(!gameState.includes("")) {
      setTimeout(() => handleDraw(), 500)
      return
    }

    changePlayer()

  }

  const changePlayer = () => {
    // change current to the next player - if current is X change to Y and vice versa
    console.log('game state changed', currentPlayer)
     setCurrentPlayer(currentPlayer === 'X' ? '0' : 'X')
  }

  const handleClick = (e:  React.ChangeEvent<HTMLDivElement>) => {
    console.log('cell clicked', e.target.getAttribute("data-cell-index"))
    const cellIndex = Number(e.target.getAttribute("data-cell-index"))
    const currentValue = gameState[cellIndex]
    console.log('current value', currentValue)
    if (currentValue) {
      return
    }

    const newValues = [...gameState] // create new state/ dont mutate
    newValues[cellIndex] = currentPlayer // set a cell to equal the current player
    setGameState(newValues)

  }

  return (
    <div className="h-full h-screen p-8 text-slate-800 bg-gradient-to-r from-cyan-500 to-blue-500">
      <h1 className="text-center text-5xl mb-4 font-display text-white">
      Tic Tac Toe Game Page
      </h1>
    <div>
      <div className="grid grid-cols-3 gap-3 mx-auto w-96">
        { gameState.map((player, index) => (
          <Square
              key={index}
              {...{ index, player }} 
              onClick={handleClick}
          />
        )) }
      </div>

      <div>Scores go here</div>
    </div>
    </div>
  )
}

export default Game;