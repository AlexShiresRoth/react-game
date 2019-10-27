import React from 'react';
import PlayerOne from './players/PlayerOne';
import layoutStyles from './gamestyles/GameEnvironment.module.scss';
import LevelOne from './levels/LevelOne';
import { connect } from 'react-redux';
import { getEnemyCoordinates } from '../../actions/enemy';

class GameEnvironment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			enemyDimensions: [],
			enemies: [],
		};
		this.enemyRef1 = React.createRef();
		this.enemyRef2 = React.createRef();
		this.enemyRef3 = React.createRef();
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
			{ enemy: 'enemyOne', ref: this.enemyRef1, coords: this.props.enemyCoords.enemyCoords[0] },
			{ enemy: 'enemyTwo', ref: this.enemyRef2, coords: this.props.enemyCoords.enemyCoords[1] },
			{ enemy: 'enemyThree', ref: this.enemyRef3, coords: this.props.enemyCoords.enemyCoords[2] },
		];
		console.log(levelOneEnemies);
		return (
			<div className={layoutStyles.game__area}>
				<PlayerOne enemyDimensions={this.state.enemyDimensions} />
				<LevelOne
					enemies={this.state.enemies}
					levelOneEnemies={levelOneEnemies}
					enemyHit={this.props.enemyHit}
					getDimensions={this.getDimensions}
					enemyDimensions={this.state.enemyDimensions}
					setEnemyAmt={this.setEnemyAmt}
				/>
			</div>
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
