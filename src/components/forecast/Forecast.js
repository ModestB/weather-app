import React from 'react';
import dayjs from 'dayjs';
import {
  ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Label
} from 'recharts';
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';

import classes from './Forecast.module.scss';

const weekdayMap  =  {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
}

const Forecast = ({ data }) => {
  const graphData = [];

  data.forEach((entry) => {
    const initialDate = dayjs.unix(entry.dt);
    const date = `${weekdayMap[initialDate.day()]}. ${initialDate.format('MMM D')}`;
    const maxTemp = entry.temp.max; 
    const minTemp = entry.temp.min; 
    const icon = entry.weather[0].icon;
    const forecast = entry.weather[0].description.charAt(0).toUpperCase() + entry.weather[0].description.slice(1)
    graphData.push({
      name: date,
      maxTemp,
      minTemp,
      icon,
      forecast
    })
  })

  const CustomizedDot = (props) => {
    const { cx, cy, payload } = props;
  
    return (
      <svg x={cx - 40} y={cy - 40} width={800} height={800} viewBox="0 0 1024 1024">
        <image  xlinkHref={`http://openweathermap.org/img/wn/${payload.icon}@2x.png`} />
      </svg>
    );
  };

  const CustomTooltip = props => {
    // payload[0] doesn't exist when tooltip isn't visible
    if (props.payload[0] != null) {
      // mutating props directly is against react's conventions
      // so we create a new payload with the name and value fields set to what we want
      const newPayload = [
        {
          // all your data which created the tooltip is located in the .payload property
          value: props.payload[0].payload.forecast,
          // you can also add "unit" here if you need it
        },
        ...props.payload,
      ];
  
      // we render the default, but with our overridden payload
      return <DefaultTooltipContent {...props} payload={newPayload} />;
    }
  
    // we just render the default
    return <DefaultTooltipContent {...props} />;
  };

  const TooltipLabelFormater = (label, name, props) => {
    if (name === 'minTemp') {
      name = 'Low';
      label = `${label > 0  ? '+' : ''}${Math.round(label)}`
    }else if (name === 'maxTemp') {
      name = 'Hight';
      label = `${label > 0  ? '+' : ''}${Math.round(label)}`
    }

    return [label, name]
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}> 8-day forecast</div>
      <div className={classes.chartWrapper}>
        <ComposedChart
          width={900}
          height={250}
          data={graphData}
          fill='#ffffff'
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid fill='#0A0908' stroke="#0A0908"/>
          <XAxis 
            dataKey="name"
            stroke="#ffffff"
            dy={10}
          />
          <YAxis 
            stroke="#ffffff"
            dx={-10}
          >
            <Label
              value="Temperature, °C"
              position="insideLeft"
              angle={-90}
              style={{ textAnchor: 'middle' }}
            />
          </ YAxis>
          <Tooltip 
            formatter={(label, name, props) => TooltipLabelFormater(label, name, props)}
            content={<CustomTooltip />}
          />
          <Area 
            type="monotone"
            dataKey="maxTemp"
            stroke="#48acf0"
            fillOpacity={0.2}
            isAnimationActive={false}
            dot={<CustomizedDot />} 
          />
          <Area
            type="monotone"
            dataKey="minTemp"
            stroke="#C490D1"
            fillOpacity={0.2}
          />
        </ComposedChart>
      </div>
    </div>
  )
}

export default Forecast;