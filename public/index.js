import introScene from './src/scene/IntroScene.js';
import {soundLoader} from './src/sounds.js';
import {GameState} from './src/utils.js';
let scene; 
let engine;
var buttons = document.querySelectorAll('button');

let canvas = document.getElementById("#myCanvas");
function startGame(){
    engine = new BABYLON.Engine(canvas, true);
    introScene = new IntroScene(null,engine, canvas);
    modifySettings();
    gameLoop();
    setTimeout(() => {
        if (!soundLoader.currentMusic) {
            soundLoader.PlaySoundAction(soundLoader.introMusic);
            soundLoader.currentMusic = soundLoader.introMusic;
        }
    },200);
}

function gameLoop() {
    engine.runRenderLoop(() => {
        switch(GameState.state) {
            case GameState.IntroScene:
                introScene.mainMenu.then(() => {
                    introScene.render();
                });
                GameState.state= GameState.levelsMenu;
                break;
            case GameState.levelsMenu:
                introScene.render(); 
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

function modifySettings() {
    window.addEventListener("resize", () => {
        engine.resize();
    });
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            soundLoader.PlaySoundAction(soundLoader.buttonClick);
        });
    }
}

window.onload = () => {

    startGame();
}