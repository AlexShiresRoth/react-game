import { combineReducers } from 'redux';
import enemy from './enemy';
import lazer from './lazer';
import enemyHit from './enemyHit';

export default combineReducers({
	enemy,
	lazer,
	enemyHit,
});
