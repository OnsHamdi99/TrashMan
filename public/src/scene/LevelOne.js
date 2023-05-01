
class LevelOne {

    /**
     * Constructeur
     * @param {*} configuration : configuration du projet
     */
    constructor(configuration) {
        this.configuration = configuration;

        this.scene = new BABYLON.Scene(configuration.engine);  //  Creates a basic Babylon Scene object
        this.configuration.scenes.push(this.scene)// Mettre la scene en 1er dans la liste
        this.canvas = configuration.canvas;

        this.configureAssetManager();  //  Configure la scene et afficher le rendu à interval réguliers

    }


    /**
     * Configurer tout les eléménts de la scene et recharger régulierement le rendu scene
     */
    configureAssetManager() {

        var instance = this;

        instance.creerElementsScene();  //  Call the createScene function

        instance.configuration.engine.runRenderLoop(function () {  //  Register a render loop to repeatedly render the scene
            instance.renderScene()
        });
    }

    creerElementsScene() {

        this.creerCamera();
        this.creerLumiere();
        this.greateGround();

    }
    creerLumiere() {
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;
    }
    creerCamera() {
        // This creates and positions a free camera (non-mesh)
        const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), this.scene);
        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
        // This attaches the camera to the canvas
        camera.attachControl(this.canvas, true);
    }
    greateGround() {
        const groundWidth = 10;
const groundLength = 600;

const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: groundWidth, height: groundLength });

        
    }
    getHero(){

    }
    /**
     * charger le rendu de la scene
     */
    renderScene() {
        this.scene.render();
    }
}
export { LevelOne};