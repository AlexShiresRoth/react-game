import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Lazer = ({ lazerPosition, lazer, lazerRef, getLazerCoords }) => {
	const lazerStyles = {
		position: 'absolute',
		height: '0.5rem',
		width: '4rem',
		top: '40%',
		left: '100%',
		background: 'orange',
		display: 'none',
	};
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (lazerRef.current) {
			let interval = setInterval(() => {
				setCount(count => count + 1);
			}, 200);

			setTimeout(() => {
				clearInterval(interval);
			}, 900);

			return () => clearInterval(interval);
		}
	}, []);

	if (lazerRef.current) {
		if (count < 10) {
			getLazerCoords(lazerRef.current.getBoundingClientRect());
		}
	}
	return (
		<div
			ref={lazerRef}
			className={lazer}
			style={{
				...lazerStyles,
				left: `${lazerPosition.left > 100 ? (lazerPosition.left = 0) : lazerPosition.left}vw`,
				display: `${lazerPosition.left < 100 && lazerPosition.left > 0 ? 'block' : 'none'}`,
			}}
		></div>
	);
};

Lazer.propTypes = {
	lazerPosition: PropTypes.object.isRequired,
};

export default Lazer;
