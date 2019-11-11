import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEnemyCoordinates } from '../../../actions/enemy';

const Enemy = ({ enemyRef, getDimensions, enemyHit, title, index, enemyStyles }) => {
	const [enemyImg, setEnemyImg] = useState('');
	//possibly get rid of this when more awake
	const [enemyCoordinates, setEnemyCoordinates] = useState({});

	useEffect(() => {
		if (enemyRef.current) {
			setEnemyImg(
				'https://res.cloudinary.com/snackmanproductions/image/upload/v1573431925/react-game/idle_stufr8.png'
			);
			setEnemyCoordinates(enemyRef.current.getBoundingClientRect());
			getEnemyCoordinates(enemyRef.current.getBoundingClientRect());
			getDimensions(enemyRef.current.getBoundingClientRect());
		}
	}, []);
	if (!enemyHit[index]) {
		return (
			<div
				className={title}
				style={{
					...enemyStyles,
					background: `url(${enemyImg}) 0px 0px`,
				}}
				ref={enemyRef}
			></div>
		);
	}
	return (
		<div
			className={title}
			style={{
				...enemyStyles,
				background: `url(${enemyImg}) 0px 0px`,
				display: `${enemyHit[index].hit ? 'none' : 'block'}`,
			}}
			ref={enemyRef}
		></div>
	);
};

Enemy.propTypes = {
	enemyRef: PropTypes.object.isRequired,
	getDimensions: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
	return { enemyCoords: state.enemy.enemyCoords };
};

export default connect(
	mapStateToProps,
	{ getEnemyCoordinates }
)(Enemy);
