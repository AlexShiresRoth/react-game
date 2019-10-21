import React from 'react';
import PropTypes from 'prop-types';
import Lazer from './Lazer';
const Canon = ({ playerStyles, shootLazer, lazers, lazerPosition, lazerStyles }) => {
	return (
		<div className={playerStyles} onKeyDown={shootLazer}>
			{lazers.map((lazer, i) => {
				return <Lazer lazer={lazer} lazerStyles={lazerStyles} lazerPosition={lazerPosition} key={i} />;
			})}
		</div>
	);
};

Canon.propTypes = {};

export default Canon;
