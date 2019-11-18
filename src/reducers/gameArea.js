import { GROUND_DIMENSIONS, CANVAS_DIMENSIONS } from '../actions/types';

const initialState = {
	groundDimensions: {},
	canvasSize: {},
};
export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
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
