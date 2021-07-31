import React from "react";

const App = () =>{
const now = new Date();
const a = 10;
const b = 20;
const Greeting = () => {
  return (
    <div>
      <p>render this tagger multiple times, well its a reusable component</p>
    </div>
  )
}
 return (
  <div>
    <p>Hello World! it is {now.toString()} </p>
    <p>{a} plus {b} is {a+b} </p>
   <div style={{textAlign: "center"}}> <Greeting />
    <Greeting />
    <Greeting />
    <Greeting />
  </div>
  </div>
  );
}
export default App;
