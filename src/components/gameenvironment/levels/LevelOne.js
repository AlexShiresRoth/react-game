import React, { useEffect } from 'react';
import Enemy from '../players/Enemy';
import PropTypes from 'prop-types';

const LevelOne = ({ enemies, levelOneEnemies, getDimensions, enemyDimensions, enemyHit, setEnemyAmt }) => {
	useEffect(() => {
		return setEnemyAmt(levelOneEnemies);
	}, []);

	const enemyMap = levelOneEnemies.map((enemy, i) => {
		return (
			<Enemy
				enemyRef={enemy.ref}
				enemyDimensions={enemyDimensions}
				getDimensions={getDimensions}
				enemyHit={enemyHit}
				key={i}
				title={enemy.enemy}
				randomSpawnX={enemy.spawnX}
				randomSpawnY={enemy.spawnY}
			/>
		);
	});
	return <>{enemyMap}</>;
};

LevelOne.propTypes = {};

export default LevelOne;
