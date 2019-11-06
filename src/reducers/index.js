import { combineReducers } from 'redux';
import enemy from './enemy';
import groundHeight from './gameArea';
import player from './player';

export default combineReducers({
	enemy,
	groundHeight,
	player,
});
