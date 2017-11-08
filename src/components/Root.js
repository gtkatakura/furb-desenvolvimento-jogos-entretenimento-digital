import React from 'react';
import Game from '../domain/Game';

const style = {
  margin: '0px auto',
  width: 512,
  height: 512,
};

const Root = () => {
  global.game = new Game(style);
  return <div style={style} id="game" />;
};

export default Root;
