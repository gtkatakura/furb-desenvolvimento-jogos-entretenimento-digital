import _ from 'lodash';
import Creature from './Creature';

export default class Enemy extends Creature {
  constructor({ state, object }) {
    super({ state, object });

    this.direction = object.properties.direction || 'right';

    this.animations.add('run', [70, 71, 72, 73, 74, 75, 76, 77, 78, 79], 20);
    this.animations.add('attack', [80, 81, 82, 83, 84, 85, 86, 87, 88, 89], 20);
  }

  attack(player) {
    this.attacking = this.animations.play('attack');

    const onComplete = _.once(() => {
      if (this.distanceTo(player) < this.height + 10) {
        player.tookDamage();
      }
    });

    this.attacking.onComplete.add(onComplete);
  }

  update() {
    super.update();

    this.body.velocity.x = 0;
    this.body.velocity.y = 0;

    if (this.attacking && this.attacking.isPlaying) {
      return;
    }

    for (const object of _.flatten([_.get(this.state.groups.enemys, 'objects')])) {
      this.state.game.physics.arcade.collide(this, object, (object1, object2) => {
        object1.switchDirection();
        object2.switchDirection();
      });
    }

    this.collide(_.get(this.state.groups.boxes, 'objects'), this.switchDirection);
    this.collide(_.get(this.state.groups.gates, 'objects'), this.switchDirection);
    this.collide(_.get(this.state.groups.players, 'objects'), this.attack);

    if (this.direction === 'right') {
      this.scale.setTo(1, 1);
    } else if (this.direction === 'left') {
      this.scale.setTo(-1, 1);
    }

    if (!this.attacking || !this.attacking.isPlaying) {
      if (this.direction === 'right') {
        this.scale.setTo(1, 1);
        this.body.velocity.x = 100;
        this.animations.play('run');
      } else if (this.direction === 'left') {
        this.scale.setTo(-1, 1);
        this.body.velocity.x = -100;
        this.animations.play('run');
      }

      if (this.direction === 'down') {
        this.body.velocity.y = 100;
        this.animations.play('run');
      } else if (this.direction === 'up') {
        this.body.velocity.y = -100;
        this.animations.play('run');
      }
    }

    if (this.body.blocked[this.direction]) {
      this.switchDirection();
    }
  }

  switchDirection() {
    const directions = ['right', 'left', 'up', 'down'];
    const newDirection = directions[Math.floor(Math.random() * 4)];

    if (newDirection !== this.direction) {
      this.direction = newDirection;
    } else {
      this.switchDirection();
    }
  }
}
