// index.js

import Phaser from 'phaser';
import BBCodeTextPlugin from 'phaser3-rex-plugins/plugins/bbcodetext-plugin.js';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import UIScene from './components/UIscene';

const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 800,
    disablePreFX: true,
    disablePostFX: false,
    powerPreference: 'high-performance',
    parent: 'phaser-game',
    scene: [UIScene],
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
