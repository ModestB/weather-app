import React from 'react';

import classes from './Map.module.scss';

const Map = ({location}) => {
  return (
    <div className={classes.map}>
      <iframe src={`https://maps.google.com/maps?q=${location}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
    </div>
  )
}

export default Map;