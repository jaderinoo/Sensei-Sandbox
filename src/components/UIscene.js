

class UIScene extends Phaser.Scene {
    static folderName = '';

    constructor() {
        super('UIScene');
        this.currentIndex = 2;
        this.visitedIndexes = [0, 1];
        this.rectDimensions = [];
        this.rectTweenTargets = [];
        this.margin = 15;
        this.stepSpacing = 5;
        this.maxWidth = 15;
        this.lastRedrawTime = 0;
        this.currentDefBoxTween = null;
    }

    init(data) {
        this.folderName = data.folderName;
        this.sceneCount = 5;
    }

    preload() {
        this.load.image('left_button', `https://storage.googleapis.com/sensei_assets/websrc/General/UIElements/left_button.png`);
        this.load.image('right_button', `https://storage.googleapis.com/sensei_assets/websrc/General/UIElements/right_button.png`);
    }

    create() {
        const { width, height } = this.scale;

        const padding = {
            x: width * 0.05,
            y: height * 0.05,
        };

        const buttonLeft = this.add.image(padding.x, height - padding.y, 'left_button')
            .setOrigin(0, 1)  // Set origin to bottom left
            .setInteractive({ useHandCursor: true })
            .setScale(1.5)
            .setVisible(true);

        const buttonRight = this.add.image(width - padding.x, height - padding.y, 'right_button')
            .setOrigin(1, 1)
            .setInteractive({ useHandCursor: true })
            .setScale(1.5)
            .setVisible(this.sceneCount > 1);

        this.buttonLeft = buttonLeft;
        this.buttonRight = buttonRight;

        this.initProgressBar();
    }

    updateButtonVisibility(currentIndex, totalScenes) {
        const isFirstChild = currentIndex === 0;
        const isLastChild = currentIndex === totalScenes - 1;

        this.buttonLeft.setVisible(!isFirstChild);
        this.buttonRight.setVisible(!isLastChild);
    }

    initProgressBar() {
        const stepSize = this.maxWidth + this.stepSpacing;
        for (let i = 0; i < this.sceneCount; i++) {
            const size = (i === this.currentIndex) ? { width: 10, height: 30 } : { width: 10, height: 10 };
            const xPosition = this.margin + i * stepSize + (stepSize - size.width) / 2;
            this.rectDimensions.push({ ...size, x: xPosition });
            this.rectTweenTargets.push({ ...size, x: xPosition });
        }
    
        this.progressBarBg = this.add.graphics();
        this.progressBar = this.add.graphics();
        this.updateProgressBar();
    }
    
    updateProgressBar() {
        const totalSteps = this.sceneCount;    
        this.progressBar.clear();
        this.progressBarBg.clear();
    
        for (let i = 0; i < totalSteps; i++) {
            let color, radius;
            const size = this.rectDimensions[i];
            const currentX = size.x;
    
            if (i === this.currentIndex) {
                color = 0x00FFFF; // Cyan for current
                radius = 5;
            } else if (this.visitedIndexes.includes(i)) {
                color = 0x0000FF; // Blue for visited
                radius = 5;
            } else {
                color = 0xAAAAAA; // Grey for unseen
                radius = 5;
            }
    
            this.progressBar.lineStyle(1, 0x000000, 0.15);
            this.progressBar.strokeRoundedRect(
                currentX,
                this.margin,
                size.width,
                size.height,
                radius
            );
    
            this.progressBar.fillStyle(color, .65);
            this.progressBar.fillRoundedRect(
                currentX,
                this.margin,
                size.width,
                size.height,
                radius
            );
        }
    }
}

export default UIScene;
