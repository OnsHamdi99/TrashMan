import AbstractScene from "./AbstractScene.js";


export default class IntroScene extends AbstractScene {
    constructor (engine, canvas) {
        super(null, engine, canvas);
    }

    async mainMenu() {
        
        let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("mainMenuUI", true, this);

    }

    // async optionsMenu() {
        
    //     let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("mainMenuUI", true, this);
    
    // }

    // async levelMenu() {

    //     let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("mainMenuUI", true, this);

    // }
}

