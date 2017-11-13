import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

import BootState from './states/BootState';
import LoadingState from './states/LoadingState';
import GameOver from './states/GameOver';

export default class Game extends Phaser.Game {
  constructor({ width, height }) {
    super(width, height, Phaser.CANVAS, 'game');

    this.state.add(BootState.name, BootState);
    this.state.add(LoadingState.name, LoadingState);
    this.state.add(GameOver.name, GameOver);

    this.state.start(BootState.name, true, false, 'level2');
  }
}
