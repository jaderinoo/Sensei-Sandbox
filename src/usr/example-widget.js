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
    } = options;

    const { width, height } = scene.scale;

    // Phaser components go here
}

export default {
    preload,
    component
};