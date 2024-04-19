const Over = ({ winner, onRestart }) => {
    return (
        <div id="game-over">
            <div id="game-over">
                <h2>Game Over!</h2>

                {winner && <p>{winner} won!</p>}
                {!winner && <p>It is a draw</p>}
                <p>
                    <button onClick={onRestart}>Rematch!</button>
                </p>
            </div>
        </div>
    )
}

export default Over
