import { PLAYER_DIMENSIONS, LAZER_COORDINATES } from '../actions/types';

const initialState = {
	playerDimensions: {},
	lazerCoords: {},
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case PLAYER_DIMENSIONS:
			return {
				...state,
				playerDimensions: payload,
			};
		case LAZER_COORDINATES:
			return {
				...state,
				lazerCoords: payload,
			};
		default:
			return state;
	}
};
