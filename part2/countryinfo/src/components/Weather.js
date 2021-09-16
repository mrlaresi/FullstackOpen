import React from 'react'

const Weather = ({weather}) => {
  // do nothing if empty object
  if (!Object.keys(weather).length) return null
  return (
    <>
      <h3>Weather in {weather.name}</h3>
      <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
      <p>Description: {weather.weather[0].description}</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="Weather icon"/>
      <p>Wind: Speed {weather.wind.speed} m/s, Direction {weather.wind.deg} degrees</p>
    </>
  )
}

export default Weather