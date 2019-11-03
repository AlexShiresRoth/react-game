import React from 'react';
import PropTypes from 'prop-types';
import Canon from './Canon';
import playerStyles from './playerstyles/PlayerOne.module.scss';
import { getEnemyHit } from '../../../actions/enemyHit';
import { getPlayerHeight } from '../../../actions/player';
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
			lazerPosition: 0,
			enemyHit: false,
			lazers: this.lazers,
			hits: this.hits,
			character: null,
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
		height: 8,
		width: 4,
	};

	lazers = [];
	hits = [];

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

	shootLazer = time => {
		const max = 100;
		this.lazers.push('lazer');
		if (this.state.lazerCount <= max) {
			this.setState(prevState => {
				return { lazerCount: prevState.lazerCount + 5, lazerPosition: this.state.lazerCount };
			});
		}

		if (this.state.lazerCount >= max) {
			this.setState({ lazerCount: 0, lazerPosition: this.state.lazerCount });
			return () => cancelAnimationFrame(this.animationRef.current);
		}
		this.animationRef.current = requestAnimationFrame(this.shootLazer);
	};

	jumpPlayer = time => {
		const playerHeight = this.props.playerHeight;
		const max = 17;

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
	};

	rotatePlayer = e => {
		if (e.keyCode === 39) {
			this.setState({ rotation: this.state.rotation + 10 });
		}
		if (e.keyCode === 37) {
			this.setState({ rotation: this.state.rotation - 10 });
		}
	};

	playerController = e => {
		e.preventDefault();

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
			enemyHit: false,
			character:
				'https://res.cloudinary.com/snackmanproductions/image/upload/v1572316148/react-game/shot1_003_bjloun.png',
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
				onKeyDown={e => this.playerController(e)}
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
		playerHeight: state.player.playerHeight,
	};
};

export default connect(
	mapStateToProps,
	{ getEnemyHit, getPlayerHeight }
)(PlayerOne);
