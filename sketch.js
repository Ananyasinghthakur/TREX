//MAKING VARIABLE  :)

var trex ,trex_running;
var ground ;
var groundimg ;
var ghostgrnd ;
var cloudImg ;
var cac ;
var  c1;
var c2;
var c3;
var c4 ;
var c5;
var c6;
var score = 0 ;
var GAMESTATE ="play";
var CACTUSGROUP ;
var CLOUDYGRP ; 
var RESTART ;
var NEWGAME ;
var R ;
var game;
var trexrip ;
var G ;
var jump;
var die;
var check

//NEW FUNCTION

function preload(){

//LOADING THE IMAGES 1

trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
groundimg = loadImage("ground2.png");
cloudImg = loadImage("cloud.png");
c1 = loadImage("obstacle1.png");
c2 = loadImage("obstacle2.png");
c3 = loadImage("obstacle3.png");
c4= loadImage("obstacle4.png");
c5 = loadImage("obstacle5.png");
c6= loadImage("obstacle6.png");
R = loadImage("restart.png");
G = loadImage("gameOver.png")
trexrip = loadImage("trex_collided.png");
jump=loadSound("jump.mp3");
die=loadSound("die.mp3");
check=loadSound("checkPoint.mp3");

} 

//NEW FUNCTION 2 

function setup(){
RESTART=createSprite(300,100,20,20);
RESTART.addImage("play it again",R);
RESTART.scale=0.5;
game = createSprite(300,88,20,20);
game.addImage("newgame",G)

// MAKING A NEW GROUP
 
CACTUSGROUP= new Group () ;
CLOUDYGRP= new Group ();
//CREATING THE CANVAS 
createCanvas(600,200);

//SPRITES AND THEIR LOCATIONS,

trex=createSprite(50,100,20,20);  
trex.addAnimation("TREX",trex_running);
trex.scale=0.5;
trex.addAnimation("newTrex",trexrip);
ground=createSprite(300,180,600,15);
ground.addImage("ground1",groundimg);
ghostgrnd=createSprite(300,190,600,0.1);
RESTART.visible=false;
game.visible=false;
}
 
//new function 

function draw(){
console.log(getFrameRate());
background(200,200,200);
text("Score="+score,535,50);
trex.collide(ghostgrnd);

//games state (PLAY AND END) 

if(GAMESTATE==="play"){
if(touches.length>0||keyDown("space") && trex.isTouching(ground)){
trex.velocityY= -6;
jump.play(); 
touches= [] ;
} 
trex.velocityY = trex.velocityY + 0.5 ;
ground.velocityX=-3;
score=score+Math.round(getFrameRate()/60);                                                                          
clouds();
cactus();

if(ground.x<0){ 
ground.x=ground.width/2; 
}
if(trex.isTouching(CACTUSGROUP)){
GAMESTATE="end";
die.play();
}
if(score%100===0 && score>0) {
check.play();
}
}
else 
{
ground.velocityX=0;
CACTUSGROUP.setVelocityXEach(0);
CLOUDYGRP.setVelocityXEach(0);
game.visible=true;
RESTART.visible=true;
trex.velocityY=0;
CACTUSGROUP.setLifetimeEach(-300);
CLOUDYGRP.setLifetimeEach(-200);
trex.changeAnimation("newTrex",trexrip);

if(mousePressedOver(RESTART)){
GAMESTATE="play" 
CACTUSGROUP.destroyEach();
CLOUDYGRP.destroyEach();
RESTART.visible=false;
game.visible=false;
trex.changeAnimation("TREX",trex_running);
score = 0 ;
}
}
drawSprites();
}
function clouds(){
if(frameCount%70 === 0){
var cloud = createSprite(600,60,10,10);
cloud.velocityX= -3;
cloud.y = Math.round(random(80,120));
cloud.addImage("omsairam",cloudImg);
trex.depth=cloud.depth;
trex.depth=trex.depth+1;
cloud.lifetime=220;                 
CLOUDYGRP.add(cloud);
}
}
 //new function 
function cactus(){
if(frameCount%70===0){
var cac = createSprite(600,170,20,20);
cac.velocityX= -2;
var r = Math.round(random(1,6));
cac.scale= 0.5;
switch( r )
{
case 1 : cac.addImage("cactus1",c1);
break
case 2 : cac.addImage("cactus2",c2);
break
case 3 : cac.addImage("cactus3",c3);
break
case 4 : cac.addImage("cactus4",c4);
break                   
case 5 : cac.addImage("cactus5",c5);
break 
case 6 : cac.addImage("cactus6",c6);
break
}
cac.lifetime=300;
CACTUSGROUP.add(cac);
}
}
 
//frameCount counts totals the number of trees 
// frameRate => no. of frames per second  