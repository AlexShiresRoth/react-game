import { combineReducers } from 'redux';
import enemy from './enemy';
import lazer from './lazer';

export default combineReducers({
	enemy,
	lazer,
});
