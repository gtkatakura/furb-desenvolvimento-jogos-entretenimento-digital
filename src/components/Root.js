import React from 'react';
import Game from './Game';

const Root = () => {
  global.game = new Game();
  return <h1>Hello World!</h1>;
};

export default Root;
