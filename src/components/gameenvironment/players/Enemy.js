import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getEnemyCoordinates } from "../../../actions/enemy";

const Enemy = ({
  enemyRef,
  getDimensions,
  enemyHit,
  title,
  index,
  enemyStyles
}) => {
  const [enemyImg, setEnemyImg] = useState("");
  const [imgPos, setImgPos] = useState(0);

  const animationRef = useRef();

  const movePosition = time => {
    const width = 1712 / 8;
    setImgPos(prevWidth => prevWidth + width);
    animationRef.current = requestAnimationFrame(movePosition);
  };

  useEffect(() => {
    if (enemyRef.current) {
      setEnemyImg(
        "https://res.cloudinary.com/snackmanproductions/image/upload/v1573431925/react-game/idle_stufr8.png"
      );
      getEnemyCoordinates(enemyRef.current.getBoundingClientRect());
      getDimensions(enemyRef.current.getBoundingClientRect());

      animationRef.current = requestAnimationFrame(movePosition);
      return () => cancelAnimationFrame(animationRef.current);
    }
  }, []);

  console.log(imgPos);
  if (!enemyHit[index]) {
    return (
      <div
        className={title}
        style={{
          ...enemyStyles,
          background: `url(${enemyImg}) ${imgPos}px 0px`
        }}
        ref={enemyRef}
      ></div>
    );
  }
  return (
    <div
      className={title}
      style={{
        ...enemyStyles,
        background: `url(${enemyImg}) ${imgPos}px 0px`,
        display: `${enemyHit[index].hit ? "none" : "block"}`
      }}
      ref={enemyRef}
    ></div>
  );
};

Enemy.propTypes = {
  enemyRef: PropTypes.object.isRequired,
  getDimensions: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return { enemyCoords: state.enemy.enemyCoords, enemy: state.enemy };
};

export default connect(
  mapStateToProps,
  { getEnemyCoordinates }
)(Enemy);
