export const setEnemyAmount = amount => async dispatch => {
	dispatch({
		type: 'ENEMY_AMOUNT',
		payload: await amount,
	});
};
