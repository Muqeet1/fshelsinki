import React from "react";

const App = () => {

  const course = {
    name: "Half Stack application development",
    parts: [
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
      },
    ]
  }
  function Renderparts(thisaprop) {
    const allparts = thisaprop.allparts.map(part => (
      <p>{part.name + " "}
        {part.exercises}
      </p>
    ))
    return (<div>
      {allparts}
    </div>
    )
  }

  const Header = props => {
    return <h1>{props.course}</h1>
  }

  const Total = props => {
    const Numberexercise = props.numberexercises.map(x => x.exercises)
      .reduce((a, b) => (a + b)
      )

    return <p>Total exercises are {Numberexercise}</p>;
  }
  return (
    <div>
      <Header course={course.name} />
      <Renderparts allparts={course.parts} />
      <Total numberexercises={course.parts} />
    </div>
  )

}
export default App;
