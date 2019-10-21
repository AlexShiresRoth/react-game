import React from 'react';
import PropTypes from 'prop-types';

const Lazer = ({ lazerStyles, lazerPosition }) => {
	return (
		<div style={{ ...lazerStyles, left: `${lazerPosition > 100 ? (lazerPosition = 0) : lazerPosition}vw` }}></div>
	);
};

Lazer.propTypes = {
	playerStyles: PropTypes.object,
	lazerPosition: PropTypes.number,
};

export default Lazer;
