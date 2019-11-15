import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEnemyCoordinates } from '../../../actions/enemy';

const Enemy = ({ enemyRef, getDimensions, enemyHit, title, index, enemyStyles }) => {
	const [enemyImg, setEnemyImg] = useState('');
	const [imgPosX, setImgPosX] = useState(0);
	const [imgPosY, setImgPosY] = useState(0);

	const animationRef = useRef();

	const movePosition = time => {
		const width = 1060 / 5;
		const height = 1092 / 6;

		setImgPosX(prevWidth => prevWidth + width);
		setImgPosY(prevHeight => prevHeight + height);
		animationRef.current = requestAnimationFrame(movePosition);
	};

	useEffect(() => {
		if (enemyRef.current) {
			setEnemyImg(
				'https://res.cloudinary.com/snackmanproductions/image/upload/v1573793183/react-game/walk_idwgi0.png'
			);
			getEnemyCoordinates(enemyRef.current.getBoundingClientRect());
			getDimensions(enemyRef.current.getBoundingClientRect());

			animationRef.current = requestAnimationFrame(movePosition);
			return () => cancelAnimationFrame(animationRef.current);
		}
	}, []);
	if (!enemyHit[index]) {
		return (
			<div
				className={title}
				style={{
					...enemyStyles,
					background: `url(${enemyImg}) ${imgPosX}px ${imgPosY}px`,
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
				background: `url(${enemyImg}) ${imgPosX}px 0px`,
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
	return { enemyCoords: state.enemy.enemyCoords, enemy: state.enemy };
};

export default connect(mapStateToProps, { getEnemyCoordinates })(Enemy);
