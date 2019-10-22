import React from 'react';
import PropTypes from 'prop-types';

const Lazer = ({ lazerStyles, lazerPosition, lazer, lazerRef, enemyDimensions }) => {
	if (lazerRef.current) {
		const lazerDimensions = lazerRef.current.getBoundingClientRect();
		let lazerCoords = {
			top: lazerDimensions.top,
			left: lazerDimensions.left,
			bottom: lazerDimensions.bottom,
			right: lazerDimensions.right,
		};
		let enemyCoords = {
			top: enemyDimensions.top,
			left: enemyDimensions.left,
			right: enemyDimensions.right,
			bottom: enemyDimensions.bottom,
		};
		for (let coord in lazerCoords) {
			console.log(Math.floor(lazerCoords[coord]) === Math.floor(enemyCoords[coord]) ? 'hit' : 'no');
			return Math.floor(lazerCoords[coord]) === Math.floor(enemyCoords[coord]) ? 'hit' : 'no';
		}
	}
	return (
		<div
			ref={lazerRef}
			className={lazer}
			style={{ ...lazerStyles, left: `${lazerPosition > 100 ? (lazerPosition = 0) : lazerPosition}vw` }}
		></div>
	);
};

Lazer.propTypes = {
	playerStyles: PropTypes.object,
	lazerPosition: PropTypes.number,
};

export default Lazer;
