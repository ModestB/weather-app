import React from 'react';
import dayjs from 'dayjs';
import classes from './ForecastCard.module.scss'

const ForecastCard = ({ data }) => {
  return (
    <div className={classes.container}>
      <div className={classes.date}>{dayjs.unix(data.dt).format('MMM D')}</div>
      <img className={classes.img} src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}></img>
      <div className={classes.temp}>{`${Math.round(data.temp.min)}/${Math.round(data.temp.max)}°C`}</div>
    </div>
  )
}

export default ForecastCard;