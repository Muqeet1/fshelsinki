import React from "react";

const Total = ({ numexe }) => {
    const totalExercises = numexe.map(exe => exe.exercises)
    .reduce((a, b) => a+b)    

    return (
      <p>Number of exercises are { totalExercises }
      </p>
    )
  }
  export default Total;