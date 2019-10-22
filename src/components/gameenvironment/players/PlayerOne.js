import React from 'react';
import PropTypes from 'prop-types';
import Canon from './Canon';
import playerStyles from './playerstyles/PlayerOne.module.scss';

export default class PlayerOne extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startingPositionY: null,
			startingPositionX: null,
			lazerPosition: null,
			lazerStyles: {},
			lazers: this.lazers,
		};
		this.movePlayer = this.movePlayer.bind(this);
		this.shootLazer = this.shootLazer.bind(this);
		this.lazerRef = React.createRef();
	}
	coords = {
		top: 40,
		left: 10,
	};
	dimensions = {
		height: 5,
		width: 5,
	};

	lazers = [];

	shootLazer = e => {
		if (e) {
			if (e.keyCode === 32) {
				const lazerStyles = {
					position: 'absolute',
					height: '0.5rem',
					width: '2rem',
					top: '40%',
					left: '100%',
					background: 'orange',
					display: 'block',
				};
				this.lazers.push('lazer');
				this.setState({ lazerStyles });
				let count = 0;
				if (this.lazers.length > 4) {
					this.lazers.pop();
				}
				setInterval(() => {
					if (count <= 101) {
						count += 1;
						this.setState({ lazerPosition: count });
						if (count > 99) {
							lazerStyles.display = 'none';
						}
					}
					return clearInterval();
				}, 1);
			}
		}
	};

	movePlayer = e => {
		if (e) {
			switch (e.which) {
				case 87:
					this.setState({
						startingPositionY: this.coords.top > 0 ? (this.coords.top -= 2) : (this.coords.top -= 0),
					});
					break;
				case 65:
					this.setState({
						startingPositionX: this.coords.left > 0 ? (this.coords.left -= 2) : (this.coords.left -= 0),
					});
					break;
				case 68:
					this.setState({
						startingPositionX:
							this.coords.left < 98 - this.dimensions.width
								? (this.coords.left += 2)
								: (this.coords.left += 0),
					});
					break;
				case 83:
					this.setState({
						startingPositionY:
							this.coords.top < 95 - this.dimensions.height
								? (this.coords.top += 2)
								: (this.coords.top += 0),
					});
					break;
				default:
					break;
			}
		}
	};
	componentDidMount() {
		document.addEventListener('keydown', this.movePlayer.bind(this));
		document.addEventListener('keydown', this.shootLazer.bind(this));
		this.setState({
			startingPositionY: this.coords.top,
			startingPositionX: this.coords.left,
			lazerPosition: null,
		});
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
			>
				<Canon
					playerStyles={playerStyles.canon}
					shootLazer={e => this.shootLazer(e)}
					lazers={this.state.lazers}
					lazerStyles={this.state.lazerStyles}
					lazerPosition={this.state.lazerPosition}
					lazerRef={this.lazerRef}
					enemyDimensions={this.props.enemyDimensions}
				></Canon>
			</div>
		);
	}
}

PlayerOne.propTypes = {};
