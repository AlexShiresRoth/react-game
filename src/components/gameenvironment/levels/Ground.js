import React, { useEffect } from 'react';
import groundStyle from './levelonestyles/Ground.module.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGroundDimensions } from '../../../actions/gameArea';

const Ground = ({ gameArea, groundRef, getGroundDimensions, getWindowSize }) => {
	useEffect(() => {
		if (groundRef.current) {
			const ground = groundRef.current.getBoundingClientRect();

			getGroundDimensions(ground);
		}

		const handleResize = () => {
			getGroundDimensions(groundRef.current.getBoundingClientRect());
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);
	return (
		<>
			<div
				className={groundStyle.ground}
				style={{ width: `${gameArea.canvasSize.width}px` }}
				ref={groundRef}
			></div>
		</>
	);
};

Ground.propTypes = {
	groundRef: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
	return {
		gameArea: state.gameArea,
	};
};

export default connect(mapStateToProps, { getGroundDimensions })(Ground);
