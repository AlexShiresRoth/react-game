import { PLAYER_DIMENSIONS, PLAYER_CHARACTER, LAZER_COORDINATES } from '../actions/types';

const initialState = {
	playerCharacter: {},
	playerDimensions: {},
	lazerCoords: {},
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case PLAYER_CHARACTER:
			return {
				...state,
				playerCharacter: payload,
			};
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
