const Square = ({id, newState})=>{
  const [color,setColor] = React.useState("green");
  const [status, setStatus] = React.useState(null);
  const xo = ["O","X"];

  const palet = ["red", "blue", "green"];
  const getRandomColor = () => palet[Math.floor(Math.random()*3)];
  
  React.useEffect(()=>{
    console.log(`Render ${id}`);
    return ()=> console.log(`unmounting Square ${id}`);
  })
  return (
    <button 
    onClick={e => {
      let col = getRandomColor();
      setColor(col);
      let nextPlayer = newState({ id: id, color: col });
      setStatus(nextPlayer);
      e.target.style.background = col;
    }}
    >
    <h1> {xo[status]} </h1>
  </button>
  );
};

const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [state, setState] = React.useState([]);
  const [mounted, setMounted] = React.useState(true);
  const [random, setRandom] = React.useState(0);
  let status = `Player ${player}`;

  const newState = (ob) => {
    let nextPlayer = (player + 1) % 2;
    setPlayer(nextPlayer);
    setState([...state, ob]);
    console.log(`adding state ${JSON.stringify(state)}`);
    status = `Player ${nextPlayer}`;
    return nextPlayer;
  };

  function toggle() {
    return setMounted(!mounted);
  }
  const reRender = ()=> setRandom(Math.random());

  function renderSquare(i) {
    return <Square id={i} player={player} newState={newState}></Square>;
  }
  return (
    <div className="game-board">
      <div className="grid-row">
        {mounted && renderSquare(0)}
        {mounted && renderSquare(1)}
        {mounted && renderSquare(2)}
      </div>
      <div id="info">
        <button onClick={toggle}>Show/Hide Row</button>
        <button onClick={reRender}>Re-render</button>
        <h1>{status}</h1>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
