import React from 'react';

const Map = ({location}) => {
  return (
    <div>
        <iframe width="600" height="500" id="gmap_canvas" src={`https://maps.google.com/maps?q=${location}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
    </div>
  )
}

export default Map;