import _ from 'lodash';
import Prefab from './Prefab';

export default class Creature extends Prefab {
  constructor(...params) {
    super(...params);

    this.anchor.setTo(0.5);
    this.body.immovable = false;
    this.body.collideWorldBounds = true;
  }

  update() {
    this.collide(this.state.collisions);
  }
}
