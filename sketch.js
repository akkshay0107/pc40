var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var runners, runner1, runner2, runner3, runner4;
var track,runner1Img,runner2Img,runner3Img,runner4Img,groundImg;


/*function preload(){
   runner1Img = loadImage("images/runner1.png");
   runner2Img = loadImage("images/runner2.png");
   runner3Img = loadImage("images/runner3.png");
   runner4Img = loadImage("images/runner4.png");
   groundImg = loadImage("images/ground.png");
   track = loadImage("images/track.jpg");
}*/

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-60);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
    game.spawnObstacles();
  }else if(gameState === 2){
    game.end();
  }
}
