import Phaser from 'phaser';
import { senseiParagraph, senseiBanner } from '../utils/text';
import { createPreloader } from '../utils/utils';
import { loadComponent } from '../utils/utils';


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
        this.dynamicComponents = [];
    }

    preload() {
        if (!Scene1.assetsLoaded) {
            createPreloader(this.dynamicComponents)(this);
            preloadComponents(this);
            Scene1.assetsLoaded = true;
        }
    }

    create() {
        this.paragraph = senseiParagraph(this, '[h]Hardware[/h]\n\nIs the [b]building blocks[/b] that [b]assemble[/b] our connected world. It is every [b]physical[/b] and [b]tangible[/b] piece of the tecnological world.\n\nHardware is everywhere and everything.', { backgroundFill: 0xffffff, outline: 0xffffff, backgroundOpacity: 0.85 });
        this.banner = senseiBanner(this, 'Hardware', { backgroundFill: '#ffffff', backgroundOpacity: 0.65 })

        this.scene.get('UIScene').events.on('buttonLeftPressed', this.onButtonLeftPressed, this);
        this.scene.get('UIScene').events.on('buttonRightPressed', this.onButtonRightPressed, this);

        const userInput = prompt("Enter the component name:");
        this.addComponent(userInput);
    }

    async addComponent(componentName) {
        const component = await loadComponent(componentName);
        if (component) {
            // Prompt for parameters
            const paramsInput = prompt("Enter parameters:");
            let params = {};

            // Evaluate parameters if input is provided
            if (paramsInput) {
                try {
                    const paramsFunc = new Function('scene', `return ${paramsInput};`);
                    params = paramsFunc(this);
                } catch (error) {
                    console.error('Failed to evaluate parameters:', error);
                }
            }

            // Add component with parameters
            this.dynamicComponents.push(component);
            if (typeof component.component === 'function') {
                component.component(this, params);
            }
            if (typeof component.preload === 'function') {
                component.preload(this);
            }
        }
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
