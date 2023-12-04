export default function Square({ value, hightlight, onSquareClick }) {
    return (
        <button className="square" style={{ color: hightlight ? 'red' : null }} onClick={onSquareClick}>
            {value}
        </button>
    );
}