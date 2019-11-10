import { GROUND_HEIGHT, WINDOW_SIZE } from '../actions/types';

const initialState = {
	groundHeight: {},
	windowSize: {},
};
export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GROUND_HEIGHT:
			return {
				...state,
				groundHeight: payload,
			};
		case WINDOW_SIZE:
			return {
				...state,
				windowSize: payload,
			};
		default:
			return state;
	}
};
