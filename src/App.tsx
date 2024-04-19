import { useState } from 'react'

import Board from './components/Game/Board.js'
import Player from './components/Player/Player'
import Logs from './components/Log/Logs.js'
import GameOver from './components/Game/GameOver.js'
import { INITIAL_GAME_BOARD, WINNING_COMBINATIONS, PLAYERS } from './data.js'

const setCurrentPlayer = (gameTurns) => {
    let currentPlayer = 'X'

    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O'
    }

    return currentPlayer
}

const setGameBoard = (gameTurns) => {
    /* This line is to reset the Board */
    let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])]

    for (const turn of gameTurns) {
        const { square, player } = turn
        const { row, col } = square

        gameBoard[row][col] = player
    }

    return gameBoard
}

/*
 * @desc To set which player wins
 */
const setWinner = (gameBoard, players) => {
    let winner

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol =
            gameBoard[combination[0].row][combination[0].column]
        const secondSquareSymbol =
            gameBoard[combination[1].row][combination[1].column]
        const thirdSquareSymbol =
            gameBoard[combination[2].row][combination[2].column]

        if (
            firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol &&
            thirdSquareSymbol
        ) {
            winner = players[firstSquareSymbol]
        }
    }

    return winner
}

const App = () => {
    const [players, setPlayers] = useState(PLAYERS)
    const [gameTurns, setGameTurns] = useState<any[]>([])

    const activePlayer = setCurrentPlayer(gameTurns)
    const gameBoard = setGameBoard(gameTurns)
    const winner = setWinner(gameBoard, players)
    const hasDraw = gameTurns.length === 9 && !winner

    const handleSelectSquare = (rowIndex, colIndex) => {
        setGameTurns((prevTurns) => {
            const currentPlayer = setCurrentPlayer(prevTurns)

            const updatedTurns = [
                {
                    square: {
                        row: rowIndex,
                        col: colIndex,
                    },
                    player: currentPlayer,
                },
                ...prevTurns,
            ]

            return updatedTurns
        })
    }

    const handleRestart = () => {
        setGameTurns([])
    }

    const handlePlayerNameChange = (symbol, newName) => {
        setPlayers((prevPlayers) => {
            return {
                ...prevPlayers,
                [symbol]: newName,
            }
        })
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        initialName={PLAYERS.X}
                        symbol="X"
                        isActive={activePlayer === 'X'}
                        onChangeName={handlePlayerNameChange}
                    />
                    <Player
                        initialName={PLAYERS.O}
                        symbol="O"
                        isActive={activePlayer === 'O'}
                        onChangeName={handlePlayerNameChange}
                    />
                </ol>
                {(winner || hasDraw) && (
                    <GameOver winner={winner} onRestart={handleRestart} />
                )}
                <Board onSelectSquare={handleSelectSquare} board={gameBoard} />
            </div>
            <Logs turns={gameTurns} />
        </main>
    )
}

export default App
