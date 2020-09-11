import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const StatisticLine = (props) => {
  return (
    <table>
      <tbody>
        <tr>
            <td>  {props.textGood}</td>
            <td>  {props.valueGood}</td>
           
        </tr>
        <tr>
            <td>  {props.textNeutral}</td>
            <td>  {props.valueNeutral}</td>
           
        </tr>
        <tr>
            <td>  {props.textBad}</td>
            <td>  {props.valueBad}</td>
            
        </tr>
        <tr>
            <td>  {props.textAll}</td>
            <td>  {props.valueAll}</td>
            
        </tr>
        <tr>
            <td>  {props.textAverage}</td>
            <td>  {props.valueAverage}</td>
            
        </tr>
        <tr>
            <td>  {props.textPositive}</td>
            <td>  {props.valuePositive}</td>
            <td>  {props.symbol}</td>
        </tr>
       </tbody>
    </table>
    
  )
}

const Statistics = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
       <p> No feedback given </p>
      </div>
    )
  }  
  
  else if(props.allClicks.length !== 0){
    return(
      <div>
      <StatisticLine textGood="good" valueGood ={props.stats1}
        textNeutral="neutral" valueNeutral={props.stats2}
        textBad="bad" valueBad={props.stats3}
        textAll="all" valueAll={props.stats4}
        textAverage="average" valueAverage={props.stats5}
        textPositive="positive" valuePositive={props.stats6} symbol={props.symbol}        
        />
      

    </div>
    )
  }
  return (
    <div>
     
    </div>
  )
}



const Button = ({onClick, text}) => (
  <button onClick={onClick}>
      {text}      
  </button>
)


const App = (props) => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + bad + neutral
  const average = (good - bad) / all
  const positive = good/all * 100
  const [allClicks, setAll] = useState([])
  const symbol = '%'
  
  const handleGoodClick = () => {
      setAll(allClicks.concat('Good'))
      setGood(good + 1)

  }
  const handleBadClick = () => {
    setAll(allClicks.concat('Bad'))
    setBad(bad + 1)

}
const handleNeutralClick = () => {
  setAll(allClicks.concat('Neutral'))
  setNeutral(neutral + 1)

}
  
  return (
    <div>
      <h1>give feedback</h1> 
      
        <Button onClick={handleGoodClick} text='good'/>        
        
        <Button onClick={handleNeutralClick}text='neutral'/>
        
        <Button onClick={handleBadClick} text='bad'/>
       
      <h1>statistics</h1>
      <Statistics allClicks={allClicks} stats1={good} stats2 = {neutral} stats3 = {bad} 
                stats4 = {all} stats5 = {average} stats6 = {positive} symbol={symbol}/>
     
     </div>
      
  )
  }


ReactDOM.render(
  <App/>,
  document.getElementById('root')
)

