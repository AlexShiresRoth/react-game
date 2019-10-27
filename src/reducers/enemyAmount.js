import { ENEMY_AMOUNT } from '../actions/types';

const initialState = {
	enemyAmount: 3,
};
export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ENEMY_AMOUNT:
			return {
				...state,
				enemyAmount: payload,
			};
		default:
			return state;
	}
};
