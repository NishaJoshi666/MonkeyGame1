var forest,backGround;
var monkey, monkey_running;
var ground;

var bananaGroup, bananaImage;
var obstaclesGroup, stone_img;

var gameOver;
var score=0;


function preload(){
  forest=loadImage("jungle.jpg");

  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  ston_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  backGround=createSprite(0,0,800,400);
  backGround.addImage(forest);
  backGround.scale=1.5;
  backGround.x=backGround.width/2;
  backGround.velocityX=-4;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backGround.x<100){
    backGround.x=backGround.width/2;
  }
  if(obstaclesGroup.isTouching(monkey)){
    monkey.velocityY = 0;
  }
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
    score = score + 2;
    }

    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
  

    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);
    spawnFood();
    spawnObstacles();
 
    //if(obstaclesGroup.isTouching(player)){ 
      //  player.scale=0.08;
     // score=score-2;
   //}
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  }

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(800,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 350;
    monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var stone = createSprite(800,350,10,40);
    stone.velocityX = -6;
    stone.addImage(ston_img);
    
    //assign scale and lifetime to the obstacle     
    stone.scale = 0.2;
    stone.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(stone);
  }
}