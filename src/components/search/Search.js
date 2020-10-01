import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWeatherDataWithGeocode } from '../../store/actions/index';

import classes from './Search.module.scss';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('Bad location entered');
  const hasError = useSelector(state => state.weather.error);
  const errorMsg = useSelector(state => state.weather.errorMsg);

  const sumbitHandler = () => {
    if (!inputValueValidator(value)) {
      setShowAlert(true);
      setAlertMsg('Bad location entered');
    } else {
      setShowAlert(false);
      dispatch(getWeatherDataWithGeocode(value))
    }
  };

  useEffect(() => {
    if (hasError) {
      setShowAlert(true);
      setAlertMsg(errorMsg);
    } else {
      setShowAlert(false);
      setAlertMsg('Bad location entered');
    }
  }, [hasError])

  return (
    <div className={classes.container}>
      <div className={classes.formGroup}>
        <input
          type='text'
          className={classes.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search for your location"
        />
        <button
          className={classes.button}
          onClick={sumbitHandler}
        >
          Search
        </button>
      </div>

      {
        showAlert &&
      <div className={classes.alert}>{alertMsg}</div>
      }
    </div>
  )
}

function inputValueValidator(str) {
  const regex = /^[a-z0-9]+$/i;

  if (!str.length) {
    return false;
  }

  return regex.test(str);
};

export default Search;