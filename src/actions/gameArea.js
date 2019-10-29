export const getGroundHeight = dimensions => async dispatch => {
	dispatch({
		type: 'GROUND_HEIGHT',
		payload: await dimensions,
	});
};
