import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Lazer = ({ lazerStyles, lazerPosition, lazer, lazerRef, getLazerCoords }) => {
	useEffect(() => {
		let count = 0;
		setInterval(() => {
			if (count < 100) {
				getLazerCoords(lazerRef.current.getBoundingClientRect());
				return clearInterval();
			}
			count += 1;
		}, 200);
		return getLazerCoords(lazerRef.current.getBoundingClientRect());
	}, []);

	return (
		<div
			ref={lazerRef}
			className={lazer}
			style={{
				...lazerStyles,
				left: `${lazerPosition.left > 100 ? (lazerPosition.left = 0) : lazerPosition.left}vw`,
			}}
		></div>
	);
};

Lazer.propTypes = {
	lazerStyles: PropTypes.object.isRequired,
	lazerPosition: PropTypes.object.isRequired,
};

export default Lazer;
