export function createPreloader(components) {
    return function (scene) {
        components.forEach(component => {
            if (typeof component.preload === 'function') {
                component.preload(scene);
            }
        });
    };
}

export function getMarginL(scene) {
    if(!scene || !scene.scale) return 0;  // Defaulting to 0 if scene or scene.scale is null
    return scene.scale.width * 0.06; 
}

export function getMarginT(scene) {
    if(!scene || !scene.scale) return 0;  // Defaulting to 0 if scene or scene.scale is null
    return scene.scale.height * 0.12;
}

export function getBannerMarginT(scene) {
    if(!scene || !scene.scale) return 0;  // Defaulting to 0 if scene or scene.scale is null
    return scene.scale.height * 0.01;
}

export function getMarginR(scene, object) {
    if(!scene || !scene.scale || !object || typeof object.width !== 'number') return 0;  // Defaulting to 0 if invalid inputs
    const leftMargin = scene.scale.width * 0.06;
    return scene.scale.width - leftMargin - object.width;
}

export function calculateYPosition(scene, y, ignoreSpacer = false) {
    // Handle y as int or as object with getBottomLeft function
    let val;
    if (typeof y === 'number') {
        val = y;
    } else if (y && typeof y.getBottomLeft === 'function') {
        val = y.getBottomLeft().y + getSpacer(scene);
    } else {
        val = getMarginT(scene);
    }
    if (ignoreSpacer) val -= getSpacer(scene);
    return val;
}

export function TextStyle(scene, options = {}) {
    const baseFontSize = 24;
    const calculatedFontSize = `${(scene.scale.width / 500) * baseFontSize}px`;

    const {
        wordWrapWidth = scene.scale.width - getMarginL(scene) * 2,
        align = 'left',
        fill = 0x414042,
        maxLines = 0,
        lineSpacing = 0,
        fixedWidth = 0,
        fixedHeight = 0,
        fontSizeOverride = null
    } = options;
    
    return {
        fontFamily: 'Work Sans',
        fontSize: fontSizeOverride !== null ? fontSizeOverride : calculatedFontSize, 
        fill: fill,
        align: align,
        maxLines: maxLines,
        lineSpacing: lineSpacing,
        fixedWidth: fixedWidth,
        fixedHeight: fixedHeight,
        wrap: {
            mode: 1,
            width: wordWrapWidth
        }
    };
}