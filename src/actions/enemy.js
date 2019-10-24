export const getEnemyCoordinates = coords => async dispatch => {
	dispatch({
		type: 'ENEMY_COORDINATES',
		payload: await coords,
	});
};
