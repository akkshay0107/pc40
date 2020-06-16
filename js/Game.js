class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
      var obstaclesGroup = new Group();
    }

    runner1 = createSprite(50,displayHeight/2+30,40,100);
    runner2 = createSprite(50,displayHeight/2+30,40,100);
    runner3 = createSprite(50,displayHeight/2+30,40,100);
    runner4 = createSprite(50,displayHeight/2+30,40,100);
    /*runner1.addImage("runner1",runner1Img);
    runner2.addImage("runner2",runner2Img);
    runner3.addImage("runner3",runner3Img);
    runner4.addImage("runner4",runner4Img);*/
    runners = [runner1, runner2, runner3, runner4];
  }

  play(){
    form.hide();
    Player.getPlayerInfo();
    if(allPlayers !== undefined){
      background(9, 168, 242);
      var ground = createSprite(3860,displayHeight+70,7720,displayHeight/2);
      ground.debug = true;
      //image(track,0,-displayHeight*4,displayWidth,displayHeight*5)
      //index of the array
      var index = 0;
      this.spawnObstacles();
      //x and y position of the runners
      var x;
      var y = height-100;
      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
        x = displayWidth + allPlayers[plr].distance;
        runners[index-1].x = x;
        runners[index-1].y = y;
        runners[index-1].y += 20;
        runners[index-1].collide(ground);
        

        if (index === player.index){
          runners[index - 1].shapeColor = "red";
          camera.position.y = displayHeight/2;
          camera.position.x = runners[index-1].x + 500;
          if(runners[index-1].y>585){
          if(keyIsDown(UP_ARROW) && player.index !== null){
            runners[index - 1].y += -10;
            player.update();
          }
          console.log(runners[index-1].y)
         }
      }
    }

    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance += 30;
      player.update();
    }
    
    if(player.distance>3860){
      gameState = 2;
    }

    drawSprites();
  }
  end(){
    console.log("GAME OVER!");
    game.update(2);
  }
 spawnObstacles(){
    for(var i=0;i<6;i++){
    if (frameCount % 60 === 0) {
      var obstacle = createSprite(800*(i+1),displayHeight/2+250, 10, 40);
      obstacle.velocityX = 0;
      obstacle.shapeColor = "orange";
      obstaclesGroup.add(obstacle);
      //obstacle.debug = true;   
    }
  }
   /* for(var plr in allPlayers){
      var index = index+1;
    if(runners[index-1].isTouching(obstaclesGroup)){
       runners[index-1].velocityX = 0;
    }
  }*/
  }
}