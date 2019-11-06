import React, { useEffect } from "react";
import Enemy from "../players/Enemy";
import Ground from "./Ground";
import PropTypes from "prop-types";

const LevelOne = ({
  enemies,
  levelOneEnemies,
  getDimensions,
  enemyDimensions,
  enemyHit,
  setEnemyAmt,
  groundRef
}) => {
  useEffect(() => {
    return setEnemyAmt(levelOneEnemies);
  }, []);

  const enemyMap = levelOneEnemies.map((enemy, i) => {
    return (
      <Enemy
        enemyRef={enemy.ref}
        enemyDimensions={enemyDimensions}
        getDimensions={getDimensions}
        enemyHit={enemy.hit}
        key={i}
        title={enemy.enemy}
        randomSpawnX={enemy.spawnX}
        randomSpawnY={enemy.spawnY}
      />
    );
  });
  return (
    <>
      {enemyMap}
      <Ground groundRef={groundRef} />
    </>
  );
};

LevelOne.propTypes = {
  groundRef: PropTypes.object.isRequired,
  levelOneEnemies: PropTypes.array.isRequired,
  enemyDimensions: PropTypes.array.isRequired,
  enemyHit: PropTypes.object.isRequired,
  setEnemyAmt: PropTypes.func.isRequired
};

export default LevelOne;
