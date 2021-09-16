import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import ErrorNotification from './components/ErrorNotification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ errorMessage, setError ] = useState('')
  const [ isError, setErrorState ] = useState(false)

  const filteredNumbers = persons.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase())
  })

  const changeError = (message, state) => {
    setError(message)
    setErrorState(state)
    setTimeout(() => setError(""), 3000)
  }

  const addName = (event) => {
    event.preventDefault()
    
    // check if person already exists
    const found = persons.find(person => person.name === newName)
    if (found) {
      const confirm = window.confirm(
        `${newName} is already added to the phonebook,
         replace the old number with a new one?`
      )
      if (confirm) {
        modifyNumber(found)
      }
      return
    }

    const person = {
      name: newName,
      number: newNumber
    }
    personsService
      .addPerson(person)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        changeError(`Added ${person.name}`, false)
      })
  }

  const modifyNumber = (person) => {
    const modifiedPerson = {...person, number: newNumber}
    personsService
      .modifyNumber(modifiedPerson.id, modifiedPerson)
      .then(response => {
        setPersons(persons.map(person => person.id !== modifiedPerson.id ? person : response.data))
        changeError(`Phone number of ${response.data.name} was modified`, false)
      })
      .catch(error => {
        changeError(`Information of ${person.name} has already been removed from the server`, true)
      })
  }
  
  const deleteCallback = (personToDelete) => {
    const confirm = window.confirm(`Delete ${personToDelete.name}?`)
    if (!confirm) return
    personsService
      .deletePerson(personToDelete.id)
      .then(() => {
        changeError(`Number deleted successfully`, false)
      })
      .catch(error => {
        changeError(`Information of ${personToDelete.name} has already been removed from the server`, true)
      })
      .finally(() => {
        setPersons(persons.filter(person => person.id !== personToDelete.id))
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterNumbers = (event) => {
    setFilter(event.target.value)
  }
  
  //effect hook, empty array == run once
  useEffect(() => {
    personsService
      .getPersons()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorNotification message={errorMessage} isError={isError}/>
      <Filter filter={filter} handle={filterNumbers}/>
      <h3>Add a new</h3>
      <PersonForm 
        submit={addName} 
        name={newName} 
        nameHandle={handleNameChange} 
        number={newNumber} 
        numberHandle={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons numbers={filteredNumbers} deleteCallback={deleteCallback}/>
    </div>
  )

}

export default App
