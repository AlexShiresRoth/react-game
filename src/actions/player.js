export const setPlayerCharacter = player => async dispatch => {
	dispatch({
		type: 'PLAYER_CHARACTER',
		payload: await player,
	});
};

export const getPlayerDimensions = dimensions => async dispatch => {
	dispatch({
		type: 'PLAYER_DIMENSIONS',
		payload: await dimensions,
	});
};
export const getLazerCoordinates = lazerCoords => async dispatch => {
	dispatch({
		type: 'LAZER_COORDINATES',
		payload: await lazerCoords,
	});
};
