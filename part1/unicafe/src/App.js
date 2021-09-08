import React, { useState } from 'react'

const Button = ({text, value, clickHandle}) => {
  return (
    <button onClick={() => clickHandle(value + 1)}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const sum = good + neutral + bad
  if (sum < 1) { return <p>No feedback given.</p> }
  const average = (good - bad) / sum
  const positive = good / sum * 100
  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={good}/>
        <StatisticLine text={"neutral"} value={neutral}/>
        <StatisticLine text={"bad"} value={bad}/>
        <StatisticLine text={"all"} value={sum}/>
        <StatisticLine text={"average"} value={average}/>
        <StatisticLine text={"positive"} value={positive + " %"}/>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>Give feedback</h1>
      <Button text={"good"} value={good} clickHandle={setGood} />
      <Button text={"neutral"} value={neutral} clickHandle={setNeutral} />
      <Button text={"bad"} value={bad} clickHandle={setBad} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App;
