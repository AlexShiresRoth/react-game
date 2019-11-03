import React from 'react';
import PropTypes from 'prop-types';
import Lazer from './Lazer';
const Canon = ({
	playerStyles,
	shootLazer,
	lazers,
	lazerPosition,
	lazerStyles,
	lazerRef,
	getLazerCoords,
	lazerCount,
}) => {
	return (
		<div className={playerStyles} onKeyDown={e => shootLazer(e)}>
			{lazers.map((lazer, i) => {
				return (
					<Lazer
						lazerRef={lazerRef}
						lazer={lazer}
						lazerStyles={lazerStyles}
						lazerPosition={lazerPosition}
						key={i}
						getLazerCoords={getLazerCoords}
						lazerCount={lazerCount}
						shootLazer={shootLazer}
					/>
				);
			})}
		</div>
	);
};

Canon.propTypes = {
	shootLazer: PropTypes.func.isRequired,
};

export default Canon;
