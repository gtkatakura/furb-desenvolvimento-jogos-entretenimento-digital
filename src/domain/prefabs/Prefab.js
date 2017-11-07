import Phaser from 'phaser-ce';
import _ from 'lodash';

export default class Player extends Phaser.Sprite {
  constructor({ state, object: { x, y, properties } }) {
    super(state.game, x, y, properties.texture);
    _.assign(this, { state, properties });

    this.anchor.setTo(0.5);

    this.state.game.physics.arcade.enable(this);

    const group = this.state.group(properties.group);

    group.add(this);
    group.objects.push(this);
  }
}
