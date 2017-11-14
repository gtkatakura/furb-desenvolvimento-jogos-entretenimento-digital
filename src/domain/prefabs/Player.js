import _ from 'lodash';
import Creature from './Creature';
import KeyboardFactory from './player/KeyboardFactory';

export default class Player extends Creature {
  constructor(...params) {
    super(...params);

    this.keyboard = KeyboardFactory(this.game.input.keyboard);

    this.animations.add('run', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);
    this.game.camera.follow(this);
    this.life = 3;
  }

  tookDamage() {
    this.life--;

    if (this.life === 0) {
      this.gameOver();
    }
  }

  gameOver() {
    this.state.phase.destroy();
    this.game.state.start('GameOver');
  }

  enterDoor(door) {
    this.state.phase.destroy();
    this.game.state.start('BootState', true, false, door.properties.targetLevel);
  }

  openGate(gate) {
    if (this.distanceTo(gate) < this.height && this.keyboard.enter.isDown) {
      this.killGate(gate);
    }
  }

  killGate(pieceOfGate) {
    for (const gate of this.state.groups.gates.objects) {
      if (gate.properties.uniqueId === pieceOfGate.properties.uniqueId) {
        gate.kill();
      }
    }
  }

  update() {
    super.update();

    this.collide(_.get(this.state.groups.enemys, 'objects'));
    this.overlap(_.get(this.state.groups.doors, 'objects'), this.enterDoor);

    for (const gate of (this.state.groups.gates || { objects: [] }).objects) {
      this.openGate(gate);
    }

    if (this.keyboard.right.isDown) {
      this.scale.setTo(1, 1);
      this.body.velocity.x = 100;
      this.animations.play('run', 20);
    } else if (this.keyboard.left.isDown) {
      this.scale.setTo(-1, 1);
      this.body.velocity.x = -100;
      this.animations.play('run', 20);
    } else {
      this.body.velocity.x = 0;
    }

    if (this.keyboard.down.isDown) {
      this.body.velocity.y = 100;
      this.animations.play('run', 20);
    } else if (this.keyboard.up.isDown) {
      this.body.velocity.y = -100;
      this.animations.play('run', 20);
    } else {
      this.body.velocity.y = 0;
    }
  }
}
