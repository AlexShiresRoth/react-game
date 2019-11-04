import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Lazer = ({ lazerPosition, lazer, lazerRef, getLazerCoords }) => {
	useEffect(() => {
		if (lazerRef.current) {
			let coords = lazerRef.current.getBoundingClientRect();

			getLazerCoords(coords);
		}
	}, []);
	const lazerStyles = {
		position: 'absolute',
		height: '0.2rem',
		width: '2rem',
		background: 'orange',
		display: 'none',
	};
	return (
		<div
			ref={lazerRef}
			className={lazer}
			style={{
				...lazerStyles,
				left: `${lazerPosition.left}vw`,
				display: `${lazerPosition.left <= 100 && lazerPosition.left >= 0 ? 'block' : 'none'}`,
			}}
		></div>
	);
};

Lazer.propTypes = {
	lazerPosition: PropTypes.object.isRequired,
	lazer: PropTypes.string.isRequired,
	lazerRef: PropTypes.object.isRequired,
	getLazerCoords: PropTypes.func.isRequired,
};

export default Lazer;
