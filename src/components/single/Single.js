import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { addFavouriteLocation, deleteFavouriteLocation } from '../../store/actions/index';

import classes from './Single.module.scss';

import ForecastCards from '../forecastCards/ForecastCards';
import Map from '../map/Map';
import BookmarkIcon from '../icons/BookmarkIcon'

const Single = () => {
  const data = useSelector(state => state.weather.data);
  const dispatch = useDispatch();
  const favouriteLocations = useSelector(state => state.pageSettings.favouriteLocations);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(Object.keys(favouriteLocations).includes(data.name))
  }, [favouriteLocations, data])

  const bookmarkClickHandler = () => {
    console.log(active)
    if (!active) {
      const location = {};
      location[data.name] = data.cityId;
      dispatch(addFavouriteLocation(location))
    } else {
      dispatch(deleteFavouriteLocation(data.name))
    }  
  }
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div onClick={bookmarkClickHandler}>
          <BookmarkIcon active={active} />
        </div>   
        <div className={classes.title}>{data.name}</div>
        <img className={classes.img} src={`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}></img>
      </div>
      <div className={classes.body}>
        <div className={classes.row}>
          <div className={classes.tempBlock}>
            <div className={classes.time}>Dabar {dayjs().format('HH:mm')}</div>
            <div className={classes.temp}>
              {`${data.current.temp > 0  ? '+' : ''}${Math.round(data.current.temp)}`}°C
            </div>
            <div className={classes.feelsLike}>
              Pojūtis {`${data.current.feels_like > 0  ? '+' : ''}${Math.round(data.current.feels_like)}`}°C
            </div>
            <div className={classes.description}>
              {data.current.weather[0].description.charAt(0).toUpperCase() + data.current.weather[0].description.slice(1)}
            </div>
          </div>
          <ForecastCards data={data.daily} />
          <Map location={data.name}/>
        </div>
      </div>
    </div>


  )

}

export default Single;