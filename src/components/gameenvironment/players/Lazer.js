import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Lazer = ({ lazerPosition, lazer, lazerRef, getLazerCoords }) => {
	const [count, setCount] = useState(0);

	const requestRef = useRef();

	const animate = time => {
		const max = 20;

		setCount(prevCount => (prevCount += 1));

		if (count >= max) {
			setCount(count => (count = 0));
			return () => cancelAnimationFrame(requestRef.current);
		}

		requestRef.current = requestAnimationFrame(animate);
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
