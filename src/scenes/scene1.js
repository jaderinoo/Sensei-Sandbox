import Phaser from 'phaser';
import { senseiParagraph, senseiBanner } from '../utils/text';
import { createPreloader } from '../utils/utils';

const preloadComponents = createPreloader([]);
class Scene1 extends Phaser.Scene {
    static assetsLoaded = false;
    constructor() {
        super({
            key: 'scene1',
            physics: {
                default: 'matter',
            }
        })
        this.paragraph = null;
        this.banner = null;
        this.currentIndex = 2;
    }

    preload() {
        if (!this.assetsLoaded) {
            preloadComponents(this);
        }
    }

    create() {

        this.paragraph = senseiParagraph(this, '[h]Hardware[/h]\n\nIs the [b]building blocks[/b] that [b]assemble[/b] our connected world. It is every [b]physical[/b] and [b]tangible[/b] piece of the tecnological world.\n\nHardware is everywhere and everything.', { backgroundFill: 0xffffff, outline: 0xffffff, backgroundOpacity: 0.85 });
        this.banner = senseiBanner(this, 'Hardware', { backgroundFill: '#ffffff', backgroundOpacity: 0.65 })

        this.scene.get('UIScene').events.on('buttonLeftPressed', this.onButtonLeftPressed, this);
        this.scene.get('UIScene').events.on('buttonRightPressed', this.onButtonRightPressed, this);
    }

    onButtonLeftPressed() {
        this.currentIndex = Math.max(0, this.currentIndex - 1);
        this.updateObjectVisibility();

    }

    onButtonRightPressed() {
        if (this.currentIndex < 2) {
            this.currentIndex = Math.min(3, this.currentIndex + 1);
        }
        this.updateObjectVisibility();
    }

    updateObjectVisibility() {
        if (this.currentIndex === 0) {
            this.paragraph[0].setVisible(false);
            this.paragraph[1].setVisible(false);
            this.banner[0].setVisible(false);
            this.banner[1].setVisible(false);
        } else if (this.currentIndex === 1) {
            this.paragraph[0].setVisible(true);
            this.paragraph[1].setVisible(true);
            this.banner[0].setVisible(false);
            this.banner[1].setVisible(false);
        } else if (this.currentIndex === 2) {
            this.banner[0].setVisible(true);
            this.banner[1].setVisible(true);
        }
    }
}

export default Scene1;
