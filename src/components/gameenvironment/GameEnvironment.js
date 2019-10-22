import React from 'react';
import PlayerOne from './players/PlayerOne';
import layoutStyles from './gamestyles/GameEnvironment.module.scss';
import Enemy from './players/Enemy';
class GameEnvironment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			enemyDimensions: null,
		};
		this.enemyRef = React.createRef();
		this.getDimensions = this.getDimensions.bind(this);
	}

	getDimensions = dimensions => {
		this.setState({ enemyDimensions: dimensions });
	};
	componentDidMount() {}
	render() {
		const style = {
			height: '10rem',
			width: '10rem',
			position: 'absolute',
			background: 'red',
			display: 'block',
			top: '40vh',
			left: '50vw',
		};
		return (
			<div className={layoutStyles.game__area}>
				<PlayerOne enemyDimensions={this.state.enemyDimensions} />
				<Enemy
					enemyRef={this.enemyRef}
					enemyStyle={style}
					enemyDimensions={this.state.enemyDimensions}
					getDimensions={this.getDimensions}
				/>
			</div>
		);
	}
}

export default GameEnvironment;
