import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import rockStyles from './levelonestyles/Rocks.module.scss';

const Rocks = ({ gameArea }) => {
	const [rockPosition, setRockPosition] = useState(0);

	const rockRef = useRef();

	useEffect(() => {
		if (gameArea.groundDimensions.top !== undefined) {
			const rockHeight = rockRef.current.getBoundingClientRect().height;
			let groundTop = gameArea.groundDimensions.top;
			setRockPosition(groundTop - rockHeight);
		}
	}, []);

	return <div className={rockStyles.rock} ref={rockRef} style={{ top: `${rockPosition}px` }}></div>;
};

Rocks.propTypes = {};
const mapStateToProps = state => ({
	gameArea: state.gameArea,
});
export default connect(mapStateToProps)(Rocks);
