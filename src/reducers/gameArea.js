import { GROUND_DIMENSIONS, CANVAS_DIMENSIONS, WINDOW_DIMENSIONS } from '../actions/types';

const initialState = {
	groundDimensions: {},
	windowDimensions: null,
	canvasSize: {},
};
export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case WINDOW_DIMENSIONS:
			return {
				...state,
				windowDimensions: payload,
			};
		case GROUND_DIMENSIONS:
			return {
				...state,
				groundDimensions: payload,
			};
		case CANVAS_DIMENSIONS:
			return {
				...state,
				canvasSize: payload,
			};
		default:
			return state;
	}
};
