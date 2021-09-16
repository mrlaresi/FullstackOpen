import React from 'react'
import CountryList from './CountryList'
import Country from './Country'

const Countries = ({countries, buttonCallback, weather}) => {
  if (countries.length > 10) {
    return (<p>Too many matches, specify another filter</p>)
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => {
          return <CountryList key={country.name} country={country} buttonCallback={buttonCallback}/>
        })} 
      </div>
    )
  } else if (countries.length === 1) {
    return (
      <div>
        <Country country={countries[0]} weather={weather}/>
      </div>
    )
  }
  return <></>
}

export default Countries