import { useState } from 'react'

import { INITIAL_GAME_BOARD, WINNING_COMBINATIONS, PLAYERS } from './data.js'

const currentPlayer = (gameTurns) => {
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
}

const App = () => {
    return <main></main>
}

export default App
