import React from 'react'

const CountryList = ({country, buttonCallback}) => {
  return (
    <p>
    {country.name} <button onClick={() => {buttonCallback(country.name)}}>show</button>
    </p>
  )
}

export default CountryList