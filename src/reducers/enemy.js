import { ENEMY_COORDINATES, ENEMY_AMOUNT, ENEMY_HIT } from '../actions/types';

const initialState = {
	spriteSheetHeight: 0,
	spriteSheetWidth: 0,
	enemyCoords: {},
	enemyAmount: [],
	enemyHit: [],
	enemyType: '',
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
