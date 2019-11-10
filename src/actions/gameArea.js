export const getGroundHeight = dimensions => async dispatch => {
	dispatch({
		type: 'GROUND_HEIGHT',
		payload: await dimensions,
	});
};

export const getWindowSize = dimensions => async dispatch => {
	dispatch({
		type: 'WINDOW_SIZE',
		payload: await dimensions,
	});
};
