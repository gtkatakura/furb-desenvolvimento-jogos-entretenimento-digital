import Creature from './Creature';

export default class Enemy extends Creature {
  constructor(...params) {
    super(...params);

    this.anchor.setTo(0.5);
    this.body.immovable = false;
    this.body.collideWorldBounds = true;

    this.animations.add('run', [70, 71, 72, 73, 74, 75, 76, 77, 78, 79]);
    this.direction = 'right';
  }

  update() {
    super.update();

    if (this.direction === 'right') {
      this.scale.setTo(1, 1);
      this.body.velocity.x = 100;
      this.animations.play('run', 20);
    } else if (this.direction === 'left') {
      this.scale.setTo(-1, 1);
      this.body.velocity.x = -100;
      this.animations.play('run', 20);
    } else {
      this.body.velocity.x = 0;
    }

    if (this.direction === 'down') {
      this.body.velocity.y = 100;
      this.animations.play('run', 20);
    } else if (this.direction === 'up') {
      this.body.velocity.y = -100;
      this.animations.play('run', 20);
    } else {
      this.body.velocity.y = 0;
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
