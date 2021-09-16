import React from 'react'

const PersonForm = ({submit, name, nameHandle, number, numberHandle}) => {
  return (
    <form onSubmit={submit}>
      <div>name: <input value={name} onChange={nameHandle}/></div>
      <div>number: <input value={number} onChange={numberHandle}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm