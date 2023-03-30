let canvas;
let engine;
let scene;
let camera;

window.onload = startGame;

function startGame() {
    canvas = document.querySelector("#myCanvas");
    engine = new BABYLON.Engine(canvas, true);

    scene = createScene();

    let sphere = scene.getMeshByName("mySphere");

    // main animation loop 60 times/s
    engine.runRenderLoop(() => {
        scene.render();
        //sphere.position.x += 0.01;
       // sphere.position.y += 0.01;
    });
}

function createScene() {
    let scene = new BABYLON.Scene(engine);
    
    // background
    scene.clearColor = new BABYLON.Color3(0, 1, 0);
    // Create some objects 
    // params = number of horizontal "stripes", diameter...
 
    let ground = BABYLON.MeshBuilder.CreateGround("myGround", {width: 60, height: 60}, scene);
    //console.log(ground.name);

     camera = new BABYLON.FreeCamera("myCamera", new BABYLON.Vector3(0, 40, -30), scene);
   // This targets the camera to scene origin
   camera.setTarget(BABYLON.Vector3.Up());
   //camera.rotation.y = 0.3;


   
   

   camera.attachControl(canvas);
   
    let light = new BABYLON.HemisphericLight("myLight", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.3;
    // color of the light
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    return scene;
}

window.addEventListener("resize", () => {
    engine.resize()
})