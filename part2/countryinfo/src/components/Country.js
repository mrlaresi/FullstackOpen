import React from 'react'
import Weather from './Weather'

const Country = ({country, weather}) => {
  return (
    <>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>spoken languages</h3>
      <ul>{country.languages.map((language) => {
        return <li key={language.name}>{language.name}</li>
        })}
      </ul>
      <img src={country.flag} alt="flag of the country" 
        width="20%" height="20%"/>
      <Weather name={country.name} weather={weather}/>
    </>
  )
}

export default Country