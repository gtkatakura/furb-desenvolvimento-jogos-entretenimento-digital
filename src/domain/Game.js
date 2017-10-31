import 'pixi';
import 'p2';
import Phaser from 'phaser';

import _ from 'lodash';

class BootState extends Phaser.State {
    init() {
        this.stage.backgroundColor = '#EDEEC9';
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.cursors = {
          up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
          down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
          left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
          right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
        };
    }
    
    preload() {
        this.load.tilemap('mapName', 'assets/phases/Fase1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('dungeon', 'assets/map/dungeon.png');

        this.load.spritesheet('rogue', 'assets/characteres/rogue/sprite.png', 32, 32);
        this.load.text("level1", 'assets/phases/Fase1.json');
    }

    create() {
        const phase = this.add.tilemap('mapName');
        phase.addTilesetImage('dungeon', 'dungeon');

        // const level = JSON.parse(this.game.cache.getText("level1"));

        this.layers = {};
        
        for (let layer of phase.layers) {
            this.layers[layer.name] = phase.createLayer(layer.name);

            if (layer.properties.collision) { // collision layer
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

        for (let [name, objects] of Object.entries(phase.objects)) {
            for (let object of objects) {
                this.player = this.add.sprite(object.x, object.y, object.properties.texture);
                this.player.animations.add('run', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);
                this.player.anchor.setTo(0.5);
                this.game.physics.arcade.enable(this.player);
            }
        }
    }

    update() {
        this.game.physics.arcade.collide(this.player, this.layers.collision);

        if (this.cursors.right.isDown) {
            debugger
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

export default class Game extends Phaser.Game {
    constructor() {
        super(800, 600, Phaser.CANVAS, 'content');

        this.state.add(BootState.name, BootState, false);
        this.state.start(BootState.name);
    }
}