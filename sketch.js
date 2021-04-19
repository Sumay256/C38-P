var spider,spider_run,spider_jump,spider_lose;
var city,cityImage;
var city2;
var Play=1,End=2;
var gameState=1;
var invisGround;
var rhino,rhinoImage,rhinoG;
var web,webG;
var enemy,enemyImage,enemyG;
var score=10;
var webAmount=5;
var life,webR,lifeImage,webRImage;
var lifeG,webRG;
function preload(){
// spider_stand=loadAnimation("Spidey sprite1(pre game).png");
 spider_running=loadAnimation("Spidey sprite2.png","Spidey sprite3.png","Spidey sprite4.png") ;
  spider_jump=loadAnimation("Spidey spritej1.png","Spidey spritej2.png","Spidey spritej3.png","Spidey spritej4.png");
  spider_lose=loadAnimation("Spidey spritej3.png")
  cityImage=loadImage("Back s.png");
  rhinoImage=loadImage("Rhino.png");
  enemyImage=loadImage("ENemy.png");
  lifeImage=loadImage("Extra life.png");
  webRImage=loadImage("Web reload.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight-150);
  city=createSprite(displayWidth/2,displayHeight/2.4,displayWidth,displayHeight);
  city.scale=4;
  city2=createSprite(displayWidth+1120,displayHeight/2.4,displayWidth,displayHeight);
  city2.scale=4;
  city.addImage(cityImage);
  city2.addImage(cityImage);
  city.velocityX=0;
  city2.velocityX=0;
  invisGround=createSprite(displayWidth/2,displayHeight-150,displayWidth,20);
  invisGround.visible = false;
  spider=createSprite(300,600,50,50);
  spider.scale=0.35;
   spider.addAnimation("run",spider_running);
  spider.addAnimation("jump",spider_jump);
  spider.addAnimation("lose",spider_lose)
  enemyG= new Group();
  webG= new Group();
  rhinoG= new Group();
  lifeG= new Group();
  webRG= new Group();
}

function draw() {
 background(80);
  textSize(15);
  fill("red");
  stroke("black")
  //camera.x=camera.x+2;
  if(gameState===1){
 //camera.position.x=spider.x;

 //camera.posrion.y=spider.y;
  city.velocityX=-3;
  city2.velocityX=-3;
  if(city.x<displayWidth-2500){
    city.x=displayWidth+1120;
  }
  if(city2.x<displayWidth-2500){
    city2.x=displayWidth+1120;
  }
    spider.collide(invisGround);
    if(keyDown("space")&&spider.y>=displayHeight-300){
      
      spider.velocityY=-15;
     
    }
    if(spider.y<displayHeight-270){
       spider.changeAnimation("jump",spider_jump);
      
    }
    else{spider.changeAnimation("run",spider_running)}
    spider.velocityY=spider.velocityY+0.5;
     if(score<=0){
   gameState=2;
   score=0;
 }
 
  
  if(frameCount%300===0){
  rhinof();
  }   
  if(mouseIsPressed&&frameCount%1.5===0&&webAmount>0){
  webf();
  webAmount=webAmount-1;  
  }
  if(frameCount%150===0){
    enemyf();
  }
  if(frameCount%400===0){
  lifef();
  }
  if(frameCount%250===0){
   webRf(); 
  }
  if(spider.isTouching(enemyG)){
    enemyG.destroyEach();
    score=score-1;
  }
  if(spider.isTouching(rhinoG)){
    score=score-5;
    rhinoG.destroyEach();
  }
  
 if(webG.isTouching(rhinoG)){
   webG.destroyEach();
 }
 if(webG.isTouching(enemyG)){
   webG.destroyEach();
    enemyG.destroyEach();
 } 
 if(spider.isTouching(lifeG)){
   lifeG.destroyEach();
   score=score+1;
 }
  if(spider.isTouching(webRG)){
    webRG.destroyEach();
    webAmount=webAmount+2;
  }
  }
  
 //spider.debug=true;
 spider.setCollider("rectangle",0,50,250,250);
  
  
  
  drawSprites();
 if(gameState===2){
   textSize(25);
   text("Game Over",displayWidth/2,displayHeight/2);
  
   city.velocityX=0;
   city2.velocityX=0;
   enemyG.setVelocityXEach(0);
   rhinoG.setVelocityXEach(0);
   lifeG.setVelocityXEach(0);
   webRG.setVelocityXEach(0);
   enemyG.setLifetimeEach(-1);
   rhinoG.setLifetimeEach(-1);
   lifeG.setLifetimeEach(-1);
   webRG.setLifetimeEach(-1);
   spider.velocityY=0;
   spider.changeAnimation("lose",spider_lose)
   
 }
 textSize(25);
  text("Lives: "+score,displayWidth-1300,30);
  text("Web Shooters: "+webAmount,displayWidth-400,30)
  text("(Right Click)",displayWidth-400,50)
 // console.log(spider.x,spider.y);
}
function rhinof(){
  rhino=createSprite(displayWidth,displayHeight-250,50,50);
  rhino.addImage(rhinoImage);
  rhino.scale=0.23
  rhino.velocityX=-13;
  rhino.lifetime=200;
  rhinoG.add(rhino);
  
}
function webf(){
  web=createSprite(spider.x,spider.y,12,8);
  web.shapeColor=160;
  web.velocityX=13;
  web.lifetime=100;
  webG.add(web);
}
function enemyf(){
  enemy=createSprite(displayWidth,displayHeight-205,50,50);
  enemy.addImage(enemyImage);
  enemy.scale=0.36;
  enemy.lifetime=270;
  enemy.velocityX=-9;
  enemyG.add(enemy);
   // enemy.debug=true;
  enemy.setCollider("rectangle",0,0,200,200)
}
function lifef(){
  life=createSprite(displayWidth,random(displayHeight-300,displayHeight-450),50,50);
  life.addImage(lifeImage);
  life.scale=0.055;
  life.velocityX=-6;
  life.lifetime=400;
  lifeG.add(life);
}
function webRf(){
  webR=createSprite(displayWidth,random(displayHeight-300,displayHeight-450),50,50);
  webR.addImage(webRImage);
  webR.scale=0.35;
  webR.lifetime=400;
  webR.velocityX=-6;
  webRG.add(webR);
}