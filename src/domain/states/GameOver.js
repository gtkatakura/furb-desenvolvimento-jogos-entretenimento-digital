import Phaser from 'phaser-ce';

export default class GameOver extends Phaser.State {
  preload() {
    this.game.load.image('gameover', 'assets/texts/gameover.png');
    this.game.load.image('play', 'assets/texts/play.png');
  }

  restart() {
    this.state.start('BootState', true, false, 'level1');
  }

  create() {
    this.title = this.game.add.sprite(this.game.world.centerX - 160, this.game.world.centerY - 160, 'gameover');
    this.button = this.game.add.button(160, 200, 'play', this.restart, this);
  }
}
