import _ from 'lodash';
import toKey from './keyboard/toKey';

const ControlKeyboard = (keyboard, keys) => _.mapValues(keys, toKey(keyboard));

export default ControlKeyboard;
