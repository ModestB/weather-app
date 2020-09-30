import React from "react";
import { useDispatch } from 'react-redux';
import { getWeatherData } from '../../../store/actions/index';

import classes from './Card.module.scss'

const Card = ({data}) => {
  const dispatch = useDispatch();

  const cardClickHandler = () => {
    console.log(data)
    dispatch(getWeatherData(data.coord.lat, data.coord.lon, data.name))
  }
  return (
    <div 
      className={classes.card}
      onClick={cardClickHandler}
    >
      <div className={classes.header}>
        <div className={classes.title}>{data.name}</div>
        <img className={classes.img} src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}></img>
      </div>
      <div className={classes.body}>
        <div className={classes.temp}>
          {`${data.main.temp > 0  ? '+' : ''}${Math.round(data.main.temp)}`}°C
          </div>
        <div className={classes.feelsLike}>
          Pojūtis
          <span>{`${data.main.feels_like > 0  ? '+' : ''}${Math.round(data.main.feels_like)}`}</span>
        </div>
        <div className={classes.description}>
          {data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}
        </div>
      </div>
      <div className={classes.footer}>
        {``}
      </div>
    </div>
  )
}

export default Card;