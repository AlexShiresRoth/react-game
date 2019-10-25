import { LAZER_COORDINATES } from '../actions/types';

const initialState = {
	lazerCoords: {},
};
export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case LAZER_COORDINATES:
			return {
				...state,
				lazerCoords: payload,
			};
		default:
			return state;
	}
};
