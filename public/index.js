import {IntroScene} from './src/scene/IntroScene.js';
import {soundLoader} from './src/sounds.js';
import {GameState} from './src/utils.js';
import { Configuration } from "./configuration.js";

let scene; 
let engine;
let menuscene;
let inputStates = {};

let configuration;
function startGame(){
    let canvas = document.getElementById("myCanvas");  //  Get the canvas element
    // Get the dimensions of the browser window


    configuration = new Configuration(canvas);  //  configuration

 //   new IntroScene(configuration); 
    menuscene = new IntroScene(configuration);

    modifySettings();
  
    gameLoop();
    setTimeout(() => {
       
    },200);
}

function gameLoop() {
    GameState.state = GameState.introScene; 
    console.log("GAME STATE: " + GameState.state);
    engine.runRenderLoop(() => {
      
        switch(GameState.state) {
            case GameState.introScene:
                soundLoader.PlaySoundAction(soundLoader.introMusic);
                menuscene.mainMenu().then(() => {
                    console.log("INSIDE MAIN MENU");
                    scene.render();
                });
                break;

            case GameState.gameOver : 
                introScene.gameOverMenu.then(() => {
                    GameState.state = GameState.IntroScene;
                introScene.render();
                });
                break;
            case GameState.win :
                introScene.winMenu().then(() => {
                    GameState.state = GameState.IntroScene;
                    introScene.render();
                 }) 
                break;
            default : 
                break;
        }
    });
}


window.onload = startGame;

// Watch for browser/canvas resize events
window.addEventListener("resize", () => {
    configuration.engine.resize()
});

function heroMove() {
    if (inputStates.left) {
        console.log("left");
    }
    if (inputStates.right) {
        console.log("right");
    }
    if (inputStates.up) {
        console.log("up");
    }
    if (inputStates.down) {
        console.log("down");
    }
    if (inputStates.space) {
        console.log("space");
    }
}

function modifySettings() {
    inputStates.left = false;
    inputStates.right = false;
    inputStates.up = false;
    inputStates.down = false;
    inputStates.space = false;
    inputStates.spell1 = false;
    inputStates.spell2 = false;

    window.addEventListener('keydown', (event) => {
        if ((event.key === "q") || (event.key === "Q") || (event.key === "ArrowLeft")) {
            inputStates.left = true;
            console.log("LEFT");
        } else if ((event.key === "z") || (event.key === "Z")) {
            inputStates.up = true;
            console.log("UP");
        } else if ((event.key === "d") || (event.key === "D") || (event.key === "ArrowRight")) {
            inputStates.right = true;
            console.log("RIGHT");
        } else if ((event.key === "s") || (event.key === "S")) {
            inputStates.down = true;
            console.log("DOWN");
        } else if ((event.key === " ") || (event.key === "ArrowUp")) {
            inputStates.space = true;
            console.log("SPACE");
        } else if (event.key === "j" || (event.key === "J") || (event.key === "&") || (event.key === "Shift")) {
            inputStates.spell1 = true;
        } else if (event.key === "k" || (event.key === "K") || (event.key === "é") || (event.key === "Control")) {
            inputStates.spell2 = true;
        }
    }, false);

    window.addEventListener('keyup', (event) => {
        if ((event.key === "q") || (event.key === "Q") || (event.key === "ArrowLeft")) {
            inputStates.left = false;
        } else if ((event.key === "z") || (event.key === "Z")) {
            inputStates.up = false;
        } else if ((event.key === "d") || (event.key === "D") || (event.key === "ArrowRight")) {
            inputStates.right = false;
        } else if ((event.key === "s") || (event.key === "S")) {
            inputStates.down = false;
        } else if ((event.key === " ") || (event.key === "ArrowUp")) {
            inputStates.space = false;
        } else if (event.key === "j" || (event.key === "J") || (event.key === "&") || (event.key === "Shift")) {
            inputStates.spell1 = false;
        } else if (event.key === "k" || (event.key === "K") || (event.key === "é") || (event.key === "Control")) {
            inputStates.spell2 = false;
        }
    }, false);
}