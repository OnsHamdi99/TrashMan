export default class AbstractScene extends BABYLON.Scene {

    constructor(engine, canvas) {
        super(engine);
        this.engine = engine;
        this.canvas = canvas;

        this.camera = this.createCamera();
        this.score = 0; 
        this.gui = null; 
        this.player = null; 
        this.center = null;
        this.currentMusic = undefined; 
        this.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());
      
    }
}