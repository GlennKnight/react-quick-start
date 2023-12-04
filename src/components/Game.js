import { useState } from 'react';
import Board from './Board';

export default function Game() {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null), location: null }]);
    const [currentMove, setCurrentMove] = useState(0);
    const [descending, setDescending] = useState(true);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove].squares;

    function handlePlay(nextSquares, index) {
        const row = Math.floor(index / 3) + 1;
        const col = (index % 3) + 1;
        const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, location: { row, col } }];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map(({ squares, location }, move) => {
        const bIsCurrentMove = move === currentMove;
        const description = bIsCurrentMove
            ? `You are at move #${move}`
            : move > 0
                ? `Go to move #${move}`
                : 'Go to game start';
        const coords = location ? ` (${location.row},${location.col})` : null;
        const item = bIsCurrentMove
            ? <span>{description}{coords}</span>
            : <button onClick={() => jumpTo(move)}>{description}</button>;

        return (
            <li key={move}>
                {item}
            </li>
        );
    });

    if (!descending) moves.reverse();

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <button onClick={() => setDescending(!descending)}>{descending ? 'Descending' : 'Ascending'}</button>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}
