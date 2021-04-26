//variable declaration
var bg, backgroundImg;
var iron_man, pc;
var ground, ground;
var brick, bimg,brickgroup;
var diamonds, digroup;
var diimg;
var sound;
var discore=0;
var spike,spikegroup;
var spikeimg;
var diesound;
var restart,restartImg;
var gameState="PLAY";

//preloading images and animations into the prog.
function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  pc=loadImage("images/iron.png");
  bimg=loadImage("images/stone.png");
  diimg=loadImage("images/diamond.png");
  sound=loadSound("sound/coinSound.mp3");
  spikeimg=loadImage("images/spikes.png");
  diesound=loadSound("sound/dieSound.mp3");
  restartImg=loadImage("images/restart.png");
 
}

function setup() {
//adding background
  createCanvas(1000, 600);
  bg = createSprite(500,300);
  bg.addImage(backgroundImg);
  bg.scale=2;
  bg.velocityY=3;

//adding playing charachter 
  iron_man = createSprite(200,200);
  iron_man.addImage(pc);
  iron_man.scale =0.2;

//creating sprite for restart
  restart=createSprite(500,300);
  restart.addImage(restartImg);
  restart.visible=false;
  

 //creating groups to store the obstacles 
  digroup=new Group();
  spikegroup=new Group();
  brickgroup=new Group();


}

function draw(){
if(gameState==="PLAY"){

bg.velocityY=4;

//adding controls to the game
 
  if(bg.y>500){
    bg.y=bg.width/4;
  }

  if (keyDown("space")){
    iron_man.velocityY=-6;
  }
  if(keyDown("right")){
    iron_man.x+=4;          
  }
  if(keyDown("left")){
    iron_man.x-=4;          
  }
  if (iron_man.x > 1000){
    iron_man.x=560;
  }
  if (iron_man.x< 0){
    iron_man.x=10;
  }
  if(iron_man.y>600){
    iron_man.y=590;
}
 if(iron_man.y<10){
   iron_man.y=10;
 }
 //adding gravity to iron man
 iron_man.velocityY=iron_man.velocityY+0.5;

//adding bricks to the program
 generatebrick()
  for(var i = 0 ; i< (brickgroup).length ;i++){
      var temp = (brickgroup).get(i) ;
      if (temp.isTouching(iron_man)) {
          iron_man.collide(temp);
     }
        
    }

//adding spikes to the program
  generate_spikes()
  for (i=0;i<(spikegroup).length;i++){
      var temp =(spikegroup).get(i)
      if(iron_man.isTouching(temp)){
         discore-=5;
         temp.destroy();
         temp=null;
    }
  }

//adding diamonds to the program
  generatediamonds()
  for(var i=0;i<(digroup).length;i++){
      var temp=(digroup).get(i)
      if(iron_man.isTouching(temp)){
         sound.play();
         discore++;
         temp.destroy();
         temp=null;
    }
  }
  if(brickgroup.isTouching(iron_man)){
    diesound.play();
    gameState="END";
  }

}
else if(gameState==="END"){
  bg.velocity=0;
  iron_man.velocityY=0;
  iron_man.velocityX=0;
  brickgroup.setVelocityYEach(0);
  spikegroup.setVelocityYEach(0);
  digroup.setVelocityYEach(0);
  brickgroup.setLifetimeEach(-1);
  digroup.setLifetimeEach(-1);
  spikegroup.setVelocityYEach(-1);
  restart.visible=true;
  if(mousePressedOver(restart)){
    restartGame(); 
   }
}

//adding text to the playing area  
    drawSprites();
    textSize(20);
    fill("white");
    text("COINS COLLECTED:"+discore,500,50);
   
}

//creating bricks for the programm
function generatebrick(){
  if(frameCount%70===0){
    brick=createSprite(1200,200,40,10);
    brick.x=random(0,1000);
    brick.y=0;

    brick.addImage(bimg);
    brick.scale=0.5;
    
    brick.velocityY=random(2,4);
    brick.lifetime =250;  //to save memmory space
    brickgroup.add(brick);
    
  }
}

//creating diamonds for the program
function generatediamonds(){
  if(frameCount%50===0){
    diamonds=createSprite(20,300,30,55);
    diamonds.addImage(diimg)
    diamonds.scale=0.5;
    diamonds.velocityY=random(2,4);
    diamonds.x=random(0,1000)
    diamonds.y=0;
    diamonds.lifetime =250;  //to save memmory space
    digroup.add(diamonds);

  }
}

//creating spikes for the program 
function generate_spikes(){
  if(frameCount%80===0){
    spike=createSprite(20,300,30,55);
    spike.addImage(spikeimg);
    spike.scale=0.7;
    spike.y=0
    spike.x=random(0,1000);
    spike.velocityY=4;
    spike.lifetime =250;  //to save memmory space
    spikegroup.add(spike);
  }
}

//restart 
function restartGame(){
  gameState="PLAY";
  spikegroup.destroyEach();
  digroup.destroyEach();
  brickgroup.destroyEach();
  restart.visible=false;
  discore=0;
}