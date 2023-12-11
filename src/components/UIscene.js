

class UIScene extends Phaser.Scene {
    static folderName = '';

    constructor() {
        super('UIScene');
        this.currentIndex = 0;
        this.visitedIndexes = [0];
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
        this.sceneCount = 3;
    }

    preload() {
        this.load.image('left_button', `https://storage.googleapis.com/sensei_assets/websrc/General/UIElements/left_button.png`);
        this.load.image('right_button', `https://storage.googleapis.com/sensei_assets/websrc/General/UIElements/right_button.png`);
    }

    create() {
        const { width, height } = this.scale;

        // Calculate the padding values
        const padding = {
            x: width * 0.05,
            y: height * 0.05,
        };

        // Create the button on the bottom left with 5% padding from the bottom and the left
        const buttonLeft = this.add.image(padding.x, height - padding.y, 'left_button')
            .setOrigin(0, 1)  // Set origin to bottom left
            .setInteractive({ useHandCursor: true })
            .setScale(1.5)
            .setVisible(false);

        // Create the button on the bottom right with 5% padding from the bottom and the right
        const buttonRight = this.add.image(width - padding.x, height - padding.y, 'right_button')
            .setOrigin(1, 1)  // Set origin to bottom right
            .setInteractive({ useHandCursor: true })
            .setScale(1.5)
            .setVisible(this.sceneCount > 1);

        // Setup event listeners
        buttonLeft.on('pointerdown', () => {
            this.events.emit('buttonLeftPressed');
        });

        buttonRight.on('pointerdown', () => {
            this.events.emit('buttonRightPressed');
        });

        this.buttonLeft = buttonLeft;
        this.buttonRight = buttonRight;

        this.initProgressBar();

        // Handle the display of the definition box
        this.defBox = null;
        this.events.on('displayDefinition', this.displayDefinition, this);
        this.input.on('pointerdown', this.handlePointerDown, this);
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
    
    updateProgress(index, visitedIndexes) {
        const seenSize = { width: 10, height: 20 };
        const currentSize = { width: 10, height: 30 };
        const unseenSize = { width: 10, height: 10 };
    
        if (this.currentIndex !== index) {
            this.tweenRectangleSize(this.currentIndex, this.visitedIndexes.includes(this.currentIndex) ? seenSize : unseenSize);
            this.tweenRectangleSize(index, currentSize);
        }
    
        this.currentIndex = index;
        this.visitedIndexes = visitedIndexes;
    }

    tweenRectangleSize(index, newSize) {
        let tweenTarget = this.rectTweenTargets[index];
        const widthDiff = tweenTarget.width - newSize.width;
        const newX = tweenTarget.x + widthDiff / 2;
    
        this.tweens.add({
            targets: tweenTarget,
            width: newSize.width,
            height: newSize.height,
            x: newX,
            duration: 250,
            ease: 'Sine.easeInOut',
            onUpdate: () => {
                this.rectDimensions[index].width = tweenTarget.width;
                this.rectDimensions[index].height = tweenTarget.height;
                this.rectDimensions[index].x = tweenTarget.x;
                this.updateProgressBar(); 
            }
        });
    }

    displayDefinition(definition) {
        this.closeDefinitionBox();

        this.openingNewDefinition = true;
        const boxWidth = this.scale.width;
        const boxX = this.scale.width / 2;
        this.defBox?.destroy();
        this.defBox = this.add.container(boxX, 0).setDepth(100);
        const defTextStyle = TextStyle(this);

        // Create temporary text to measure height
        const tempText = this.add.text(0, 0, `${definition.keyword}:\n${definition.definition}`, defTextStyle).setWordWrapWidth(boxWidth * 0.9);
        const textHeight = tempText.height;
        tempText.destroy();

        this.defBox.boxHeight = textHeight + 20;
        const boxY = -this.defBox.boxHeight;

        const defBoxBg = this.rexUI.add.roundRectangle(0, 0, boxWidth, this.defBox.boxHeight, { bl: 10, br: 10 }, 0xffffff);
        defBoxBg.setStrokeStyle(2, 0x000000);
        const defText = this.add.text(0, 0, `${definition.keyword}:\n${definition.definition}`, defTextStyle).setWordWrapWidth(boxWidth * 0.9).setOrigin(0.5, 0.5);
        this.defBox.add(defBoxBg);
        this.defBox.add(defText);

        this.currentDefBoxTween = this.tweens.add({
            targets: this.defBox,
            y: this.defBox.boxHeight / 2,
            duration: 500,
            ease: 'Power2',
            paused: false
        });
    }

    handlePointerDown(pointer) {
        if (this.defBox) {
            const bounds = this.defBox.getBounds();
            if (!bounds.contains(pointer.x, pointer.y)) {
                this.closeDefinitionBox();
            }
        }
    }

    closeDefinitionBox() {
        if (this.currentDefBoxTween) {
            this.currentDefBoxTween.stop();
            this.currentDefBoxTween = null;
        }
        
        if (this.defBox) {
            const defBoxToClose = this.defBox;
            this.defBox = null;

            this.tweens.add({
                targets: defBoxToClose,
                y: -defBoxToClose.boxHeight,
                duration: 500,
                ease: 'Power2',
                paused: false,
                onComplete: () => {
                    defBoxToClose.destroy();
                }
            });
        }
    }
}

export default UIScene;
