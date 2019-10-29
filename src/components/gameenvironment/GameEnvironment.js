import React from 'react';
import PlayerOne from './players/PlayerOne';
import Canvas from './canvas/Canvas';
import LevelOne from './levels/LevelOne';
import layoutStyles from './gamestyles/GameEnvironment.module.scss';
import { connect } from 'react-redux';
import { getEnemyCoordinates } from '../../actions/enemy';

class GameEnvironment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			enemyDimensions: [],
			enemies: [],
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

	componentDidUpdate(prevProps, prevState) {
		if (this.state.enemyDimensions !== prevState.enemyDimensions) {
			this.props.getEnemyCoordinates(this.state.enemyDimensions);
		}
	}

	render() {
		const levelOneEnemies = [
			{
				enemy: 'enemyOne',
				ref: this.enemyRef1,
				coords: this.props.enemyCoords.enemyCoords[0],
				spawnX: '40vw',
				spawnY: '50vh',
			},
			{
				enemy: 'enemyTwo',
				ref: this.enemyRef2,
				coords: this.props.enemyCoords.enemyCoords[1],
				spawnX: '50vw',
				spawnY: '20vh',
			},
			{
				enemy: 'enemyThree',
				ref: this.enemyRef3,
				coords: this.props.enemyCoords.enemyCoords[2],
				spawnX: '70vw',
				spawnY: '45vw',
			},
		];

		return (
			<Canvas layoutStyles={layoutStyles} canvasRef={this.canvasRef}>
				<PlayerOne enemyDimensions={this.state.enemyDimensions} canvasRef={this.canvasRef} />
				<LevelOne
					enemies={this.state.enemies}
					levelOneEnemies={levelOneEnemies}
					enemyHit={this.props.enemyHit}
					getDimensions={this.getDimensions}
					enemyDimensions={this.state.enemyDimensions}
					setEnemyAmt={this.setEnemyAmt}
					groundRef={this.groundRef}
				/>
			</Canvas>
		);
	}
}
const mapStateToProps = state => {
	return { enemyCoords: state.enemy, enemyHit: state.enemyHit };
};
export default connect(
	mapStateToProps,
	{ getEnemyCoordinates }
)(GameEnvironment);
