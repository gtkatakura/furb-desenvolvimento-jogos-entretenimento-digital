import Prefab from './Prefab';

export default class Creature extends Prefab {
  constructor(...params) {
    super(...params);

    this.anchor.setTo(0.5);
    this.body.immovable = false;
    this.body.collideWorldBounds = true;
  }

  update() {
    for (const collision of this.state.collisions) {
      this.state.game.physics.arcade.collide(this, collision);
    }

    for (const enemy of (this.state.groups.enemys.objects || { objects: [] })) {
      this.state.game.physics.arcade.collide(this, enemy);
    }

    for (const gate of (this.state.groups.gates || { objects: [] }).objects) {
      this.state.game.physics.arcade.collide(this, gate);
    }
  }
}
