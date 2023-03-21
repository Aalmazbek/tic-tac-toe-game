import './App.css';
import { useState } from 'react';


const Square = (props) => {
  // const [value, setValue] = useState(null)

  // function handleClick(){
  //   setValue("X")
  // }

  return(
    <button className='square' onClick={props.onSquareClick} >{props.value}</button>
  )
}


const StartButton = (props) => {
  return(
    <button className={props.hide ? "start-button hide" : "start-button"} onClick={props.onStartButtonClick}>Play Again</button>
  )
}


const Board = () => {
  const [xIsNext, setXIsNext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null))

  
  function handleClick(id){
    if (squares[id] || calculateWinner(squares)) {
      return
    }

    
    const nextSquares = squares.slice()
    
    if (xIsNext) {
      nextSquares[id] = "X"
    } else{
      nextSquares[id] = "O"
    }
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }


  function startAgain(){
    let empty = [null, null, null, null, null, null, null, null, null]
    setSquares(empty)
    setXIsNext(true)

    for(let i = 0; i <= 7; i++){
      document.querySelector('.line-through-' + i).classList.remove('crossed-' + i)
    }
  }
  

  const winner = calculateWinner(squares)
  let status
  let hide = true
  if (winner) {
    status = "Winner: " + winner
    hide = false
  } else{
    status = "Next player: " + (xIsNext ? "X" : "O")
  }

  if (!winner && !squares.includes(null)) {
    status = "Draw"
    hide = false
  }


  return(
    <div className='board'>
      <h1>{status}</h1>
      <div className='board-wrapper'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <hr className='vertical'/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <hr className='vertical'/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <hr className='horizontal'/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />      
        <hr className='horizontal'/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />      

        <hr className='line-through-0'/>
        <hr className='line-through-1'/>
        <hr className='line-through-2'/>
        <hr className='line-through-3'/>
        <hr className='line-through-4'/>
        <hr className='line-through-5'/>
        <hr className='line-through-6'/>
        <hr className='line-through-7'/>
        <hr className='line-through-8'/>
      </div>
      <StartButton hide={hide} onStartButtonClick={startAgain} />
    </div>
  )
}


function calculateWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ]

  for(let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i]

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // if (i < 3) {
      //   document.querySelector('.line-through-' + i).style.transition = "0.5s"
      //   document.querySelector('.line-through-' + i).style.width = "90%"
      // } else if(i < 6){
      //   document.querySelector('.line-through-' + i).style.transition = "0.5s"
      //   document.querySelector('.line-through-' + i).style.height = "90%"
      // } else{
      //   document.querySelector('.line-through-' + i).style.transition = "0.5s"
      //   document.querySelector('.line-through-' + i).style.left = "-5%"
      //   document.querySelector('.line-through-' + i).style.top = "49%"
      //   document.querySelector('.line-through-' + i).style.width = "110%"
      // }

      document.querySelector('.line-through-' + i).classList.add('crossed-' + i)

      return squares[a]
    }
  }

  return null
}




function App() {
  return (
    <div className="App">
      <Board/>
    </div>
  );
}

export default App;

