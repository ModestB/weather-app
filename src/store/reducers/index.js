import { combineReducers } from 'redux';

import weather from './weather/weather';
import pageSettings from './pageSettings/pageSettings';

export default combineReducers({
  weather,
  pageSettings,
})