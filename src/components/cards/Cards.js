import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Card from './card/Card';

import classes from './Cards.module.scss';

const Cards = () => {
  const data = useSelector(state => state.weather.data);

  return (
    <div className={classes.cards}>
      {
        data.map(entry => <Card key={entry.id} data={entry} />)
      }
    </div>
  )
}

export default Cards;