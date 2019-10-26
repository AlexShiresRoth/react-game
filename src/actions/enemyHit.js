export const getEnemyHit = hit => async dispatch => {
	dispatch({
		type: 'ENEMY_HIT',
		payload: await hit,
	});
};
