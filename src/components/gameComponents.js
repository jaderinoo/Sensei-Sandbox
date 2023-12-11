import { TextStyle } from "./styles";

export function addTextWithBackgroudBox(scene, text, options = {}) {
    const {
        x = scene.scale.width / 2, 
        y = scene.scale.height / 2, 
        color = '#000000', 
        backgroundColor = '#ffffff', 
        backgroundOpacity = .5,
        padding = 10,
        fontSizeOverride = null
    } = options;
    
    
    // Create the text with dynamic parameters
    let displayText = scene.add.text(x, y, text, TextStyle(scene, { fill: color, fontSizeOverride: fontSizeOverride }));
    displayText.setOrigin(0.5);

    // Calculate the width and height for the background box
    const rectWidth = displayText.width + padding * 2; 
    const rectHeight = displayText.height + padding * 2;
    const cornerRadius = 10;

    // Create the background graphics
    const background = scene.add.graphics();
    let colorHex = parseInt(backgroundColor.replace(/^#/, ''), 16);
    background.fillStyle(colorHex, backgroundOpacity);
    background.fillRoundedRect(
        displayText.x - rectWidth / 2,
        displayText.y - rectHeight / 2,
        rectWidth,
        rectHeight,
        cornerRadius
    );

    background.setDepth(displayText.depth - 1);

    // Return both the text and the background
    return { displayText, background };
}
