import Phaser from 'phaser';
import LoadingState from './LoadingState';

export default class BootState extends Phaser.State {
  init(levelName) {
    this.level = {
      name: levelName,
      data: null,
    };
  }

  preload() {
    this.load.json(this.level.name, `assets/level/${this.level.name}.json`);
  }

  create() {
    this.level.data = this.game.cache.getJSON(this.level.name);
    this.game.state.start(LoadingState.name, true, false, this.level);
  }
}
