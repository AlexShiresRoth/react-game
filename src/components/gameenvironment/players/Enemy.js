import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Enemy = ({ enemyRef, getDimensions, enemyHit, title, randomSpawnX, randomSpawnY }) => {
	const enemyStyle = {
		height: '10rem',
		width: '10rem',
		position: 'absolute',
		background: 'red',
		display: 'block',
		top: `${randomSpawnY}`,
		left: `${randomSpawnX}`,
	};
	useEffect(() => {
		if (enemyRef.current) {
			const enemy = enemyRef.current.getBoundingClientRect();

			return getDimensions(enemy);
		}
		return;
	}, []);

	return (
		<div
			className={title}
			style={{ ...enemyStyle, display: `${enemyHit.enemyHit ? 'none' : 'block'}` }}
			ref={enemyRef}
		></div>
	);
};

Enemy.propTypes = {
	enemyRef: PropTypes.object.isRequired,
	getDimensions: PropTypes.func.isRequired,
};

export default Enemy;
