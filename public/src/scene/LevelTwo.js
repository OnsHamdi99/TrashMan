import { soundLoader } from '../sounds.js';
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
    this.isGrassLoaded = false;
    this.isBushLoaded = false;
    this.isSardinaLoaded = false;
  }

  async configureAssetManager() {
    this.modifySettings();
    var instance = this;
    this.hero = await this.getHero();

    if (this.hero != null) {
      console.log(this.hero);
      this.camera = this.createFollowCamera(this.scene, this.hero);
      this.scene.activeCamera = this.camera;
      console.log(this.camera);
    }

    instance.creerElementsScene(); 

    instance.configuration.engine.runRenderLoop(function () { 
      instance.renderScene()
    });
  }

  creerElementsScene() {
    this.creerLumiere();
    this.greateGround();
    this.createObstacles();
    this.createPortal();
  }

  creerLumiere() {
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
    light.intensity = 0.7;
    
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000}, this.scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./assets/images/skybox/skybox", this.scene);
    skybox.material = skyboxMaterial;
  }

  createFollowCamera(scene, target) {
    let camera = new BABYLON.FollowCamera("heroFollowCamera", target.position, scene, target);
    camera.radius = 8; // how far from the object to follow
    camera.heightOffset = 3; // how high above the object to place the camera
    camera.rotationOffset = 180; // the viewing angle
    camera.cameraAcceleration = 1; // how fast to move
    camera.maxCameraSpeed = 1; // speed limit

    return camera;
  }

  greateGround() {
    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", this.scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("./assets/images/pavement3.jpg", this.scene);
    const groundWidth = 10;
    const groundLength = 400;
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: groundWidth, height: groundLength });
    ground.material = groundMaterial;
  }

  createPortal() {
    BABYLON.SceneLoader.ImportMesh("", "./assets/models/", "portalLevel1.glb", this.scene, (meshes) => {
      const portal = meshes[0];
      portal.scaling = new BABYLON.Vector3(0.03, 0.03, 0.03);
      portal.position = new BABYLON.Vector3(0, -1, -198);
      portal.name = "portal";
    });
  }

  createObstacles() {
    this.createTrees(2.5, 170, 0, 0.5);

    this.createTrees(2.9, -7, 0, 0.5);
    this.createTrees(2.9, 0, 0, 0.7);
    this.createTrees(0, 7, 0, 0.4);
    this.createTrees(2.9, 12, 0, 0.4);

    this.createTrees(-2.9, 93, 0, 0.5);
    this.createTrees(-2.9, 100, 0, 0.7);
    this.createTrees(0, 107, 0, 0.4);
    this.createTrees(-2.9, 112, 0, 0.4);
    
    this.createTrees(-2.9, -107, 0, 0.5);
    this.createTrees(-2.9, -100, 0, 0.7);
    this.createTrees(0, -93, 0, 0.4);
    this.createTrees(-2.9, -88, 0, 0.4);
    
    this.createtrash(2.8, -190, 0, 0.09);
    this.createtrash(2.8, 70, 0, 0.09);
    this.createtrash(2.8, 20, 0, 0.09);
    this.createtrash(0, -65, 0, 0.09);
    this.createtrash(0, -130, 0, 0.09);
    this.createtrash(0, 45, 0, 0.09);
    this.createtrash(-2.8, 80, 0, 0.09);
    this.createtrash(-2.8, -90, 0, 0.09);
    this.createtrash(-2.8, -160, 0, 0.09);

    this.createGrass(-2.9, 145, 0, 0.01);
    this.createGrass(2.9, 150, 0, 0.01);
    this.createBushes(-2.9, 145, 0.4, 0.01);
    this.createBushes(2.9, 150, 0.4, 0.01);

    this.createGrass(-2.9, 115, 0, 0.01);
    this.createGrass(2.9, 120, 0, 0.01);
    this.createBushes(-2.9, 115, 0.4, 0.01);
    this.createBushes(2.9, 120, 0.4, 0.01);

    this.createGrass(-2.9, 85, 0, 0.01);
    this.createGrass(-2.9, -30, 0, 0.01);
    this.createBushes(-2.9, 85, 0.4, 0.01);
    this.createBushes(-2.9, -30, 0.4, 0.01);

    this.createGrass(-2.9, 55, 0, 0.01);
    this.createGrass(2.9, 50, 0, 0.01);
    this.createBushes(-2.9, 55, 0.4, 0.01);
    this.createBushes(2.9, 50, 0.4, 0.01);

    this.createGrass(-2.9, -145, 0, 0.01);
    this.createGrass(2.9, -150, 0, 0.01);
    this.createBushes(-2.9, -145, 0.4, 0.01);
    this.createBushes(2.9, -150, 0.4, 0.01);

    this.createGrass(-2.9, -115, 0, 0.01);
    this.createGrass(2.9, -120, 0, 0.01);
    this.createBushes(-2.9, -115, 0.4, 0.01);
    this.createBushes(2.9, -120, 0.4, 0.01);

    this.createGrass(-2.9, -85, 0, 0.01);
    this.createBushes(-2.9, -85, 0.4, 0.01);

    this.createGrass(-2.9, -55, 0, 0.01);
    this.createGrass(2.9, -50, 0, 0.01);
    this.createBushes(-2.9, -55, 0.4, 0.01);
    this.createBushes(2.9, -50, 0.4, 0.01);
    
  }

  createTrees(x, y, z ,size) {
    BABYLON.SceneLoader.ImportMesh("", "./assets/models/", "tree.glb", this.scene, (meshes) => {
      let tree = meshes[0];
      tree.position.x = x;
      tree.position.z = y;
      tree.position.y = z;
      tree.scaling = new BABYLON.Vector3(size, size, size);
    });

    this.isTreeLoaded = true;
  }

  createtrash(x, y, z ,size) {
    BABYLON.SceneLoader.ImportMesh("", "./assets/trashItems/", "sardina_2022.glb", this.scene, (meshes) => {
      let sardina = meshes[0];
      sardina.position.x = x;
      sardina.position.z = y;
      sardina.position.y = z;
      sardina.scaling = new BABYLON.Vector3(size, size, size);
    });

    this.isSardinaLoaded = true;
  }
  
  createGrass(x, y, z ,size) {
    BABYLON.SceneLoader.ImportMesh("", "./assets/models/", "grass.glb", this.scene, (meshes) => {
      let grass = meshes[0];
      grass.position.x = x;
      grass.position.z = y;
      grass.position.y = z;
      grass.scaling = new BABYLON.Vector3(size, size, size);
    });

    this.isGrassLoaded = true;
  }

  createBushes(x, y, z ,size) {
    BABYLON.SceneLoader.ImportMesh("", "./assets/models/", "bush.glb", this.scene, (meshes) => {
      let bush = meshes[0];
      bush.position.x = x;
      bush.position.z = y;
      bush.position.y = z;
      bush.scaling = new BABYLON.Vector3(size, size, size);
    });

    this.isBushLoaded = true;
  }

  async getHero() {
    let hero = await BABYLON.SceneLoader.ImportMeshAsync("", "./assets/models/", "male.glb", this.scene);
    if (hero.meshes.length > 0) {
      let main = hero.meshes[0];
      main.position.x = 0;
      main.position.z = 200;
      main.position.y = 1.4;

      main.scaling = new BABYLON.Vector3(1.5, 1.5, 1.5);

      main.name = "heroMain";
      main.checkCollisions = true;
      main.speed = 0.17;

      let check = false;

      main.move = () => {

        let a = this.scene.getAnimationGroupByName("Idle");
        a.start(true, 1.0, a.from, a.to, false);

        let movementVector = new BABYLON.Vector3(0, 0, 0);
        if (this.tree) {
          console.log(this.tree);
          console.log("tree pos :" + this.tree.position.x);
        }
        if (this.tree && main.intersectsMesh(this.tree, false)) {

          console.log("collision");
        }
        if (this.inputStates.up) {
          check = true;
        }
        if (check) {
          console.log("in move function : up");
          let a = this.scene.getAnimationGroupByName("Run");
          a.start(false, 1.0, a.from, a.to, false);
          movementVector.z -= 0.1;
          //console.log(main.position.z);
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
export { LevelTwo };