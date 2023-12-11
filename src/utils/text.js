import { getMarginL, getMarginR, getBannerMarginT, calculateYPosition, TextStyle } from "./utils";
const DEFAULT_FILL = '#414042'

export function senseiText(scene, x, y, text, style) {
    const headerTagRegex = /\[h\](.*?)\[\/h\]/g;
    const modifiedStyle = { ...style };
    let formattedText = text.replace(headerTagRegex, (match, content) => {
        const originalFontSize = parseInt(modifiedStyle.fontSize) || 22;
        const newFontSize = `${originalFontSize * 1.5}`;
        return `[size=${newFontSize}]${content}[/size]`;
    });

    const textObject = scene.add.rexBBCodeText(x, y, formattedText, modifiedStyle);
    textObject.setPadding({
        top: scene.scale.height * 0.025,
        bottom: scene.scale.height * 0.025
    });
    return textObject;
}

export function senseiBanner(scene, text, options = {}) {
    const {
        x = getMarginL(scene),
        y = getBannerMarginT(scene) * 2,
        fill = DEFAULT_FILL,
        backgroundFill = null,
        backgroundOpacity = .75,
        outline = 0xffffff
    } = options;
    const createdText = senseiText(scene, x, y - 20, text, {
        fontFamily: 'Work Sans',
        fontSize: '26px',
        fill: fill
    });
    createdText.setX(getMarginR(scene, createdText));
    let background
    if (backgroundFill !== null) {
        const paddingHorizontal = scene.scale.width * 0.03;
        const backgroundWidth = createdText.width + (2 * paddingHorizontal);
        const backgroundHeight = createdText.height + 20;

        background = scene.rexUI.add.roundRectangle(
            x,  // Adjust padding as needed
            createdText.y - createdText.padding.top,
            backgroundWidth,
            backgroundHeight * .85,
            7,
            0xffffff
        ).setStrokeStyle(2, outline);

        background.setOrigin(0, 0);
        background.setDepth(createdText.depth - 1);
        background.setAlpha(backgroundOpacity);
        background.setX(getMarginR(scene, background) + paddingHorizontal);
    }

    return [createdText, background];
}

export function senseiParagraph(scene, text, options = {}) {
    const {
        x = getMarginL(scene),
        obj = null,
        center = false,
        ignoreSpacer = false,
        fill = DEFAULT_FILL,
        backgroundFill = null,
        backgroundOpacity = 1,
        outline = 0x000000,
        topPadding = '', // Reduce padding: '-1'|'-2'|'-3' % Add padding: '+1'|'+2'|'spacer/+3' %
    } = options;

    const y = calculateYPosition(scene, obj, ignoreSpacer);
    const createdText = senseiText(scene, x, y, text, TextStyle(scene, { fill: fill }));
    createdText.setDepth(5)

    const paddingHorizontal = scene.scale.width * 0.03;
    const backgroundWidth = scene.scale.width - (2 * paddingHorizontal);
    let background
    if (backgroundFill !== null) {
        background = scene.rexUI.add.roundRectangle(
            paddingHorizontal,
            createdText.y,
            backgroundWidth,
            createdText.height,
            7,
            backgroundFill
        ).setStrokeStyle(2, outline)
            .setOrigin(0, 0)
            .setDepth(createdText.depth - 1)
            .setAlpha(backgroundOpacity);
    }

    if (center) {
        createdText.setX(getHorizontalCenter(scene, createdText.displayWidth));
    }

    let padding;
    switch (topPadding) {
        case '-1':
            padding = scene.scale.height * 0.01;
            break;
        case '-2':
            padding = scene.scale.height * 0.02;
            break;
        case '-3':
            padding = scene.scale.height * 0.03;
            break;
        case '+1':
            padding = scene.scale.height * 0.03;
            createdText.setY(createdText.y + padding);
            return createdText;
        case '+2':
            padding = scene.scale.height * 0.03;
            createdText.setY(createdText.y + padding);
            return createdText;
        case 'spacer':
            createdText.setY(createdText.y + getSpacer(scene));
            return createdText;
        default:
            padding = 0;
            break;
    }
    createdText.setY(createdText.y - padding);
    return [createdText, background];
}