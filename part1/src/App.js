import React from "react";

const App = () => {

  const course = "Half Stack application development"
  const part1 =
  {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 =
  {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 =
  {
    name: 'State of a component',
    exercises: 14
  }

  const Header = props => {
    return <h1>{props.course}</h1>
  }
  const Part1 = props => {
    return <p>{props.parts.name + " " + props.parts.exercises}</p>
  }
  const Part2 = props => {
    return <p>{props.parts.name + " " + props.parts.exercises}</p>
  }
  const Part3 = props => {
    return <p>{props.parts.name + " " + props.parts.exercises}</p>
  }

  const Total = props => {
    return <p>Total number of exercises are {props.numexe}</p>
  }
  return (
    <div>
      <Header course={course} />
      <Part1 parts={part1} />
      <Part2 parts={part2} />
      <Part3 parts={part3} />
      <Total numexe={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )

}
export default App;
