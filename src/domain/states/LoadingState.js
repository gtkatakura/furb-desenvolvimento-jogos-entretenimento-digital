import Phaser from 'phaser';

import _ from 'lodash';

class LoadingState extends Phaser.State {
  init(level) {
    this.level = level;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.cursors = {
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
    };
  }

  preload() {
    this.tilemap = this.load.tilemap(
      this.level.name,
      `assets/level/${this.level.name}.json`,
      null,
      Phaser.Tilemap.TILED_JSON,
    );

    for (const tileset of this.level.data.tilesets) {
      const source = tileset.image.replace('..', 'assets');
      this.load.image(tileset.name, source);
    }

    this.load.spritesheet('rogue', 'assets/characteres/rogue/sprite.png', 32, 32);
  }

  create() {
    const phase = this.add.tilemap(this.level.name);

    for (const tileset of phase.tilesets) {
      phase.addTilesetImage(tileset.name, tileset.name);
    }

    this.layers = {};
    this.collisions = [];

    for (const layer of phase.layers) {
      this.layers[layer.name] = phase.createLayer(layer.name);

      if (layer.properties.collision) {
        this.collisions.push(this.layers[layer.name]);

        const indexes = _(layer.data)
          .flatten()
          .flatMap('index')
          .uniq()
          .filter(index => index > 0)
          .value();

        phase.setCollision(indexes, true, layer.name);
      }
    }

    this.layers[phase.layer.name].resizeWorld();

    for (const objects of Object.values(phase.objects)) {
      for (const object of objects) {
        this.player = this.add.sprite(object.x, object.y, object.properties.texture);
        this.player.animations.add('run', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);
        this.player.anchor.setTo(0.5);
        this.game.physics.arcade.enable(this.player);
      }
    }
  }

  update() {
    for (const collision of this.collisions) {
      this.game.physics.arcade.collide(this.player, collision);
    }

    if (this.cursors.right.isDown) {
      this.player.scale.setTo(1, 1);
      this.player.body.velocity.x = 100;
      this.player.animations.play('run', 20);
    } else if (this.cursors.left.isDown) {
      this.player.scale.setTo(-1, 1);
      this.player.body.velocity.x = -100;
      this.player.animations.play('run', 20);
    } else {
      this.player.body.velocity.x = 0;
    }

    if (this.cursors.down.isDown) {
      this.player.body.velocity.y = 100;
      this.player.animations.play('run', 20);
    } else if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -100;
      this.player.animations.play('run', 20);
    } else {
      this.player.body.velocity.y = 0;
    }
  }
}

export default LoadingState;
