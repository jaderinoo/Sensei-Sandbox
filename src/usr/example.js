// Example usage of our built in components
// import { addTextWithBackgroudBox } from "../components/gameComponents"

export function preload(scene) {
    // scene.load.image('example', 'assets/images/example.png');
    // scene.load.audio('example', 'assets/audio/example.mp3');
    // scene.load.video('example', 'assets/video/example.mp4');
    // scene.load.html('example', 'assets/html/example.html');
}

export function component(scene, options = {}) {
    // Example usage:
    // const {
    //     x = 0,
    //     y = 0,
    //     speed = 1,
    //     count = 3
    // } = options;
    const {
        fill = '#0f0'
    } = options;

    const { width, height } = scene.scale;

    // Phaser components go here
    scene.add.text(width / 2, height / 2, 'Hello World', { fill: fill }).setOrigin(0.5);
}

export default {
    preload,
    component
};