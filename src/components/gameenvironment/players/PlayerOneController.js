import React from 'react';
import PropTypes from 'prop-types';
import Canon from './Canon';
import Player from './playercontroller/Player';
import playerStyles from './playerstyles/PlayerOne.module.scss';
import { getEnemyHit } from '../../../actions/enemy';
import { getLazerCoordinates, getPlayerDimensions } from '../../../actions/player';
import { connect } from 'react-redux';

class PlayerOneController extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startingPositionX: 0,
			startingPositionY: 0,
			rotation: 0,
			jumpInterval: 0,
			delay: 0,
			lazerCount: 0,
			playerCoords: null,
			lazerPosition: {},
			lazerCoords: {},
			enemyHit: {},
			lazers: this.lazers,
			hits: this.hits,
			character: { width: null, height: null, coords: {}, canon: {} },
			windowScroll: 0,
			characterPositionX: 0,
			characterPositionY: 0,
		};
		this.playerController = this.playerController.bind(this);
		this.setIdleState = this.setIdleState.bind(this);
		this.shootLazer = this.shootLazer.bind(this);
		this.playerOneRef = React.createRef();
		this.animationRef = React.createRef();
		this.timeRef = React.createRef();
		this.lazerRef = React.createRef();
	}

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
				this.hits.push('hit');
				return this.setState({
					enemyHit: newEnemyState,
				});
			} else {
				return this.hits;
			}
		});
	};

	shootLazer = e => {
		const spriteSheet = 720;
		const spriteColumns = 15;
		const max = 100;
		if (!e.repeat) {
			this.lazers.push('lazer');
			if (this.lazers.length >= 10) {
				this.lazers.splice(0, this.lazers.length);
			}
			if (this.state.lazerCount <= max) {
				this.setState(prevState => ({
					lazerCount: prevState.lazerCount + 10,
					lazerPosition: {
						left: prevState.lazerCount,
						top: this.props.lazerCoords.top,
					},
					character: {
						...prevState.character,
						img:
							prevState.rotation > 0
								? 'https://res.cloudinary.com/snackmanproductions/image/upload/a_vflip/v1573414999/react-game/Shot1_dcbxaq.png'
								: 'https://res.cloudinary.com/snackmanproductions/image/upload/v1573414999/react-game/Shot1_dcbxaq.png',
						width: spriteSheet / spriteColumns,
					},
					characterPositionX: prevState.characterPositionX + spriteSheet / spriteColumns,
				}));
			}

			if (this.state.lazerCount >= max) {
				this.setState({
					lazerCount: 0,
					lazerPosition: { left: 0, top: 0 },
					characterPositionX: 0,
				});
				return () => cancelAnimationFrame(this.animationRef.current);
			}

			this.animationRef.current = requestAnimationFrame(this.shootLazer);
		}
	};

	jumpPlayer = e => {
		const playerHeight = this.props.player.playerDimensions.height;
		const max = 35;
		const spriteSheet = 1538;
		const spriteColumns = 15;
		if (!e.repeat) {
			if (this.state.jumpInterval <= max / 2) {
				this.setState(prevState => {
					return {
						startingPositionY: prevState.startingPositionY - playerHeight / 10,
						jumpInterval: prevState.jumpInterval + 1,
						character: {
							...prevState.character,
							img:
								prevState.rotation === 180
									? 'https://res.cloudinary.com/snackmanproductions/image/upload/a_vflip/v1573348753/react-game/Jump_1_n7zwrr.png'
									: 'https://res.cloudinary.com/snackmanproductions/image/upload/v1573348753/react-game/Jump_1_n7zwrr.png',
							width: 60,
						},
						characterPositionX: 1,
						characterPositionY: prevState.characterPositionY + spriteSheet / spriteColumns,
					};
				});
			}
			if (this.state.jumpInterval >= max / 2) {
				this.setState(prevState => {
					return {
						startingPositionY: prevState.startingPositionY + playerHeight / 10,
						jumpInterval: prevState.jumpInterval + 1,
						character: {
							...prevState.character,
							img:
								prevState.rotation === 180
									? 'https://res.cloudinary.com/snackmanproductions/image/upload/a_vflip/v1573348753/react-game/Jump_1_n7zwrr.png'
									: 'https://res.cloudinary.com/snackmanproductions/image/upload/v1573348753/react-game/Jump_1_n7zwrr.png',
							width: 60,
						},
						characterPositionX: 1,
						characterPositionY: prevState.characterPositionY - spriteSheet / spriteColumns,
					};
				});
			}

			if (this.state.jumpInterval >= max) {
				this.setState({
					jumpInterval: 0,
					startingPositionY: this.props.groundDimensions.top - playerHeight,
					characterPositionY: 0,
					characterPositionX: 0,
					character: {
						...this.state.character,
						img:
							this.state.rotation === 180
								? 'https://res.cloudinary.com/snackmanproductions/image/upload/a_vflip/v1573334626/react-game/Idle_4_sankp5.png'
								: 'https://res.cloudinary.com/snackmanproductions/image/upload/v1573334626/react-game/Idle_4_sankp5.png',
						width: 47,
					},
				});
				return () => cancelAnimationFrame(this.animationRef.current);
			}
			this.animationRef.current = requestAnimationFrame(this.jumpPlayer);
		}
	};

	movePlayer = (e, player, canvas) => {
		//Spritesheet of player 1125 x 15
		const spriteSheet = 1125;
		const spriteColumns = 15;
		if (e.repeat) {
			this.setState({
				delay: 1000,
			});
		}
		if (typeof e === 'object' && e.keyCode === 65) {
			//go left
			this.setState(prevState => ({
				startingPositionX:
					prevState.character.coords.left > 0 + player.width
						? (prevState.character.coords.left -= player.width / 3)
						: (prevState.character.coords.left -= 0),
				rotation: 180,
				character: {
					...prevState.character,
					img:
						'https://res.cloudinary.com/snackmanproductions/image/upload/a_vflip/v1573334781/react-game/run_2_qyupdn.png',
					width: spriteSheet / spriteColumns,
					canon: {
						...this.state.character.canon,
						top: '40%',
					},
				},
				characterPositionX: prevState.characterPositionX - spriteSheet / spriteColumns,
			}));
			//Follow player
			window.scroll(this.state.startingPositionX - player.width * 2, 0);
		}
		if (typeof e === 'object' && e.keyCode === 68) {
			//go right
			this.props.getPlayerDimensions(this.playerOneRef.current.getBoundingClientRect());

			this.setState(prevState => ({
				startingPositionX:
					prevState.character.coords.left < canvas.width - player.width
						? (prevState.character.coords.left += player.width / 3)
						: (prevState.character.coords.left += 0),
				rotation: 0,
				character: {
					...prevState.character,
					img:
						'https://res.cloudinary.com/snackmanproductions/image/upload/v1573334781/react-game/run_2_qyupdn.png',
					width: spriteSheet / spriteColumns,
					canon: {
						...this.state.character.canon,
						top: '60%',
					},
				},
				characterPositionX: (prevState.characterPositionX += spriteSheet / spriteColumns),
				windowPosX: this.props.player.playerDimensions.x,
			}));
			//Follow player
			window.scroll(this.state.startingPositionX - player.width * 2, 0);
		}
	};

	playerController = e => {
		//when player and canvas have been rendered, allow player movement
		if (this.props.canvasRef.current && this.playerOneRef.current) {
			const canvas = this.props.canvasRef.current.getBoundingClientRect();
			const player = this.playerOneRef.current.getBoundingClientRect();

			switch (e.keyCode) {
				case 65:
				case 68:
					e.preventDefault();
					this.movePlayer(e, player, canvas);
					break;
				case 87:
				case 38:
					e.preventDefault();
					this.jumpPlayer(e, player);
					break;
				case 32:
					e.preventDefault();
					this.setState({
						characterPositionX: 0,
						characterPositionY: 0,
					});
					this.shootLazer(e);
					break;
				default:
					break;
			}
		}
		return () => cancelAnimationFrame(this.animationRef.current);
	};

	//Revert to idle position upon key events finishing
	setIdleState = e => {
		if (e.keyCode) {
			if (!e.repeat) {
				this.setState(prevState => ({
					delay: prevState.delay + 1000,
				}));
			}
			setTimeout(() => {
				this.setState(prevState => ({
					character: {
						...prevState.character,
						img:
							prevState.rotation > 0
								? 'https://res.cloudinary.com/snackmanproductions/image/upload/a_vflip/v1573410975/react-game/Idle_1_lbfkht.gif'
								: 'https://res.cloudinary.com/snackmanproductions/image/upload/v1573410975/react-game/Idle_1_lbfkht.gif',
						width: 47,
						height: 101,
					},
					characterPositionX: 0,
				}));
			}, this.state.delay);
		}
	};

	componentDidMount() {
		document.addEventListener('keydown', this.playerController.bind(this));
		document.addEventListener('keyup', this.setIdleState.bind(this));

		//reset
		this.hits.splice(0, this.hits.length);

		this.setState({
			enemyHit: this.props.enemyAmount,
			character: {
				img:
					'https://res.cloudinary.com/snackmanproductions/image/upload/v1573410975/react-game/Idle_1_lbfkht.gif',
				width: 47,
				height: 101,
				coords: {
					top: 500,
					left: 100,
				},
				canon: {
					top: '60%',
					left: '100%',
					position: 'absolute',
					background: 'transparent',
					height: '1rem',
					width: '2rem',
				},
			},
		});
		if (this.playerOneRef.current) {
			const playerDimensions = this.playerOneRef.current.getBoundingClientRect();
			this.props.getPlayerDimensions(playerDimensions);
		}
	}

	locateGroundTop = () => {
		if (this.playerOneRef.current) {
			const player = this.playerOneRef.current.getBoundingClientRect();

			const difference = this.props.groundDimensions.top - player.height;

			this.setState({ startingPositionY: difference });
		}
	};

	componentWillUnmount() {
		document.removeEventListener('keydown', this.playerController.bind(this));
		document.removeEventListener('keyup', this.setIdleState.bind(this));
		cancelAnimationFrame(this.animationRef.current);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.enemyHit !== prevState.enemyHit) {
			this.props.getEnemyHit(this.state.enemyHit);
		}
		if (this.props.enemyAmount !== prevProps.enemyAmount) {
			this.setState({ enemyHit: this.props.enemyAmount });
		}
		if (this.props.groundDimensions !== prevProps.groundDimensions) {
			this.locateGroundTop();
		}
		if (this.state.startingPositionY !== prevState.startingPositionY) {
			this.setState(prevState => ({
				character: {
					...prevState.character,
					coords: {
						top: prevState.startingPositionY,
						left: prevState.character.coords.left,
					},
				},
			}));
		}
		if (this.state.lazerCoords !== prevState.lazerCoords) {
			this.props.getLazerCoordinates(this.state.lazerCoords);
		}
	}

	render() {
		return (
			<Player
				playerRef={this.playerOneRef}
				character={this.state.character}
				rotation={this.state.rotation}
				charPosX={this.state.characterPositionX}
				charPosY={this.state.characterPositionY}
				playerClassName={playerStyles.player__one}
				onKeyDown={this.playerController}
				onKeyUp={this.setIdleState}
			>
				<Canon
					canonClass={playerStyles}
					canonStyles={this.state.character.canon}
					shootLazer={this.shootLazer}
					lazers={this.state.lazers}
					lazerPosition={this.state.lazerPosition}
					getLazerCoords={this.getLazerCoords}
					lazerRef={this.lazerRef}
				></Canon>
			</Player>
		);
	}
}

PlayerOneController.propTypes = {
	enemyDimensions: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
	return {
		enemyCoords: state.enemy.enemyCoords,
		enemyAmount: state.enemy.enemyAmount,
		enemyHit: state.enemy.enemyHit,
		groundDimensions: state.gameArea.groundDimensions,
		gameArea: state.gameArea,
		playerHeight: state.player.playerHeight,
		player: state.player,
		lazerCoords: state.player.lazerCoords,
	};
};

export default connect(mapStateToProps, {
	getEnemyHit,
	getPlayerDimensions,
	getLazerCoordinates,
})(PlayerOneController);
