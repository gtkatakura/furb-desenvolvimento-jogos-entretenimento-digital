import Phaser from 'phaser';
import LoadingState from './LoadingState';

class BootState extends Phaser.State {
  init(levelName) {
    this.level = {
      name: levelName,
      data: null,
    };
  }

  preload() {
    this.load.text(this.level.name, `assets/level/${this.level.name}.json`);
  }

  create() {
    this.level.data = JSON.parse(this.game.cache.getText(this.level.name));
    this.game.state.start(LoadingState.name, true, false, this.level);
  }
}

export default BootState;
