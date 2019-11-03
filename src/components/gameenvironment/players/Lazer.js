import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Lazer = ({ lazerPosition, lazer, lazerRef, getLazerCoords }) => {
	const [count, setCount] = useState(0);

	const requestRef = useRef();

	const animate = time => {
		let interval = Math.floor((time * 0.01) % 100);
		setCount(count => count + interval);

		requestRef.current = requestAnimationFrame(animate);

		if (interval >= 50) {
			return cancelAnimationFrame(requestRef.current);
		}
	};

	useEffect(() => {
		console.log(lazerPosition);
		requestRef.current = requestAnimationFrame(animate);

		return () => cancelAnimationFrame(requestRef.current);
	}, []);

	const lazerStyles = {
		position: 'absolute',
		height: '0.5rem',
		width: '4rem',
		background: 'orange',
		display: 'none',
	};
	return (
		<div
			ref={lazerRef}
			className={lazer}
			style={{
				...lazerStyles,
				left: `${lazerPosition}vw`,
				display: `${lazerPosition <= 100 && lazerPosition >= 0 ? 'block' : 'none'}`,
			}}
		></div>
	);
};

Lazer.propTypes = {
	lazerPosition: PropTypes.number.isRequired,
};

export default Lazer;
