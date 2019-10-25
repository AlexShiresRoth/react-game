export const getEnemyCoordinates = enemyCoords => async dispatch => {
	dispatch({
		type: 'ENEMY_COORDINATES',
		payload: await enemyCoords,
	});
};
