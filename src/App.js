import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getInitialWeatherDate } from './store/actions/index';

import classes from './App.module.scss'

import Search from './components/search/Search';
import FavourtieCards from './components/favouriteCards/FavouriteCards';
import Single from './components/single/Single';

function App() {
  const dispatch = useDispatch();
  const showSinglePage = useSelector(state => state.pageSettings.showSinglePage)

  useEffect(() => {
    dispatch(getInitialWeatherDate());
  }, []);

  return (
    <div className={classes.container}>
      <Search />
      {showSinglePage && <Single />}
      <FavourtieCards />
    </div>
  );
}

export default App;
