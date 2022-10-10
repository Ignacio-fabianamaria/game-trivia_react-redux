import { combineReducers } from 'redux';
import login from './login';
import game from './game';
import player from './player';

const rootReducer = combineReducers({
  login,
  game,
  player,

export default rootReducer;
