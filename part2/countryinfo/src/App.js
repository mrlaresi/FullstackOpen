import React, { useState, useEffect } from "react"
import axios from "axios"
import Countries from "./components/Countries"

function App() {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState("")
  const [ weather, setWeather ] = useState({})

  const filteredCountries = filter
    ? countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    : []

  const getCountries = () => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
    })
  }

  const getWeather = () => {
    if (filteredCountries.length === 1) {
      const baseURL = "http://api.openweathermap.org/data/2.5/"
      const API_KEY = process.env.REACT_APP_API_KEY
      axios
        .get(`${baseURL}weather?q=${filteredCountries[0].capital}&appid=${API_KEY}`)
        .then(response => {
          setWeather(response.data)
      })
      const cleanup = () => {
        setWeather({})
      }
      return cleanup
    }
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const buttonCallback = (countryName) => {  
    setFilter(countryName)
  }

  useEffect(getCountries, [])
  /* gives strange warning I cannot resolve, but still works:
    React Hook useEffect has a missing dependency: 'filteredCountries'. 
    Either include it or remove the dependency array 
   trying to fix in a way that the warning suggests leads to another warning
   which I was unable to resolve. */
  useEffect(getWeather, [filteredCountries.length])

  return (
    <>
      <div>Find countries <input value={filter} onChange={handleFilter}/></div>
      <Countries countries={filteredCountries} buttonCallback={buttonCallback} weather={weather}/>
    </>
  );
}

export default App;
