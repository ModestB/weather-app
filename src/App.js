import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getInitialWeatherDate } from './store/actions/index';

import classes from './App.module.scss'

import Cards from './components/cards/Cards';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitialWeatherDate());
  }, []);

  return (
    <div className={classes.container}>
      <Cards />
    </div>
  );
}

export default App;
