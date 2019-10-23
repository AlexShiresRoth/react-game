import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getEnemyCoordinates } from '../../../actions/enemy';
import { connect } from 'react-redux';

const Enemy = ({ enemyRef, enemyStyle, getDimensions }) => {
	const [enemyCoords, setCoords] = useState({
		top: '',
		left: '',
		bottom: '',
		right: '',
	});

	setTimeout(() => {
		if (enemyRef.current) {
			const enemy = enemyRef.current.getBoundingClientRect();
			const enemyArea = {
				top: enemy.top,
				left: enemy.left,
				right: enemy.right,
				bottom: enemy.bottom,
			};

			setCoords(enemyArea);
		}
	}, 200);

	return <div className="enemy" style={enemyStyle} onClick={() => getDimensions(enemyCoords)} ref={enemyRef}></div>;
};

Enemy.propTypes = {};

const mapStateToProps = state => ({
	coords: state.coords,
});

export default connect(
	mapStateToProps,
	{ getEnemyCoordinates }
)(Enemy);
