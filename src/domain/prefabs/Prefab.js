import Phaser from 'phaser-ce';
import _ from 'lodash';

export default class Player extends Phaser.Sprite {
  constructor({ state, object: { x, y, properties } }) {
    super(state.game, x, y, properties.texture, properties.frameIndex);
    _.assign(this, { state, properties });

    this.state.game.physics.arcade.enable(this);
    this.body.immovable = true;

    const group = this.state.group(properties.group);

    group.add(this);
    group.objects.push(this);
  }
}
