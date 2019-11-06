import { ENEMY_COORDINATES, ENEMY_AMOUNT, ENEMY_HIT } from '../actions/types';

const initialState = {
	enemyCoords: {},
	enemyAmount: [],
	enemyHit: [],
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ENEMY_COORDINATES:
			return {
				...state,
				enemyCoords: payload,
			};
		case ENEMY_AMOUNT:
			return {
				...state,
				enemyAmount: payload,
			};
		case ENEMY_HIT:
			return {
				...state,
				enemyHit: payload,
			};
		default:
			return state;
	}
};
