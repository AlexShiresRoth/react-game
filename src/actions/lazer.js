export const getLazerCoordinates = lazerCoords => async dispatch => {
	dispatch({
		type: 'LAZER_COORDINATES',
		payload: await lazerCoords,
	});
};
