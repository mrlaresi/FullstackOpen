import React, { useState } from "react"

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const largestNumber = (array) => {
  let largest = 0, index = -1
  for (let i = 0; i < array.length; i++) {
    if (array[i] > largest) {
      largest = array[i]
      index = i
    }
  }
  return index
}

const Anecdote = ({anecdotes, selected, votes}) => {
  return(
    <>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
    </>
  )
}

const Button = ({text, handler}) => {
  return (
    <button onClick={() => handler()}>{text}</button>
  )
}

const MostVoted = ({anecdotes, votes}) => {
  let index = largestNumber(votes)
  if (index === -1) { return <p>No anecdote has been voted yet.</p>}
  return(
    <p>{anecdotes[index]}</p>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const addVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const nextAnecdote = () => {
    let random = selected
    while (random === selected) {
      random = randomInteger(0, anecdotes.length-1)
    }
    setSelected(random)
  }
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  console.log(selected)
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} selected={selected} votes={votes}/>
      <Button text={"vote"} handler={addVote}/>
      <Button text={"next anecdote"} handler={nextAnecdote}/>
      <h1>Anecdote with most votes</h1>
      <MostVoted anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App;
