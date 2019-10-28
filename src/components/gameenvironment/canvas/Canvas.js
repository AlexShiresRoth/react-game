import React from 'react';
import PropTypes from 'prop-types';

class Canvas extends React.Component {
	render() {
		return (
			<div ref={this.props.canvasRef} className={this.props.layoutStyles.game__area}>
				{this.props.children}
			</div>
		);
	}
}

Canvas.propTypes = {
	layoutStyles: PropTypes.object.isRequired,
};

export default Canvas;
