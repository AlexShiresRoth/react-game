import React from 'react';
import PlayerOne from './players/PlayerOne';
import layoutStyles from './gamestyles/GameEnvironment.module.scss';
import Enemy from './players/Enemy';
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

	setEnemyAmt = () => {
		return this.setState({
			enemies: [
				...this.state.enemies,
				{ enemy: 'enemyOne', ref: this.enemyRef1, coords: {} },
				{ enemy: 'enemyTwo', ref: this.enemyRef2, coords: {} },
				{ enemy: 'enemyThree', ref: this.enemyRef3, coords: {} },
			],
		});
	};

	//set enemy amount in redux
	getDimensions = dimensions => {
		this.state.enemies.map(enemy => {
			return this.setState({ enemyDimensions: dimensions });
		});
	};
	componentDidMount() {
		this.setEnemyAmt();
		console.log(this.state.enemyDimensions);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.enemyDimensions !== prevState.enemyDimensions) {
			this.state.enemies.map(enemy => {
				this.props.getEnemyCoordinates(this.state.enemyDimensions);
			});
			console.log(this.state.enemies);
		}
	}

	render() {
		const enemies = [...this.state.enemies];

		return (
			<div className={layoutStyles.game__area}>
				<PlayerOne enemyDimensions={this.state.enemyDimensions} />
				{enemies.map((enemy, i) => {
					return (
						<Enemy
							enemyRef={enemy.ref}
							enemyDimensions={this.state.enemyDimensions}
							getDimensions={this.getDimensions}
							enemyHit={this.props.enemyHit}
							key={i}
							title={enemy.enemy}
						/>
					);
				})}
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
