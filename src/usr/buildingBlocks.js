import { bucketBaseUrl } from '../utils/utils';

export function preload(scene) {
    console.log("preload")
    scene.load.image('block1', 'https://storage.googleapis.com/sensei_assets/websrc/Hardware/Assets/Blocks/block1.png');
    scene.load.image('block2', bucketBaseUrl + 'Hardware/Assets/Blocks/block2.png');
    scene.load.image('block3', bucketBaseUrl + 'Hardware/Assets/Blocks/block3.png');
    scene.load.image('block4', bucketBaseUrl + 'Hardware/Assets/Blocks/block4.png');
    scene.load.image('block5', bucketBaseUrl + 'Hardware/Assets/Blocks/block5.png');
    console.log(scene.textures.exists('block1'))
}

export function component(scene, options = {}) {
    scene.matter.world.setBounds(0, 0, scene.scale.width, scene.scale.height);

    function createSquare(x, y, size, key) {
        const square = scene.matter.add.image(x, y, key);
        square.setDisplaySize(size, size);
        return square.setBody({
            type: 'rectangle',
            width: size,
            height: size
        });
    }
    
    const squares = [];
    squares.push(createSquare(scene.scale.width * 1, scene.scale.height * 0.75, scene.scale.width * 0.2, 'block1'));
    squares.push(createSquare(scene.scale.width * 0.8, scene.scale.height * 0.65, scene.scale.width * 0.2, 'block2'));
    squares.push(createSquare(scene.scale.width * 0.6, scene.scale.height * 0.55, scene.scale.width * 0.2, 'block3'));
    squares.push(createSquare(scene.scale.width * 0.3, scene.scale.height * 0.45, scene.scale.width * 0.2, 'block4'));
    squares.push(createSquare(scene.scale.width * 0.1, scene.scale.height * 0.35, scene.scale.width * 0.2, 'block5'));
    scene.matter.add.mouseSpring();
    
    return squares[0];
}

export default {
    preload,
    component
  };