import React from 'react';
import PropTypes from 'prop-types';
import Lazer from './Lazer';
const Canon = ({ playerStyles, shootLazer, lazers, lazerPosition, lazerStyles, lazerRef, enemyDimensions }) => {
	return (
		<div className={playerStyles} onKeyDown={shootLazer}>
			{lazers.map((lazer, i) => {
				return (
					<Lazer
						lazerRef={lazerRef}
						lazer={lazer}
						lazerStyles={lazerStyles}
						lazerPosition={lazerPosition}
						key={i}
						enemyDimensions={enemyDimensions}
					/>
				);
			})}
		</div>
	);
};

Canon.propTypes = {};

export default Canon;
