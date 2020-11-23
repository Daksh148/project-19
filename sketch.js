var gamestate,play,end,back,platform,jungle,monkeyani,banaimg,stoneimg,obs,band,score,monkey,banana;
function preload(){
  jungle=loadImage("sprites/jungle.jpg");
  monkeyani=loadImage("sprites/Monkey_01.png","sprites/Monkey_02.png","sprites/Monkey_03.png","sprites/Monkey_04.png","sprites/Monkey_05.png","sprites/Monkey_06.png","sprites/Monkey_07.png");
  bananaimg=loadImage("sprites/banana.png");
  stoneimg=loadImage("sprites/stone.png");
}


function setup() {
  createCanvas(400, 400);
   play=1;
 end=0;
 gamestate=play;



   back=createSprite(200,200);
back.addImage(jungle);
back.x=back.width/2;

 platform=createSprite(200,380,400,20);
platform.visible=0;
 monkey=createSprite(75,350);
monkey.addImage(monkeyani);
monkey.scale=0.1;

 obs=createGroup();
 band=createGroup();
 score=0;


fill("black");
textSize(20);
}

function draw() {
  
  if (gamestate===play){
   back.velocityX=-2;
   if (back.x<0){
     back.x=back.width/2;
   }
   score=score+ Math.round(World.frameRate/61);
   if (keyDown("a")&&monkey.y>300){
     monkey.velocityY=-12;
   }
   monkey.velocityY=monkey.velocityY+0.8;
   obstacles();
   bananas();
   if(monkey.isTouching(band)){
     score=score+2;
     band.destroyEach();
     
   }
   if (monkey.isTouching(obs)){
     gamestate=end;
     
   }
 } 
 else if(gamestate===end){
  
  band.setVelocityXEach(0);
  obs.setVelocityXEach(0);
  back.velocityX=0;
  monkey.velocityY=1;
   text("GAMME OVER",150,200)
 }
 if (keyDown("r")){
   reset();
 }
 monkey.collide(platform);
  drawSprites(); 
  text("Score: "+score,160,50);
  text("Press 'r' to restart",140,100);
  text("Press 'a' to jump",140,75);
  if(score>=10){
    monkey.scale=0.11;
  }
  else if(score>=20){
    monkey.scale=0.12;
  }
  else if(score>=30){
    monkey.scale=0.13;
  }
  else if(score>=40){
    monkey.scale=0.14;
  }
}

function obstacles(){
  if (World.frameCount%80===0){
  var stone=createSprite(400,360);
  stone.addImage(stoneimg);
  stone.scale=0.2;
  stone.setCollider("circle",0,0,200);
  stone .velocityX=-8;
  if (stone.x<0){
    stone.destroy();
  }
  obs.add(stone);
 
}

}
  function bananas(){
    if (World.frameCount%195 ===0){
      banana=createSprite(400,random(240,300));
     banana.addImage(bananaimg);
     banana.velocityX=-10;
     banana.scale=0.05;
    if (banana.x<0){
      banana.destroy();
    }
     band.add(banana);
    }
    
  }
  function reset(){
    gamestate=play;
    band.destroyEach();
    obs.destroyEach();
    score=0;
    monkey.scale=0.1;
    
  }
