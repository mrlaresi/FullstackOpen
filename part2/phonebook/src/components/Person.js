import React from 'react'

const Person = ({person, deleteCallback}) => {
    return <p>{person.name} {person.number} <button onClick={() => deleteCallback(person)}>delete</button></p>
}

export default Person