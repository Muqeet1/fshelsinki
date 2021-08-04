import React, { useState } from 'react'

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [max, setMax] = useState(0)

  const Button = props => {
    return <button onClick={props.handleNext}>{props.text}</button>
  }

  const handleNextAnecdote = () => {
    setSelected(Math.floor(Math.random(selected) * anecdotes.length))
  }

  const handleVote = () => {
    const copyVotesArray = [...votes]
    copyVotesArray[selected] += 1
    setVotes(copyVotesArray)
    const maxVoted = copyVotesArray.indexOf(Math.max(...copyVotesArray))
    setMax(maxVoted)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Button handleNext={handleNextAnecdote} text="next anecdotes" />
      <Button handleNext={handleVote} text="vote" />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[max]}</p>
    </div>
  )
}

export default App