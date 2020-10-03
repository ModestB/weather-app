import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavouriteLocation, deleteFavouriteLocation } from '../../store/actions/index';

import classes from './Single.module.scss';

import Forecast from '../forecast/Forecast';
import Map from '../map/Map';
import BookmarkIcon from '../icons/BookmarkIcon'

const Single = () => {
  const data = useSelector(state => state.weather.data);
  const dispatch = useDispatch();
  const favouriteLocations = useSelector(state => state.pageSettings.favouriteLocations);
  const [active, setActive] = useState(false);
  const feelsLike = `${data.current.feels_like > 0  ? '+' : ''}${Math.round(data.current.feels_like)} °C`
  const pressure = `${data.current.pressure} hPa`;
  const humidity = `${data.current.humidity} %`;
  const windSpeed = `${data.current.wind_speed} m/s`;
  const visibility = `${data.current.visibility} m`;

  useEffect(() => {
    setActive(Object.keys(favouriteLocations).includes(data.name))
  }, [favouriteLocations, data])

  const bookmarkClickHandler = () => {
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
        <div className={classes.bookmark} onClick={bookmarkClickHandler}>
          <BookmarkIcon active={active} width={25} height={25} />
        </div>   
        <div className={classes.title}>{data.name}</div>  
      </div>
      <div className={classes.body}>
        <div className={classes.row}>
          <div className={classes.tempBlock}>
            <div className={classes.temp}>
              {`${data.current.temp > 0  ? '+' : ''}${Math.round(data.current.temp)}`} 
              <span>°C</span>
            </div>
          </div>
          <div className={classes.infoBlock}>
            <img className={classes.img} src={`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}></img>
            <div className={classes.weather}>
              {data.current.weather[0].description.charAt(0).toUpperCase() + data.current.weather[0].description.slice(1)}
            </div> 
          </div>
          <div 
            className={[
              classes.infoBlock, 
              classes.infoBlockSeconadry
            ].join(' ')}
          >
            <div className={classes.description}>
              <span>Feels like</span> {feelsLike}
            </div>
            <div className={classes.description}>
              <span>Pressure</span> {pressure}
            </div>
            <div className={classes.description}>
              <span>Humidity</span> {humidity}
            </div>
          </div>
          <div 
           className={[
              classes.infoBlock, 
              classes.infoBlockSeconadry
            ].join(' ')}
          >
            <div className={classes.description}>
              <span>Winds speed</span> {windSpeed}
            </div>
            <div className={classes.description}>
              <span>UV: </span>{data.current.uvi}
            </div>
            <div className={classes.description}>
              <span>Visibility </span>{visibility}
            </div>
          </div>
        </div>
        <div className={classes.row}>
          <Forecast data={data.daily} />
        </div>
        <div className={classes.row}>
          <Map location={data.name}/>
        </div>
      </div>
    </div>


  )

}

export default Single;