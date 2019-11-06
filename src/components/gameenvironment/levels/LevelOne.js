import React, { useEffect } from 'react';
import Enemy from '../players/Enemy';
import Ground from './Ground';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const LevelOne = ({
	enemies,
	enemyHit,
	enemyRef1,
	enemyRef2,
	enemyCoords,
	getDimensions,
	enemyDimensions,
	setEnemyAmt,
	groundRef,
}) => {
	const levelOneEnemies = [
		{
			enemy: 'enemyOne',
			ref: enemyRef1,
			coords: enemyCoords[0],
			spawnX: '40vw',
			spawnY: '50vh',
			hit: false,
		},
		{
			enemy: 'enemyTwo',
			ref: enemyRef2,
			coords: enemyCoords[1],
			spawnX: '60vw',
			spawnY: '30vh',
			hit: false,
		},
	];
	useEffect(() => {
		return setEnemyAmt(levelOneEnemies);
	}, []);
	const enemyMap = levelOneEnemies.map((enemy, i) => {
		return (
			<Enemy
				enemyRef={enemy.ref}
				enemyDimensions={enemyDimensions}
				getDimensions={getDimensions}
				key={i}
				index={i}
				enemyHit={enemyHit}
				title={enemy.enemy}
				randomSpawnX={enemy.spawnX}
				randomSpawnY={enemy.spawnY}
			/>
		);
	});
	return (
		<>
			{enemyMap}
			<Ground groundRef={groundRef} />
		</>
	);
};

LevelOne.propTypes = {
	groundRef: PropTypes.object.isRequired,
	enemyDimensions: PropTypes.array.isRequired,
	enemyHit: PropTypes.object.isRequired,
	setEnemyAmt: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
	return {
		enemyHit: state.enemy.enemyHit,
	};
};

export default connect(mapStateToProps)(LevelOne);
