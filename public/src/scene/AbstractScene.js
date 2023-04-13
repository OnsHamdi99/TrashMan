import { soundLoader } from "../sounds.js";
import { GameState, GameLevel } from "../utils.js";

export default class AbstractScene extends BABYLON.Scene {

    constructor(engine, canvas) {
        super(engine);
        this.engine = engine;
        this.canvas = canvas;
        this.light = this.createLight();
        this.camera = this.createCamera();
        this.score = 0; 
        this.gui = null; 
        this.currentMusic = undefined;
        this.player = null; 
        this.center = null;
        this.currentMusic = undefined; 
        this.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());
        this.createBackground();
    }
    createLight() { 
        light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this);
        this.light.intensity = 0.7;
        if (this.currentLevel === GameLevel.getLevelByName("level1")){
            this.currentMusic = soundLoader.levelOneMusic;
        }
        return this.light;
    }


    createCamera() {
       
        return new BABYLON.ArcRotateCamera("camera", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), this);
        

    }
}