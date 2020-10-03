import React from "react";
import { useDispatch } from 'react-redux';
import { getWeatherData } from '../../../store/actions/index';
import BookmarkIcon from '../../icons/BookmarkIcon';
import { deleteFavouriteLocation } from '../../../store/actions/index';

import classes from './Card.module.scss'

const Card = ({data}) => {
  const dispatch = useDispatch();

  const cardClickHandler = () => {
    dispatch(getWeatherData(data.coord.lat, data.coord.lon, data.name))
  }

  const bookmarkClickHandler = (e) => {
    e.stopPropagation();
    dispatch(deleteFavouriteLocation(data.name));
  }
  return (
    <div 
      className={classes.card}
      onClick={cardClickHandler}
    >
      <div className={classes.header}>
        <div className={classes.bookmark} onClick={bookmarkClickHandler}>
          <BookmarkIcon active={true} />
        </div>
        <div className={classes.title}>{data.name}</div>
        <div className={classes.temp}>
          {`${data.main.temp > 0  ? '+' : ''}${Math.round(data.main.temp)}`}°C
          </div>
        <img className={classes.img} src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}></img>
      </div>
    </div>
  )
}

export default Card;