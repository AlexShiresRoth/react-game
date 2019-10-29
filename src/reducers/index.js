import { combineReducers } from 'redux';
import enemy from './enemy';
import lazer from './lazer';
import enemyHit from './enemyHit';
import enemyAmount from './enemyAmount';
import groundHeight from './gameArea';

export default combineReducers({
	enemy,
	lazer,
	enemyHit,
	enemyAmount,
	groundHeight,
});
