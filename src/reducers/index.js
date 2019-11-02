import { combineReducers } from 'redux';
import enemy from './enemy';
import enemyHit from './enemyHit';
import enemyAmount from './enemyAmount';
import groundHeight from './gameArea';
import player from './player';

export default combineReducers({
	enemy,
	enemyHit,
	enemyAmount,
	groundHeight,
	player,
});
