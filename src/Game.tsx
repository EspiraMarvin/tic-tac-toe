import { useState, useEffect } from 'react'
import Square from './components/Square'

type Scores = {
  [key: string]: number
}


const initial_game_state = ["", "", "", "", "", "", "", "", ""]
const initial_scores: Scores = { X: 0, O: 0}

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
  const [scores, setScores] = useState(initial_scores)

  useEffect(() => {
    // when component mounts, get score from localStorage
    const storedScores = localStorage.getItem("scores")
    if (storedScores) {
      setScores(JSON.parse(storedScores))
    }
  }, [])

  useEffect(() => {
    // check for a winner after every move/ if game has been started
    if (gameState === initial_game_state) {
      // this means game has not been started
      return
    }
    // game been started, now check winner
    checkForWinner()
  }, [gameState])

  // reset/ restart board
  const resetBoard = () => {
    setGameState(initial_game_state)
  }

  const handleWin = () => {
    window.alert(`Congrats Player ${currentPlayer} You Won.`)

    // calculate score
    const newPlayerScore = scores[currentPlayer] + 1;
    const newScores = { ...scores };
    newScores[currentPlayer] = newPlayerScore;
    setScores(newScores);
    localStorage.setItem("scores", JSON.stringify(newScores))

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
    // console.log('game state changed', currentPlayer)
     setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
  }

  const handleClick = (e:  React.ChangeEvent<HTMLDivElement>) => {
    const cellIndex = Number(e.target.getAttribute("data-cell-index"))
    // set clicked cell index value equal to game state index
    const currentValue = gameState[cellIndex]
    if (currentValue) {
      return
    }

    const newValues = [...gameState] // create new state/ dont mutate
    newValues[cellIndex] = currentPlayer // set a cell to equal the current player
    setGameState(newValues)
  }

  return (
    <div className="h-full h-screen p-8 md:p-16 text-slate-800 bg-gradient-to-r from-cyan-500 to-blue-500">
      <h1 className="text-center text-5xl mb-4 font-display text-white">
      Tic Tac Toe Game.
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
      
      <div className='flex items-center justify-center'>
        <button 
          onClick={resetBoard}
          className='font-display tracking-wide text-lg mt-8 px-16 py-4 rounded-3xl
          bg-gradient-to-r from-green-200 to-blue-200 hover:from-blue-200 hover:to-green-200' 
        >
          Restart Game
          </button>
      </div>

      <div className='mx-auto w-96 text-2xl text-serif'>
        <p className='text-white mt-5'>Next Player: <span>{currentPlayer}</span></p>
        <p className='text-white mt-5'>Player X wins: <span>{scores["X"]}</span></p>
        <p className='text-white mt-5'>Player O wins: <span>{scores["O"]}</span></p>
      </div>
    </div>
    </div>
  )
}

export default Game;