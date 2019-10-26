import { ENEMY_HIT } from '../actions/types';

const initialState = {
	enemyHit: false,
};
export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ENEMY_HIT:
			return {
				...state,
				enemyHit: payload,
			};
		default:
			return state;
	}
};
