import React, { useState } from "react";

const App = () => {

  const [counter, setCounter] = useState(1)
  setTimeout(()=> setCounter(counter+100), 1000)

  return (
    <div>
{counter}
    </div>
  )

}
export default App;