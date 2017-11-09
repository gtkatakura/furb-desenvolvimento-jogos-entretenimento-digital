import Phaser from 'phaser-ce';
import _ from 'lodash';

const toKey = _.curry((keyboard, key) => keyboard.addKey(Phaser.Keyboard[key]));

export default toKey;
