import { combineReducers } from 'redux';
import enemy from './enemy';
import gameArea from './gameArea';
import player from './player';

export default combineReducers({
	enemy,
	gameArea,
	player,
});
