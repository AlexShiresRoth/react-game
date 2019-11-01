import React from 'react';
import PropTypes from 'prop-types';
import Canon from './Canon';
import playerStyles from './playerstyles/PlayerOne.module.scss';
import { getEnemyHit } from '../../../actions/enemyHit';
import { connect } from 'react-redux';

class PlayerOne extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startingPositionX: null,
			startingPositionY: this.props.groundHeight,
			rotation: 0,
			interval: 0,
			playerCoords: this.coords,
			lazerPosition: {},
			enemyHit: false,
			lazers: this.lazers,
			hits: this.hits,
			character: null,
		};
		this.movePlayer = this.movePlayer.bind(this);
		this.shootLazer = this.shootLazer.bind(this);
		this.playerOneRef = React.createRef();
		this.lazerRef = React.createRef();
	}
	coords = {
		top: 400,
		left: 100,
	};
	dimensions = {
		height: 8,
		width: 4,
	};

	lazers = [];
	hits = [];

	//fix -- enemyCoords seem to be where the last render occurred
	getLazerCoords = lazerCoords => {
		const enemies = this.props.enemyCoords.enemyCoords;
		const lazer = lazerCoords;

		enemies.map((enemy, i) => {
			if (
				lazer.x < enemy.x + enemy.width &&
				lazer.x + lazer.width > enemy.x &&
				lazer.y < enemy.y + enemy.height &&
				lazer.y + lazer.height > enemy.y
			) {
				return this.hits.unshift('hit');
			} else {
				return this.hits;
			}
		});
	};

	registerHit = () => {
		return this.state.hits.length > 0 ? this.setState({ enemyHit: true }) : this.setState({ enemyHit: false });
	};

	shootLazer = e => {
		if (e) {
			if (e.keyCode === 32) {
				this.lazers.push('lazer');
				let count = 0;
				if (this.lazers.length > 4) {
					this.lazers.pop();
				}
				setInterval(() => {
					if (count <= 100) {
						count += 2;
						this.setState({ lazerPosition: { left: count } });
					}
					return () => clearInterval();
				}, 10);
			}
		}
	};

	jumpPlayer = e => {
		const playerHeight = Math.floor(this.playerOneRef.current.getBoundingClientRect().height);
		if (e.keyCode === 87 || 38) {
			const max = 50;
			if (this.state.interval <= max / 2) {
				this.setState({
					startingPositionY: this.state.startingPositionY - 8,
					interval: this.state.interval + 1,
				});
			} else if (this.state.interval >= max / 2) {
				this.setState({
					startingPositionY: this.state.startingPositionY + 8,
					interval: this.state.interval + 1,
				});
			}
			this.handleAnimation(this.jumpPlayer, this.state.interval, max, playerHeight);
		}
		console.log(playerHeight);
	};

	handleAnimation = (animation, interval, max, playerHeight) => {
		if (interval <= max) {
			requestAnimationFrame(animation);
		} else if (interval >= max) {
			this.setState({ interval: 0, startingPositionY: this.props.groundHeight.groundHeight.top - playerHeight });
		}
		return cancelAnimationFrame(animation);
	};

	rotatePlayer = e => {
		if (e.keyCode === 39) {
			this.setState({ rotation: this.state.rotation + 10 });
		}
		if (e.keyCode === 37) {
			this.setState({ rotation: this.state.rotation - 10 });
		}
	};

	//break the rotation to separate function with mouse move
	movePlayer = e => {
		e.preventDefault();
		if (e) {
			if (this.props.canvasRef.current && this.playerOneRef.current) {
				const canvas = this.props.canvasRef.current.getBoundingClientRect();
				const player = this.playerOneRef.current.getBoundingClientRect();

				switch (e.keyCode) {
					case 65:
						this.setState({
							startingPositionX:
								this.coords.left > 0 + player.width
									? (this.coords.left -= player.width)
									: (this.coords.left -= 0),
							rotation: 180,
						});
						break;
					case 68:
						this.setState({
							startingPositionX:
								this.coords.left < canvas.width - player.width
									? (this.coords.left += player.width)
									: (this.coords.left += 0),
							rotation: 0,
						});
						break;
					case 87:
					case 38:
						this.jumpPlayer(e, player);
						break;
					case 37:
						this.rotatePlayer(e);
						break;
					case 39:
						this.rotatePlayer(e);
						break;
					default:
						break;
				}
			}
		}
	};

	componentDidMount() {
		document.addEventListener('keydown', this.movePlayer.bind(this));
		document.addEventListener('keydown', this.shootLazer.bind(this));
		this.setState({
			startingPositionX: this.coords.left,
			startingPositionY: this.props.groundHeight,
			enemyHit: false,
			character:
				'https://res.cloudinary.com/snackmanproductions/image/upload/v1572316148/react-game/shot1_003_bjloun.png',
		});

		this.hits.splice(0, this.hits.length);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.movePlayer.bind(this));
		document.removeEventListener('keydown', this.shootLazer).bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.lazerPosition !== prevState.lazerPosition) {
			this.registerHit();
		}
		if (this.state.enemyHit !== prevState.enemyHit) {
			this.props.getEnemyHit(this.state.enemyHit);
		}
		if (this.props.groundHeight !== prevProps.groundHeight) {
			if (this.playerOneRef.current) {
				const player = this.playerOneRef.current.getBoundingClientRect();

				const difference = this.props.groundHeight.groundHeight.top - player.height;

				this.setState({ startingPositionY: difference });
			}
		}
	}

	render() {
		const playerStyle = {
			display: 'block',
			position: 'absolute',
			height: `${this.dimensions.height}rem`,
			width: `${this.dimensions.width}rem`,
			transformOrigin: 'center',
			transform: `translate(${this.state.startingPositionX}px, ${this.state.startingPositionY}px) 
			rotate(${this.state.rotation}deg) `,
		};

		return (
			<div
				style={{ ...playerStyle }}
				ref={this.playerOneRef}
				className={playerStyles.player__one}
				onKeyDown={e => this.movePlayer(e)}
			>
				<img src={this.state.character} alt="Main Player"></img>
				<Canon
					playerStyles={playerStyles.canon}
					shootLazer={this.shootLazer}
					lazers={this.state.lazers}
					lazerPosition={this.state.lazerPosition}
					getLazerCoords={this.getLazerCoords}
					lazerRef={this.lazerRef}
				></Canon>
			</div>
		);
	}
}

PlayerOne.propTypes = {
	enemyDimensions: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
	return {
		enemyCoords: state.enemy,
		enemyHit: state.enemyHit,
		groundHeight: state.groundHeight,
	};
};

export default connect(
	mapStateToProps,
	{ getEnemyHit }
)(PlayerOne);
