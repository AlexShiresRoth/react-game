import React from 'react';
import PropTypes from 'prop-types';
import PlayerOne from './players/PlayerOne';
import layoutStyles from './gamestyles/GameEnvironment.module.scss';
const GameEnvironment = props => {
	return (
		<div className={layoutStyles.game__area}>
			<PlayerOne />
		</div>
	);
};

GameEnvironment.propTypes = {};

export default GameEnvironment;
