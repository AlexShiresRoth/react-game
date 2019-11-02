import { PLAYER_HEIGHT, LAZER_COORDINATES } from '../actions/types';

const initialState = {
	playerHeight: 0,
	lazerCoords: {},
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case PLAYER_HEIGHT:
			return {
				...state,
				playerHeight: payload,
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
