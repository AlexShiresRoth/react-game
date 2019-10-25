import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Enemy = ({ enemyRef, enemyStyle, getDimensions }) => {
	useEffect(() => {
		if (enemyRef.current) {
			const enemy = enemyRef.current.getBoundingClientRect();
			const enemyArea = {
				top: Math.floor(enemy.top),
				left: Math.floor(enemy.left),
				right: Math.floor(enemy.right),
				bottom: Math.floor(enemy.bottom),
			};

			return getDimensions(enemyArea);
		}
	}, []);

	return <div className="enemy" style={enemyStyle} ref={enemyRef}></div>;
};

Enemy.propTypes = {
	enemyRef: PropTypes.object.isRequired,
	enemyStyle: PropTypes.object.isRequired,
	getDimensions: PropTypes.func.isRequired,
};

export default Enemy;
