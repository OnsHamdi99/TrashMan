import {soundLoader} from '../sounds.js';
import { IntroScene } from './IntroScene.js';
class LevelTwo {

    /**
     * Constructeur
     * @param {*} configuration : configuration du projet
     */
    
    constructor(configuration) {
        this.configuration = configuration;
    
        this.scene = new BABYLON.Scene(configuration.engine);  //  Creates a basic Babylon Scene object
        this.configuration.scenes.push(this.scene)// Mettre la scene en 1er dans la liste
        this.canvas = configuration.canvas;
        this.hero = null;
        this.camera = null;
        this.inputStates = {};
        this.configureAssetManager();  //  Configure la scene et afficher le rendu à interval réguliers
        let tree;
        this.isTreeLoaded = false;
    }
    async configureAssetManager() {
        this.modifySettings();
         var instance = this;
         this.hero =  await this.getHero();
      
         if (this.hero != null){
             console.log(this.hero);
             this.camera = this.createFollowCamera(this.scene, this.hero);
             this.scene.activeCamera = this.camera;
             console.log(this.camera);
         }
 
       
         instance.creerElementsScene();  //  Call the createScene function
 
         instance.configuration.engine.runRenderLoop(function () { //  Register a render loop to repeatedly render the scene
             
             instance.renderScene()
         });
     }
 
     creerElementsScene() {
         this.creerLumiere();
         this.greateGround();
     }
     creerLumiere() {
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;
    }
    createFollowCamera(scene, target) {
        let camera = new BABYLON.FollowCamera("heroFollowCamera", target.position, scene, target);
    
        camera.radius = 8; // how far from the object to follow
        camera.heightOffset = 3; // how high above the object to place the camera
        camera.rotationOffset = 180; // the viewing angle
        camera.cameraAcceleration = .1; // how fast to move
        camera.maxCameraSpeed = 5; // speed limit

        return camera;
    }
    greateGround() {
        const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", this.scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture("./../assets/images/pavement.jpg", this.scene);
        const groundWidth = 10;
        const groundLength = 400;

        const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: groundWidth, height: groundLength });

        ground.material = groundMaterial;


    }
    async getHero() {
        let hero = await BABYLON.SceneLoader.ImportMeshAsync(
            "", "./../assets/models/", "male.glb", this.scene);
            if (hero.meshes.length > 0) {
            let main = hero.meshes[0];
            main.position.x = 0;
            main.position.z = 200;
            main.position.y = 1.4;

            //main.frontVector = new BABYLON.Vector3(0, 0, 1);

            // main.rotation.x = Math.PI;
            // main.rotation.y = 0;
            // main.rotation.z = Math.PI;

            main.scaling = new BABYLON.Vector3(1.5, 1.5, 1.5);

            main.name = "heroMain";
            main.checkCollisions = true;
            main.speed = 0.5;
            
            main.move = () => {
  
              let a = this.scene.getAnimationGroupByName("Idle");
              a.start(true, 1.0, a.from, a.to, false);
          
              let movementVector = new BABYLON.Vector3(0, 0, 0);
              if (this.tree){
                console.log(this.tree);
                console.log("tree pos :" + this.tree.position.x);
              }
              if (this.tree && main.intersectsMesh(this.tree, false)) {
                
                console.log("collision");
              }
              if (this.inputStates.up) {
                  console.log("in move function : up");
                  let a = this.scene.getAnimationGroupByName("Run");
                  a.start(false, 1.0, a.from, a.to, false);
                  movementVector.z -= 1;
                  this.inputStates.up = false;
              } 
              if (this.inputStates.down) {
                  console.log("in move function : down");
                  let a = this.scene.getAnimationGroupByName("Run");
                  a.start(false, 1.5, a.from, a.to, false);
                  movementVector.z += 1;
                  this.inputStates.down = false;
              }
              if (this.inputStates.left) {
                console.log(movementVector.x);
                  console.log("in move function : left");
                  let a = this.scene.getAnimationGroupByName("Run");
                  a.start(false, 1.5, a.from, a.to, false);
                  movementVector.x += 2;
                  this.inputStates.left = false;
                }
              if (this.inputStates.right) {
                  console.log("in move function : right");
                  let a = this.scene.getAnimationGroupByName("Run");
                  a.start(false, 2.0, a.from, a.to, false);
                  movementVector.x -= 2;
                  this.inputStates.right = false;
              }
              if (this.inputStates.space) {
                  console.log("in move function : space");
                  let a = this.scene.getAnimationGroupByName("Jump");
                  a.start(false, 1.0, a.from, a.to, false);
               
                  //movementVector.y += 1;
                  this.inputStates.space = false;
                  let idle = this.scene.getAnimationGroupByName("Idle");
                  idle.start(true, 1.0, idle.from, idle.to, false);
              }
          
              if (movementVector.length() !== 0) {
                  movementVector = movementVector.normalize().scale(main.speed);
                  let newPosition = main.position.add(movementVector);
                  if (newPosition.x > 4.5) {
                    newPosition.x = 4.5;
                } else if (newPosition.x < -4.5) {
                    newPosition.x = -4.5;
                }
                if (newPosition.z > 200) {
                    newPosition.z = 200;
                }
                else if (newPosition.z < -196) {
                  this.configuration.scenes[0].dispose();
                  soundLoader.StopSoundAction(soundLoader.levelOneMusic);
                  soundLoader.PlaySoundAction(soundLoader.gameWon);
                  this.configuration.createNewEngine(); 
                  this.scene.dispose();
                  soundLoader.PlaySoundAction(soundLoader.introMusic);
                  new IntroScene(this.configuration);

                }
                main.position = newPosition;
                main.moveWithCollisions(movementVector);
              } 

             
              else {
                  let a = this.scene.getAnimationGroupByName("Idle");
                  a.start(true, 1.0, a.from, a.to, false);
              }

          }
          
    return main;
            }
        else {
            return null;
        }
    }
    /**
     * charger le rendu de la scene
     */
    renderScene() {
        this.hero.move();
        this.scene.render();
    }

modifySettings() {
    this.scene.onPointerDown = () => {
        if (!this.scene.alreadyLocked) {
          console.log("requesting pointer lock");
          this.canvas.requestPointerLock();
        } else {
          console.log("Pointer already locked");
        }
      };
    
      document.addEventListener("pointerlockchange", () => {
        let element = document.pointerLockElement || null;
        if (element) {
          // lets create a custom attribute
          this.scene.alreadyLocked = true;
        } else {
          this.scene.alreadyLocked = false;
        }
      });
   
      this.inputStates.left = false;
      this.inputStates.right = false;
      this.inputStates.up = false;
      this.inputStates.down = false;
      this.inputStates.space = false;

    
      window.addEventListener(
        "keydown",
        (event) => {
          if (event.key === "ArrowLeft" || event.key === "q" || event.key === "Q") {
            this.inputStates.left = true;
          } else if (
            event.key === "ArrowUp" ||
            event.key === "z" ||
            event.key === "Z"
          ) {
            this.inputStates.up = true;
          } else if (
            event.key === "ArrowRight" ||
            event.key === "d" ||
            event.key === "D"
          ) {
            this.inputStates.right = true;
          } else if (
            event.key === "ArrowDown" ||
            event.key === "s" ||
            event.key === "S"
          ) {
            this.inputStates.down = true;
          } else if (event.key === " ") {
            this.inputStates.space = true;
          }
        },
        false
      );
}

}
export { LevelTwo};