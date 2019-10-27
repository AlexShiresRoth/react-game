import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Enemy = ({ enemyRef, getDimensions, enemyHit, title }) => {
	const randomSpawnX = Math.floor(Math.random() * 100);
	const randomSpawnY = Math.floor(Math.random() * 100);
	const enemyStyle = {
		height: '10rem',
		width: '10rem',
		position: 'absolute',
		background: 'red',
		display: 'block',
		top: `${randomSpawnY >= 0 && randomSpawnY <= 85 ? randomSpawnY : 0}vh`,
		left: `${randomSpawnX >= 40 && randomSpawnX <= 95 ? randomSpawnX : 40}vw`,
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
