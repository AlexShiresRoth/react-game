import { ENEMY_COORDINATES } from './types';

export const getEnemyCoordinates = coords => async dispatch => {
	try {
		dispatch({
			type: ENEMY_COORDINATES,
			payload: coords,
		});
	} catch (error) {}
};
