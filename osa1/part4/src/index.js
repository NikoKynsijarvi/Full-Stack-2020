import React, { useState } from 'react'
import ReactDOM from 'react-dom'




const Button = ({onClick, text}) => (
  <button onClick={onClick}>
      {text}      
  </button>
)


const Anecdote = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
       <Button onClick={props.handleClick} text= 'Random anecdote'/>
      
      </div>
    )
  }  

  else if (props.allClicks.length !== 0){
    return (
        <div>
           <Button onClick={props.handleClick} text= 'Next anecdote'/>
           <Button onClick={props.handleVoteClick} text='Vote'/>
           <p>{props.anecdotes[props.selected]} </p>
           <p>Vote {props.votes}</p>
        </div>

    )
  }
  return (
    <div>
     
    </div>
  )
}



const App = (props) => {
  const [selected, setSelected] = useState(0)
  const max = anecdotes.length-1
  const min = 0
  const randomi =  Math.floor(Math.random() * (max - min + 1)) + min
  const [allClicks, setAll] = useState([])
  const points = [0,0,0,0,0,0]
  const [ counter, setCounter ] = useState(points[selected])
  let votes = counter
  console.log(votes)
  const copy = {...points}
  copy[selected] = votes
  console.log(copy[selected], 'Joo')
  
  points[props.random] = votes
  const handleVoteClick = () => {
      
      setCounter(counter+1)
          
  }
  

 
  const handleClick = () => {
    setSelected(randomi)
    setAll(allClicks.concat('Add'))
    setCounter(0)
  
  }
 

  return (
    <div>
     <Anecdote allClicks ={allClicks } handleClick ={handleClick}
      anecdotes={anecdotes} selected={selected} handleVoteClick={handleVoteClick} votes={copy[selected]}
      />     
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
