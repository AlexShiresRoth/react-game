import React from 'react';
import PlayerOneController from './players/PlayerOneController';
import Canvas from './canvas/Canvas';
import LevelOne from './levels/LevelOne';
import layoutStyles from './gamestyles/GameEnvironment.module.scss';
import { connect } from 'react-redux';
import { getWindowSize } from '../../actions/gameArea';
import { getEnemyCoordinates, setEnemyAmount } from '../../actions/enemy';

class GameEnvironment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			enemyDimensions: [],
			enemies: [],
			levelOneEnemies: [],
		};
		this.canvasRef = React.createRef();
		this.enemyRef1 = React.createRef();
		this.enemyRef2 = React.createRef();
		this.enemyRef3 = React.createRef();
		this.groundRef = React.createRef();
		this.getDimensions = this.getDimensions.bind(this);
	}
	coordinates = [];

	setEnemyAmt = enemies => {
		return this.setState({ enemies: enemies });
	};

	//set enemy amount in redux
	getDimensions = dimensions => {
		this.coordinates.push(dimensions);

		return this.setState({ enemyDimensions: [...this.coordinates] });
	};

	handleResize = () => {
		this.props.getWindowSize(window.innerWidth);
	};

	componentDidMount() {
		//restart camera position
		setTimeout(() => {
			window.scroll(0, 0);
		}, 1000);

		this.handleResize();
		window.addEventListener('resize', this.handleResize);
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.enemyDimensions !== prevState.enemyDimensions) {
			this.props.getEnemyCoordinates(this.state.enemyDimensions);
		}
		if (this.state.enemies !== prevState.enemies) {
			this.props.setEnemyAmount(this.state.enemies);
		}
	}

	render() {
		return (
			<Canvas layoutStyles={layoutStyles} canvasRef={this.canvasRef}>
				<PlayerOneController enemyDimensions={this.state.enemyDimensions} canvasRef={this.canvasRef} />
				<LevelOne
					enemies={this.state.enemies}
					getDimensions={this.getDimensions}
					enemyDimensions={this.state.enemyDimensions}
					setEnemyAmt={this.setEnemyAmt}
					groundRef={this.groundRef}
					enemyRef1={this.enemyRef1}
					enemyRef2={this.enemyRef2}
				/>
			</Canvas>
		);
	}
}
const mapStateToProps = state => {
	return {
		enemyCoords: state.enemy.enemyCoords,
		enemyHit: state.enemy.enemyHit,
		enemyAmount: state.enemy.enemyAmount,
		gameArea: state.gameArea,
		windowDimensions: state.windowDimensions,
	};
};
export default connect(mapStateToProps, { getEnemyCoordinates, setEnemyAmount, getWindowSize })(GameEnvironment);
