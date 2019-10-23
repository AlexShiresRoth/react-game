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
