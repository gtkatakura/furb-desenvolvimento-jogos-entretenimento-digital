import ControlKeyboard from '../../user/ControlKeyboard';

const keys = {
  up: 'W',
  down: 'S',
  left: 'A',
  right: 'D',
  enter: 'ENTER',
};

const KeyboardFactory = keyboard => ControlKeyboard(keyboard, keys);

export default KeyboardFactory;
