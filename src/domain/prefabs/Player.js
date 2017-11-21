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

  interaction(object) {
    if (this.distanceTo(object) < (this.height + object.height) && this.keyboard.enter.isDown) {
      if (object.properties.actionEnable) {
        const uniqueId = object.properties.actionTarget || object.properties.uniqueId;

        if (object.properties.action === 'kill') {
          this.killById(uniqueId);
        }

        if (object.properties.action === 'enable') {
          this.showMessage(object, object.properties.actionText);
          this.enableActions(uniqueId);
        }
      } else {
        this.showMessage(object, object.properties.actionDisableText);
      }
    }
  }

  showMessage(object, message) {
    if (!message) {
      return;
    }

    const style = {
      font: '14px Arial',
      fill: '#ffffff',
    };

    let x = message.length * 7;

    if (object.position.x <= this.game.world.width / 2) {
      x = object.position.x + object.width;
    } else {
      x = object.position.x - x;
    }

    const text = this.game.add.text(x, object.position.y, message, style);

    setTimeout(() => text.kill(), 5000);
  }

  allObjects() {
    return _.flatten(_.map(Object.values(this.state.groups), 'objects'));
  }

  enableActions(uniqueId) {
    for (const object of this.allObjects()) {
      if (object.properties.uniqueId === uniqueId) {
        object.properties.actionEnable = true;
      }
    }
  }

  killById(uniqueId) {
    for (const object of this.allObjects()) {
      if (object.properties.uniqueId === uniqueId) {
        object.kill();
      }
    }
  }

  update() {
    super.update();

    this.collide(_.get(this.state.groups.gates, 'objects'));
    this.collide(_.get(this.state.groups.enemys, 'objects'));
    this.collide(_.get(this.state.groups.boxes, 'objects'));
    this.overlap(_.get(this.state.groups.doors, 'objects'), this.enterDoor);

    for (const object of this.state.objectsWithAction) {
      this.interaction(object);
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
