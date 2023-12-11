// index.js

import Phaser from 'phaser';
import UIScene from './components/UIscene';

const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 800,
    parent: 'phaser-game',
    scene: [UIScene],
    backgroundColor: '#f5f5f5',
};

const game = new Phaser.Game(config);
