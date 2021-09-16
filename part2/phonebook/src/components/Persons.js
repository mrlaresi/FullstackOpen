import React from 'react'
import Person from './Person'

const Persons = ({numbers, deleteCallback}) => {
  return (
    <div>{numbers.map((person) => {
      return <Person key={person.name} person={person} deleteCallback={deleteCallback}/>
    })}
    </div>
  )
}

export default Persons