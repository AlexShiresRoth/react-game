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
		console.log(count);
	};

	useEffect(() => {
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
				left: `${count}vw`,
				display: `${lazerPosition.left <= 100 && lazerPosition.left >= 0 ? 'block' : 'none'}`,
			}}
		></div>
	);
};

Lazer.propTypes = {
	lazerPosition: PropTypes.object.isRequired,
};

export default Lazer;
