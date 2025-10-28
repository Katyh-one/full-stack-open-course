import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine = ({ text, value }) => (
  <tr><td>{text}</td><td>{value}</td></tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (total === 0) ? 0 : (good - bad) / total
  const positive = (total === 0) ? 0 : (good / total) * 100
  
  if (total === 0) {
    return <p>No feedback given</p>
  }
  return (
    <table border="1" cellPadding={5}>
      <StatisticsLine text="Good:" value={good} />
      <StatisticsLine text="Neutral:" value={neutral} />
      <StatisticsLine text="Bad:" value={bad} />
      <StatisticsLine text="All:" value={total} />
      <StatisticsLine text="Average:" value={average} />
      <StatisticsLine text="Positive:" value={`${positive}%`} />
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
