export const getPlayerHeight = height => async dispatch => {
	dispatch({
		type: 'PLAYER_HEIGHT',
		payload: await height,
	});
};
export const getLazerCoordinates = lazerCoords => async dispatch => {
	dispatch({
		type: 'LAZER_COORDINATES',
		payload: await lazerCoords,
	});
};
