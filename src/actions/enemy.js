export const getEnemyCoordinates = enemyCoords => async dispatch => {
	dispatch({
		type: 'ENEMY_COORDINATES',
		payload: await enemyCoords,
	});
};

export const setEnemyAmount = amount => async dispatch => {
	dispatch({
		type: 'ENEMY_AMOUNT',
		payload: await amount,
	});
};

export const getEnemyHit = hit => async dispatch => {
	dispatch({
		type: 'ENEMY_HIT',
		payload: await hit,
	});
};
