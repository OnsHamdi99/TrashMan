import AbstractScene from "./AbstractScene.js";
//import { TextBlock, StackPanel, Button } from "babylonjs-gui";


export default class IntroScene{
    constructor (engine, canvas) {
    //    super(null, engine, canvas);
        this.mainMenuActive = true;
        this.levelsMenuActive = false;
    }
    clearScene() {
        this.guiTexture.dispose();
        this.guiTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    }
    async mainMenu() {
        this.clearScene();
        this.mainMenuActive = true;
        this.levelsMenuActive = false;
        
        const background = new BABYLON.GUI.Image("background", "assets/images/MAIN_PAGE.png");
        background.width = 1;
        background.height = 1;
        this.guiTexture.addControl(background);
        const titleText = new TextBlock();
        titleText.text = "TRASHMAN";
        titleText.fontSize = 48;
        titleText.color = "white";
        titleText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        titleText.top = "30%";
        this.guiTexture.addControl(titleText);
        const playButton = Button.CreateSimpleButton("playButton", "Play");
        playButton.width = 0.2;
        playButton.height = "40px";
        playButton.color = "white";
        playButton.background = "green";
        playButton.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        playButton.onPointerUpObservable.add(() => {
            this.mainMenuActive = false;
            this.levelsMenuActive = true;
            this.levelsMenu();
        });
        this.guiTexture.addControl(playButton);
    }
    async levelsMenu() {
            this.clearScene();
            this.mainMenuActive = false;
            this.levelsMenuActive = true;
            
            // Create background image
            const background = new BABYLON.GUI.Image("background", "path/to/image.png");
            background.width = 1;
            background.height = 1;
            this.guiTexture.addControl(background);
            
            // Create levels stack panel
            const levelsPanel = new StackPanel();
            levelsPanel.width = "220px";
            levelsPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            levelsPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
            this.guiTexture.addControl(levelsPanel);
            
            // Create level 1 button
            const level1Button = Button.CreateSimpleButton("level1Button", "Level 1");
            level1Button.width = 1;
            level1Button.height = "40px";
            level1Button.color = "white";
            level1Button.background = "green";
            level1Button.onPointerUpObservable.add(() => {
                // Navigate to level 1
            });
            levelsPanel.addControl(level1Button);
            

    }
}

