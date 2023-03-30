let engine; 
let scene; 
let menuScene; 
import MenuScene from "./src/scene/MenuScene.js";

let canvas = document.querySelector("#myCanvas");

function startGame() {
    engine = new Babylon.Engine(canvas, true);
    mesuScene = new MenuScene(null, engine, canvas); 
    modifySettings(); 
    

}

