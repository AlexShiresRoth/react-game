import React from 'react';
import PropTypes from 'prop-types';
import playerStyles from './playerstyles/PlayerOne.module.scss';
export default class PlayerOne extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startingPositionY: null,
			startingPositionX: null,
		};

		this.movePlayer = this.movePlayer.bind(this);
	}
	coords = {
		top: 40,
		left: 10,
	};
	dimensions = {
		height: 5,
		width: 5,
	};

	movePlayer = e => {
		const moveUp = () => {
			const newPosition = this.coords.top > 0 ? (this.coords.top -= 2) : (this.coords.top -= 0);
			return newPosition;
		};
		const moveLeft = () => {
			const newPosition = this.coords.left > 0 ? (this.coords.left -= 2) : (this.coords.left -= 0);
			return newPosition;
		};
		const moveRight = () => {
			const newPosition =
				this.coords.left < 98 - this.dimensions.width ? (this.coords.left += 2) : (this.coords.left += 0);
			return newPosition;
		};
		const moveDown = () => {
			const newPosition =
				this.coords.top < 95 - this.dimensions.height ? (this.coords.top += 2) : (this.coords.top += 0);
			return newPosition;
		};
		if (e) {
			switch (e.which) {
				case 87:
					this.setState({ startingPositionY: moveUp() });
					break;
				case 65:
					this.setState({ startingPositionX: moveLeft() });
					break;
				case 68:
					this.setState({ startingPositionX: moveRight() });
					break;
				case 83:
					this.setState({ startingPositionY: moveDown() });
					break;
				default:
					break;
			}
		}
	};
	componentDidMount() {
		document.addEventListener('keydown', this.movePlayer.bind(this));
		this.setState({ startingPositionY: this.coords.top, startingPositionX: this.coords.left });
	}

	render() {
		return (
			<div
				style={{
					top: `${this.state.startingPositionY}vh`,
					left: `${this.state.startingPositionX}vw`,
					height: `${this.dimensions.height}rem`,
					width: `${this.dimensions.width}rem`,
				}}
				className={playerStyles.player__one}
				onKeyDown={e => this.movePlayer(e)}
			></div>
		);
	}
}

PlayerOne.propTypes = {};
