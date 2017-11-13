import Prefab from './Prefab';
import Enemy from './Enemy';
import Player from './Player';

const PrefabFactory = ({ state, object }) => {
  if (object.properties.group === 'players') {
    return new Player({
      state,
      object,
    });
  }

  if (object.properties.group === 'enemys') {
    return new Enemy({
      state,
      object,
    });
  }

  return new Prefab({
    state,
    object,
  });
};

export default PrefabFactory;
