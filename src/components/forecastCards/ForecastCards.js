import React from 'react'
import ForecastCard from './forecastCard/ForecastCard';

const Forecast = ({ data }) => {
  return (
    <div className='d-flex'>
      {
        data.map((forecast) => {
          return (
            <ForecastCard data={forecast}/>
          )
        })
      }
  </div>
  )
}

export default Forecast;