
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

        instance.configuration.engine.runRenderLoop(function () { //  Register a render loop to repeatedly render the scene
            let main = instance.scene.getMeshByName("heroMain");

            if (main)
                main.move();
                  
            instance.renderScene()
        });
    }

    creerElementsScene() {
        this.getHero();
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
    getHero() {
        BABYLON.SceneLoader.ImportMesh("", "./../assets/models/", "male.glb", this.scene, (newMeshes, particleSystems, skeletons, animationGroups) => {
            let main = newMeshes[0];
            main.position.x = 0;
            main.position.z = -3;
            main.position.y = 1.4;

            //main.frontVector = new BABYLON.Vector3(0, 0, 1);

            // main.rotation.x = Math.PI;
            // main.rotation.y = 0;
            // main.rotation.z = Math.PI;

            main.scaling = new BABYLON.Vector3(1.5, 1.5, 1.5);

            main.name = "heroMain";

            let a = this.scene.getAnimationGroupByName("Jump");
            a.start(true, 1.0, a.from, a.to, false);

            main.move = function () {
                main.rotation.z += 0.05;

                if (main.rotation.z >= 0 && main.rotation.z <= 10) {
                    main.position.y = Math.sin(main.rotation.z) * 1 + 2.8;
                    main.position.x = 0;
                    // let b = this.scene.getAnimationGroupByName("Jump");
                    // b.start(true, 1.0, a.from, a.to, false);
                }

                if (main.rotation.z > 10 && main.rotation.z <= 20) {
                    main.position.x = Math.sin(main.rotation.z) * 1.4 + 1.4;
                    // let c = this.scene.getAnimationGroupByName("Run");
                    // c.start(true, 1.0, a.from, a.to, false);
                }

                if (main.rotation.z > 20 && main.rotation.z <= 30) {
                    main.position.x = -Math.sin(main.rotation.z) * 1.4 - 1.4;
                    // let d = this.scene.getAnimationGroupByName("Run");
                    // d.start(true, 1.0, a.from, a.to, false);
                }

                if (main.rotation.z >= 30) {
                    main.rotation.z = main.rotation.z - 30;
                }

            }
        });
    }
    /**
     * charger le rendu de la scene
     */
    renderScene() {
        this.scene.render();
    }
}
export { LevelOne};