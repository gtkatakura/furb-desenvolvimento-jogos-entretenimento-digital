import Phaser from 'phaser-ce';
import _ from 'lodash';

import PrefabFactory from '../prefabs/PrefabFactory';

export default class LoadingState extends Phaser.State {
  init(level) {
    this.level = level;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.cursors = {
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
    };

    this.prefabs = {};
    this.groups = {};
    this.layers = {};
    this.collisions = [];
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
      this.load.spritesheet(tileset.name, source, 32, 32);
    }

    this.load.spritesheet('rogue', 'assets/characteres/rogue/sprite.png', 32, 32);
  }

  create() {
    const phase = this.add.tilemap(this.level.name);
    this.phase = phase;

    for (const tileset of phase.tilesets) {
      phase.addTilesetImage(tileset.name, tileset.name);
    }

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

    this.layers[this.phase.layer.name].resizeWorld();

    for (const objects of Object.values(phase.objects)) {
      for (const object of objects) {
        const prefab = PrefabFactory({
          state: this,
          object,
        });

        this.game.add.existing(prefab);
      }
    }
  }

  group(name) {
    if (!this.groups[name]) {
      this.groups[name] = _.assign(this.game.add.group(), {
        objects: [],
      });

      this.groups[name].enableBody = true;
    }

    return this.groups[name];
  }
}
