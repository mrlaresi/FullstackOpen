import React from "react"

const Total = ({parts}) => {
  const total = parts.reduce((p, c) => p+c.exercises, 0) //initial value
  return (
    <b>Total of {total} exercises</b>
  )
}

export default Total