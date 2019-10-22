import React, { useState } from 'react';
import PropTypes from 'prop-types';

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

export default Enemy;
