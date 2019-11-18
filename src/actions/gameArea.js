export const getGroundDimensions = dimensions => async dispatch => {
	dispatch({
		type: 'GROUND_DIMENSIONS',
		payload: await dimensions,
	});
};

export const getCanvasSize = dimensions => async dispatch => {
	dispatch({
		type: 'CANVAS_DIMENSIONS',
		payload: await dimensions,
	});
};
