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
			startingPositionY: null,
			playerCoords: this.coords,
			lazerPosition: {},
			enemyHit: false,
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
	hits = [];
	getLazerCoords = lazerCoords => {
		const enemy = this.props.enemyCoords.enemyCoords;
		const lazer = lazerCoords;

		if (
			lazer.x < enemy.x + lazer.width &&
			lazer.x + lazer.width > enemy.x &&
			lazer.y < enemy.y + enemy.height &&
			lazer.y + lazer.height > enemy.y
		) {
			this.hits.unshift('hit');
		} else {
			this.hits.splice(0, this.hits.length);
		}
	};
	registerHit = () => {
		return this.hits.length > 1 ? this.setState({ enemyHit: true }) : this.setState({ enemyHit: false });
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
		this.setState({ startingPositionX: this.coords.left, startingPositionY: this.coords.top });
	}
	componentWillUnmount() {
		document.removeEventListener('keydown', this.movePlayer.bind(this));
		document.removeEventListener('keydown', this.shootLazer.bind(this));
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.state.lazerPosition !== prevState.lazerPosition) {
			this.registerHit();
		}
		if (this.state.enemyHit !== prevState.enemyHit) {
			this.props.getEnemyHit(this.state.enemyHit);
		}
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
	enemyDimensions: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
	return {
		enemyCoords: state.enemy,
		enemyHit: state.enemyHit,
	};
};

export default connect(
	mapStateToProps,
	{ getEnemyHit }
)(PlayerOne);
