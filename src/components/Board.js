import Square from './Square';

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], line: lines[i] };
        }
    }
    return { winner: null, line: null };
}

export default function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares).winner) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares, i);
    }

    const { winner, line } = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else if (squares.every(square => square)) {
        status = 'Draw';
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    const board = [];
    for (let ixRow = 0; ixRow < 3; ixRow++) {
        const row = [];
        for (let ixCol = 0; ixCol < 3; ixCol++) {
            const ix = 3 * ixRow + ixCol;
            const higlight = winner && line.includes(ix);
            row.push(<Square key={ix} value={squares[ix]} hightlight={higlight} onSquareClick={() => handleClick(ix)} />);
        }
        board.push(<div key={ixRow} className="board-row">{row}</div>);
    }

    return (
        <>
            <div className="status">{status}</div>
            {board}
        </>
    );
}