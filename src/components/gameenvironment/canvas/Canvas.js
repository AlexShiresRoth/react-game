import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCanvasSize } from '../../../actions/gameArea';

const Canvas = ({ getCanvasSize, canvasRef, children, layoutStyles }) => {
	useEffect(() => {
		if (canvasRef.current) {
			let canvasDimensions = canvasRef.current.getBoundingClientRect();

			getCanvasSize(canvasDimensions);
		}
	}, []);
	return (
		<div ref={canvasRef} className={layoutStyles.game__area}>
			{children}
		</div>
	);
};

Canvas.propTypes = {
	layoutStyles: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
	return {
		gameArea: state.gameArea,
	};
};

export default connect(mapStateToProps, { getCanvasSize })(Canvas);
