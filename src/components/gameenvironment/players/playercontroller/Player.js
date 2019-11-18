import React from 'react';
import PropTypes from 'prop-types';

const Player = ({
	character,
	playerRef,
	playerClassName,
	children,
	rotation,
	charPosX,
	charPosy,
	onKeyDown,
	onKeyUp,
}) => {
	const playerStyle = {
		display: 'block',
		position: 'absolute',
		backgroundImage: `url(${character.img}) `,
		backgroundPositionX: `${charPosX}px `,
		backgroundPositionY: `${charPosy}px`,
		height: `${character.height}px`,
		width: `${character.width}px`,
		transformOrigin: 'center',
		transform: `translate(${character.coords.left}px, ${character.coords.top}px) 
			rotate(${rotation}deg) `,
	};
	if (playerRef.current) {
		return (
			<div
				style={{ ...playerStyle }}
				ref={playerRef}
				className={playerClassName}
				onKeyDown={e => onKeyDown(e)}
				onKeyUp={e => onKeyUp(e)}
			>
				{children}
			</div>
		);
	}
	return <div ref={playerRef}>{children}</div>;
};

Player.propTypes = {
	character: PropTypes.object.isRequired,
	playerClassName: PropTypes.string.isRequired,
};

export default Player;
