import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Card from './card/Card';

import classes from './FavouriteCards.module.scss';

const FavouriteCards = () => {
  const data = useSelector(state => state.weather.favourieLocationData);

  return (
    <React.Fragment>
      <div className={classes.title}>Favourite locations</div>
      <div className={classes.cards}>
        {
          data.map(entry => <Card key={entry.id} data={entry} />)
        }
      </div>
    </React.Fragment>
  )
}

export default FavouriteCards;