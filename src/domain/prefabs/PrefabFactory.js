import Prefab from './Prefab';
import Player from './Player';

const PrefabFactory = ({ state, object }) => {
  if (object.properties.group === 'players') {
    return new Player({
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
