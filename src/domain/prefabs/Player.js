import Phaser from 'phaser-ce';
import Prefab from './Prefab';

export default class Player extends Prefab {
  constructor(...params) {
    super(...params);

    this.cursors = {
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
    };

    this.animations.add('run', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);
  }

  enterDoor(player, door) {
    this.state.phase.destroy();
    this.game.state.start('BootState', true, false, door.properties.goingTo);
  }

  update() {
    for (const collision of this.state.collisions) {
      this.state.game.physics.arcade.collide(this, collision);
    }

    for (const door of (this.state.groups.doors || { objects: [] }).objects) {
      this.state.game.physics.arcade.overlap(this, door, this.enterDoor, null, this);
    }

    if (this.cursors.right.isDown) {
      this.scale.setTo(1, 1);
      this.body.velocity.x = 100;
      this.animations.play('run', 20);
    } else if (this.cursors.left.isDown) {
      this.scale.setTo(-1, 1);
      this.body.velocity.x = -100;
      this.animations.play('run', 20);
    } else {
      this.body.velocity.x = 0;
    }

    if (this.cursors.down.isDown) {
      this.body.velocity.y = 100;
      this.animations.play('run', 20);
    } else if (this.cursors.up.isDown) {
      this.body.velocity.y = -100;
      this.animations.play('run', 20);
    } else {
      this.body.velocity.y = 0;
    }
  }
}
