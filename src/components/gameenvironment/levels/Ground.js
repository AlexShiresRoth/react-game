import React, { useState, useEffect } from 'react';
import groundStyle from './levelonestyles/Ground.module.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGroundHeight } from '../../../actions/gameArea';

const Ground = props => {
	const [groundHeight, setGroundHeight] = useState(0);

	useEffect(() => {
		if (props.groundRef.current) {
			const groundTop = props.groundRef.current.getBoundingClientRect();
			setGroundHeight(groundTop);
			props.getGroundHeight(groundTop);
		}

		const handleResize = () => {
			props.getGroundHeight(props.groundRef.current.getBoundingClientRect());
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);
	return (
		<>
			<div className={groundStyle.ground} ref={props.groundRef}></div>
			<div className={groundStyle.rocks}></div>
		</>
	);
};

Ground.propTypes = {
	groundRef: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
	return {
		groundHeight: state.groundHeight,
	};
};

export default connect(
	mapStateToProps,
	{ getGroundHeight }
)(Ground);
