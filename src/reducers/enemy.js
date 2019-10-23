import { ENEMY_COORDINATES } from '../actions/types';

const initialState = {
	coords: {},
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ENEMY_COORDINATES:
			return {
				...state,
				coords: payload,
			};
		default:
			return state;
	}
};
