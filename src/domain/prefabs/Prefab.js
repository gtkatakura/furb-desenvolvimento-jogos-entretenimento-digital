import Phaser from 'phaser-ce';
import _ from 'lodash';

export default class Player extends Phaser.Sprite {
  constructor({ state, object: { x, y, height, properties } }) {
    super(state.game, x, y - height, properties.texture, properties.frameIndex);
    _.assign(this, { state, properties });

    this.state.game.physics.arcade.enable(this);
    this.body.immovable = true;

    const group = this.state.group(properties.group);

    group.add(this);
    group.objects.push(this);
  }

  distanceTo(object) {
    return this.game.physics.arcade.distanceBetween(this, object);
  }

  collide(objects, collideCallback = _.constant(true), processCallback = _.constant(true)) {
    const callback = (ignored, ...args) => collideCallback.apply(this, args);

    for (const object of _.flatten([objects])) {
      this.state.game.physics.arcade.collide(this, object, callback, processCallback);
    }
  }

  overlap(objects, overlapCallback = _.constant(true), processCallback = _.constant(true)) {
    const callback = (ignored, ...args) => overlapCallback.apply(this, args);

    for (const object of _.flatten([objects])) {
      this.state.game.physics.arcade.overlap(this, object, callback, processCallback);
    }
  }
}
