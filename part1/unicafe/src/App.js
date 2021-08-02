import React, { useState } from "react";
import Button from "./components/button";
import Stats from "./components/Stats"

const App = () => {
  const title = "Give feedback"

  const Header = props => {
    return <h1> {props.head} </h1>
  }

  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 })

  const handleGood = () => {
    setFeedback({ ...feedback, good: feedback.good + 1 })
  }
  const handleNeutral = () => {
    setFeedback({ ...feedback, neutral: feedback.neutral + 1 })
  }

  const handleBad = () => {
    setFeedback({ ...feedback, bad: feedback.bad + 1 })
  }

  const total = feedback.good + feedback.bad + feedback.neutral;
  const positive = (feedback.good * 100) / total + "%";
  const average = (feedback.good - feedback.bad) / total + "%";

  const allprops = {
    total: total,
    positive: positive,
    average: average,
    feedback: feedback
  }

  return (
    <div>
      <Header head={title} />
      <Button handleClick={() => handleGood()} text="Good" />
      <Button handleClick={() => handleNeutral()} text="Neutral" />
      <Button handleClick={() => handleBad()} text="Bad" />
      <Stats allprops={allprops} text={"Statistics"} />
    </div>
  )

}
export default App;