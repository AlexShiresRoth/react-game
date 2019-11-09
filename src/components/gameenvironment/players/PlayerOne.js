import React from 'react';
import PropTypes from 'prop-types';
import Canon from './Canon';
import playerStyles from './playerstyles/PlayerOne.module.scss';
import { getEnemyHit } from '../../../actions/enemy';
import { getLazerCoordinates, getPlayerHeight } from '../../../actions/player';
import { connect } from 'react-redux';

class PlayerOne extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startingPositionX: null,
			startingPositionY: this.props.groundHeight,
			rotation: 0,
			jumpInterval: 0,
			lazerCount: 0,
			playerCoords: this.coords,
			lazerPosition: {},
			lazerCoords: {},
			enemyHit: {},
			lazers: this.lazers,
			hits: this.hits,
			character: null,
			characterPositionX: 1,
			characterPositionY: 0,
		};
		this.playerController = this.playerController.bind(this);
		this.shootLazer = this.shootLazer.bind(this);
		this.playerOneRef = React.createRef();
		this.animationRef = React.createRef();
		this.lazerRef = React.createRef();
	}
	coords = {
		top: 400,
		left: 100,
	};
	dimensions = {
		height: 162,
		width: 77,
	};

	lazers = [];
	hits = [];

	getLazerCoords = lazerCoords => {
		const enemyLocations = this.props.enemyCoords;
		const lazer = lazerCoords;

		if (this.state.lazerCount <= 15) this.setState({ lazerCoords: lazer });

		enemyLocations.map((enemy, i) => {
			if (
				lazer.x < enemy.x + enemy.width &&
				lazer.x + lazer.width > enemy.x &&
				lazer.y < enemy.y + enemy.height &&
				lazer.y + lazer.height > enemy.y
			) {
				let newEnemyState = { ...this.state.enemyHit };
				newEnemyState[i].hit = true;

				return this.setState({
					enemyHit: newEnemyState,
				});
			} else {
				return this.hits;
			}
		});
	};

	shootLazer = e => {
		const max = 100;
		if (!e.repeat) {
			this.lazers.push('lazer');
			if (this.lazers.length >= 10) {
				this.lazers.splice(0, this.lazers.length);
			}
			if (this.state.lazerCount <= max) {
				this.setState(prevState => {
					return {
						lazerCount: prevState.lazerCount + 10,
						lazerPosition: {
							left: this.state.lazerCount,
							top: this.props.lazerCoords.top,
						},
					};
				});
			}

			if (this.state.lazerCount >= max) {
				this.setState({
					lazerCount: 0,
					lazerPosition: { left: this.state.lazerCount, top: 0 },
				});
				return () => cancelAnimationFrame(this.animationRef.current);
			}

			this.animationRef.current = requestAnimationFrame(this.shootLazer);
		}
	};

	jumpPlayer = e => {
		const playerHeight = this.props.playerHeight;
		const max = 10;
		if (!e.repeat) {
			if (this.state.jumpInterval <= max / 2) {
				this.setState(prevState => {
					return {
						startingPositionY: prevState.startingPositionY - playerHeight / 2,
						jumpInterval: prevState.jumpInterval + 1,
					};
				});
			}
			if (this.state.jumpInterval >= max / 2) {
				this.setState(prevState => {
					return {
						startingPositionY: prevState.startingPositionY + playerHeight / 2,
						jumpInterval: prevState.jumpInterval + 1,
					};
				});
			}

			if (this.state.jumpInterval >= max) {
				this.setState({
					jumpInterval: 0,
					startingPositionY: this.props.groundHeight.groundHeight.top - playerHeight,
				});
				return () => cancelAnimationFrame(this.animationRef.current);
			}
			this.animationRef.current = requestAnimationFrame(this.jumpPlayer);
		}
	};

	rotatePlayer = e => {
		const playerHeight = this.props.playerHeight;
		if (e.keyCode === 39) {
			this.setState({ rotation: this.state.rotation + playerHeight / 2 });
		}
		if (e.keyCode === 37) {
			this.setState({ rotation: this.state.rotation - playerHeight / 2 });
		}
	};

	movePlayer = (e, player, canvas) => {
		if (e.keyCode === 65) {
			this.setState(prevState => ({
				startingPositionX:
					this.coords.left > 0 + player.width ? (this.coords.left -= player.width) : (this.coords.left -= 0),
				rotation: 180,
				characterPositionX: (prevState.characterPositionX -= 77),
			}));
		}
		if (e.keyCode === 68) {
			this.setState(prevState => ({
				startingPositionX:
					this.coords.left < canvas.width - player.width
						? (this.coords.left += player.width)
						: (this.coords.left += 0),
				rotation: 0,
				characterPositionX: (prevState.characterPositionX += 77),
			}));
		}
	};

	playerController = e => {
		e.preventDefault();
		if (this.props.canvasRef.current && this.playerOneRef.current) {
			const canvas = this.props.canvasRef.current.getBoundingClientRect();
			const player = this.playerOneRef.current.getBoundingClientRect();

			switch (e.keyCode) {
				case 65:
				case 68:
					this.movePlayer(e, player, canvas);
					break;
				case 87:
				case 38:
					this.jumpPlayer(e, player);
					break;
				case 37:
				case 39:
					this.rotatePlayer(e);
					break;
				case 32:
					this.shootLazer(e);
					break;
				default:
					break;
			}
		}
	};

	componentDidMount() {
		document.addEventListener('keydown', this.playerController.bind(this));
		this.setState({
			startingPositionX: this.coords.left,
			startingPositionY: this.props.groundHeight,
			enemyHit: this.props.enemyAmount,
			character:
				'https://res.cloudinary.com/snackmanproductions/image/upload/v1573262579/react-game/spritesheet_2_chzdn0.png',
		});
		if (this.playerOneRef.current) {
			const playerHeight = this.playerOneRef.current.getBoundingClientRect().height;
			this.props.getPlayerHeight(playerHeight);
		}
		this.hits.splice(0, this.hits.length);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.playerController.bind(this));
		cancelAnimationFrame(this.animationRef.current);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.enemyHit !== prevState.enemyHit) {
			this.props.getEnemyHit(this.state.enemyHit);
		}
		if (this.props.enemyAmount !== prevProps.enemyAmount) {
			this.setState({ enemyHit: this.props.enemyAmount });
		}
		if (this.props.groundHeight !== prevProps.groundHeight) {
			if (this.playerOneRef.current) {
				const player = this.playerOneRef.current.getBoundingClientRect();

				const difference = this.props.groundHeight.groundHeight.top - player.height;

				this.setState({ startingPositionY: difference });
			}
		}
		if (this.state.lazerCoords !== prevState.lazerCoords) {
			this.props.getLazerCoordinates(this.state.lazerCoords);
		}
	}

	render() {
		const playerStyle = {
			display: 'block',
			position: 'absolute',
			background: `url(${this.state.character}) ${this.state.characterPositionX}px ${this.state.characterPositionY}px`,
			height: `${this.dimensions.height}px`,
			width: `${this.dimensions.width}px`,
			transformOrigin: 'center',
			transform: `translate(${this.state.startingPositionX}px, ${this.state.startingPositionY}px) 
			rotate(${this.state.rotation}deg) `,
		};

		return (
			<div
				style={{ ...playerStyle }}
				ref={this.playerOneRef}
				className={playerStyles.player__one}
				onKeyDown={e => this.playerController(e)}
			>
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
		enemyCoords: state.enemy.enemyCoords,
		enemyAmount: state.enemy.enemyAmount,
		enemyHit: state.enemy.enemyHit,
		groundHeight: state.groundHeight,
		playerHeight: state.player.playerHeight,
		lazerCoords: state.player.lazerCoords,
	};
};

export default connect(
	mapStateToProps,
	{ getEnemyHit, getPlayerHeight, getLazerCoordinates }
)(PlayerOne);
