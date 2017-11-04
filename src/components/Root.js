import React from 'react';
import Game from '../domain/Game';

const Root = () => {
  global.game = new Game();
  return <span></span>;
};

export default Root;
