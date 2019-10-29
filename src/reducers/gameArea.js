import { GROUND_HEIGHT } from '../actions/types';

const initialState = {
	groundHeight: {},
};
export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GROUND_HEIGHT:
			return {
				...state,
				groundHeight: payload,
			};
		default:
			return state;
	}
};
