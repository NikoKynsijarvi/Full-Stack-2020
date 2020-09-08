import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  console.log(props)
  return (
    
      <h1>{props.course}</h1>
    
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.exercises} </p>
    </div>
  )
}

//const Content = (props) => {
  
 // return (
 //  <div>
 //   <p>{props.part} {props.exercises} </p>
     
 //   </div>
 // )
//}

const Part = (props) => {

  return(
    <div>
      <p>{props.osa} {props.tehtävät}</p>
      <p>{props.osa2} {props.tehtävät2}</p>
      <p>{props.osa3} {props.tehtävät3}</p>
    </div>
  )
}



const Content = (props) => {
  
  return (
    <div>
     <Part osa={props.part} tehtävät={props.exercises}/>
     <Part osa2={props.part2} tehtävät2={props.exercises2}/>
     <Part osa3={props.part3} tehtävät3={props.exercises3}/>
    
     
    </div>
  )
}

const App = () => {
  const course ={
    name: 'Half Stack application development',
   parts:[
  {
      name: 'Fundamentals of React',
      exercises: 10

  },
  {
      name: 'Using props to pass data',
      exercises: 7
  },
  {
        name: 'State of a component',
        exercises: 14
  }
]
  }

  return(
    <div>
    <Header course={course.name} />
    <Content part={course.parts.[0].name} exercises={course.parts.[0].exercises} 
            part2={course.parts.[1].name} exercises2={course.parts.[1].exercises}
            part3={course.parts.[2].name} exercises3={course.parts.[2].exercises}/>
    <Total exercises={course.parts.[0].exercises + course.parts.[1].exercises + course.parts.[2].exercises}/>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
