// index.js

import Phaser from 'phaser';
import BBCodeTextPlugin from 'phaser3-rex-plugins/plugins/bbcodetext-plugin.js';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import UIScene from './components/UIscene';
import Scene1 from './scenes/scene1';


function getGameDimensions() {
    const desiredAspectRatio = .5 / 1
    const aspectRatio = window.innerWidth / window.innerHeight
    let gameWidth, gameHeight

    if (Math.abs(aspectRatio - desiredAspectRatio) < 0.01) {
        gameWidth = window.innerWidth * 1
        gameHeight = gameWidth / desiredAspectRatio
    } else {
        gameHeight = window.innerHeight * 0.9
        gameWidth = gameHeight * desiredAspectRatio
    }

    return { gameWidth, gameHeight }
}

const { gameWidth, gameHeight } = getGameDimensions()

const config = {
    type: Phaser.AUTO,
    width: gameWidth,
    height: gameHeight,
    disablePreFX: true,
    disablePostFX: false,
    powerPreference: 'high-performance',
    parent: 'phaser-game',
    scene: [Scene1, UIScene],
    backgroundColor: '#F5F5F5',
    resolution: window.devicePixelRatio || 1,
    pixelArt: true,
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 0 },
            debug: false
        }
    },
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }],
        global: [{
            key: 'rexBBCodeTextPlugin',
            plugin: BBCodeTextPlugin,
            start: true
        }]
    }
}

const game = new Phaser.Game(config);
window.game = game;
window.gameConfig = config;
