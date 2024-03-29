import React from 'react';
import PropTypes from 'prop-types';
import Lazer from './Lazer';
const Canon = ({
	canonClass,
	shootLazer,
	lazers,
	lazerPosition,
	lazerStyles,
	lazerRef,
	getLazerCoords,
	lazerCount,
	canonStyles,
}) => {
	return (
		<div className={canonClass.canon} style={{ ...canonStyles }} onKeyDown={e => shootLazer(e)}>
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
	lazerPosition: PropTypes.object.isRequired,
};

export default Canon;
