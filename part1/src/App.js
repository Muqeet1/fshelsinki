import React, { useState } from "react";

const Display = ({ counter }) => <>{counter}</>

const Button = ({ onClick, tag }) => (
    <button onClick={onClick}>
      {tag} 
    </button>
  )

const App = () => {
  const [ counter, setCounter ] = useState(0)
  const increaseOne = () => setCounter(counter + 1);
  const decreaseOne = () => setCounter(counter - 1);
  const resetEvents = () => setCounter(0)
  
  return (
    <div>

     <p><Display counter={counter} /></p> 
        <Button onClick={increaseOne} tag="Plus"/>
        <Button onClick={decreaseOne} tag="Minus"/>
        <Button onClick={resetEvents} tag="Reset"/>
    </div>
  )

}
export default App;