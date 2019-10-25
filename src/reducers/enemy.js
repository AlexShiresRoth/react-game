import { ENEMY_COORDINATES } from '../actions/types';

const initialState = {
	enemyCoords: {},
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ENEMY_COORDINATES:
			return {
				...state,
				enemyCoords: payload,
			};
		default:
			return state;
	}
};
