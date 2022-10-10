import { combineReducers } from 'redux';
import player from './player';

const rootReducer = combineReducers({
  player,
  // outro reducer
});

export default rootReducer;
