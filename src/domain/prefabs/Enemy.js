import _ from 'lodash';
import Creature from './Creature';

export default class Enemy extends Creature {
  constructor(...params) {
    super(...params);

    this.anchor.setTo(0.5);
    this.body.immovable = false;
    this.body.collideWorldBounds = true;

    this.animations.add('run', [70, 71, 72, 73, 74, 75, 76, 77, 78, 79]);
    this.animations.add('attack', [80, 81, 82, 83, 84, 85, 86, 87, 88, 89]);
    this.direction = 'right';
  }

  attack(enemy, player) {
    this.attacking = this.animations.play('attack', 20);

    this.attacking.onComplete.add(_.once(() => {
      if (this.game.physics.arcade.distanceBetween(enemy, player) < this.height + 10) {
        player.tookDamage();
      }
    }));
  }

  update() {
    super.update();

    this.body.velocity.x = 0;
    this.body.velocity.y = 0;

    if (this.attacking && this.attacking.isPlaying) {
      return;
    }

    for (const player of (this.state.groups.players.objects || { objects: [] })) {
      this.state.game.physics.arcade.collide(this, player, this.attack, null, this);
    }

    if (this.direction === 'right') {
      this.scale.setTo(1, 1);
    } else if (this.direction === 'left') {
      this.scale.setTo(-1, 1);
    }

    if (!this.attacking || !this.attacking.isPlaying) {
      if (this.direction === 'right') {
        this.scale.setTo(1, 1);
        this.body.velocity.x = 100;
        this.animations.play('run', 20);
      } else if (this.direction === 'left') {
        this.scale.setTo(-1, 1);
        this.body.velocity.x = -100;
        this.animations.play('run', 20);
      }

      if (this.direction === 'down') {
        this.body.velocity.y = 100;
        this.animations.play('run', 20);
      } else if (this.direction === 'up') {
        this.body.velocity.y = -100;
        this.animations.play('run', 20);
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
