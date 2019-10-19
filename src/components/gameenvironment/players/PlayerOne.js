import React from 'react';
import PropTypes from 'prop-types';
import playerStyles from './playerstyles/PlayerOne.module.scss';
export default class PlayerOne extends React.Component {
	constructor(props) {
		super(props);

		this.movePlayer = this.movePlayer.bind(this);
	}
	movePlayer = e => {
		if (e) {
			console.log(e);
		}
	};
	componentDidMount() {
		document.addEventListener('keydown', this.movePlayer.bind(this));
	}
	render() {
		return <div className={playerStyles.player__one} onKeyDown={e => this.movePlayer(e)}></div>;
	}
}

PlayerOne.propTypes = {};
