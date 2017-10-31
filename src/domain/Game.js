import 'pixi';
import 'p2';
import Phaser from 'phaser';

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

        this.load.spritesheet('rogue_run', 'assets/characteres/rogue/sprite.png', 32, 32);
    }

    create() {
        this.player = this.add.sprite(32 / 2, 32 / 2, 'rogue_run');
        this.player.animations.add('run', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);
        this.player.anchor.setTo(0.5);

        const map = this.add.tilemap('mapName');
        map.addTilesetImage('dungeon', 'dungeon');
        const layer = map.createLayer('Chao');
        layer.resizeWorld();
    }

    update() {
        if (this.cursors.right.isDown) {
            this.player.scale.setTo(1, 1);
            this.player.x += 2;
            this.player.animations.play('run', 20);
        } else if (this.cursors.left.isDown) {
            this.player.scale.setTo(-1, 1);
            this.player.x -= 2;
            this.player.animations.play('run', 20);
        }
        
        if (this.cursors.down.isDown) {
            this.player.y += 2;
            this.player.animations.play('run', 20);
        } else if (this.cursors.up.isDown) {
            this.player.y -= 2;
            this.player.animations.play('run', 20);
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