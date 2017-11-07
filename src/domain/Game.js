import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

import BootState from './states/BootState';
import LoadingState from './states/LoadingState';

export default class Game extends Phaser.Game {
  constructor() {
    super(960, 960, Phaser.CANVAS, 'content');

    this.state.add(BootState.name, BootState, false);
    this.state.add(LoadingState.name, LoadingState, false);

    this.state.start(BootState.name, true, false, 'level1');
  }
}
