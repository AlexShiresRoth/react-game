import React, { useEffect } from 'react';
import Enemy from '../players/Enemy';
import Ground from './Ground';
import Rocks from './Rocks';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const LevelOne = ({
	groundDimensions,
	enemyHit,
	enemyRef1,
	enemyRef2,
	getDimensions,
	enemyDimensions,
	setEnemyAmt,
	groundRef,
}) => {
	const levelOneEnemies = [
		{
			enemy: 'enemyOne',
			ref: enemyRef1,
			styles: {
				height: `${1092 / 6}px`,
				width: `${1712 / 8}px`,
				top: `${groundDimensions.top - 1092 / 6}px`,
				left: `${groundDimensions.width - 1000}px`,
				position: 'absolute',
				display: 'block',
				background: '',
			},
			hit: false,
		},
		{
			enemy: 'enemyTwo',
			ref: enemyRef2,
			styles: {
				height: `${1092 / 6}px`,
				width: `${1712 / 8}px`,
				top: `${groundDimensions.top - 1092 / 6}px`,
				background: '',
				position: 'absolute',
				display: 'block',
				left: `${groundDimensions.width - 500}px`,
			},
			hit: false,
		},
	];
	useEffect(() => {
		setEnemyAmt(levelOneEnemies);

		return () => setEnemyAmt(levelOneEnemies);
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
				enemyStyles={enemy.styles}
			/>
		);
	});
	if (groundDimensions.top) {
		return (
			<>
				{enemyMap}
				<Rocks />
				<Ground groundRef={groundRef} />
			</>
		);
	}
	return (
		<>
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
		groundDimensions: state.gameArea.groundDimensions,
		enemy: state.enemy,
		enemyCoords: state.enemy.enemyCoords,
	};
};

export default connect(mapStateToProps)(LevelOne);
