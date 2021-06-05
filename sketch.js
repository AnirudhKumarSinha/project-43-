var backImage,backgr;
var player, player_running;
var ground,ground_img;
var foodGroup,obGroup;
var score;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.12;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  invisibleground=createSprite(450,370,800,10)
  invisibleground.visible=false;

  tap=createSprite(350,350,700,600)
  tap.visible=false;

  score=0;

  //making groups
  foodGroup=createGroup();
  obGroup=createGroup();
}

function draw() { 
  background(0);

  textSize(20)
  text("Score: "+score,700,50);

  //colliding the player
  player.velocityY=player.velocityY+1
  player.collide(invisibleground)

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  if(keyDown("space") && player.isTouching(ground) ) {
      player.velocityY = -20 ;
    }
  
  //using up arrow key
  if(keyDown("up") && player.isTouching(ground))
  {
    player.velocityY=-20
  }

  //by clicking
  if(mousePressedOver(tap) && player.isTouching(ground))
  {
       player.velocityY=-20;
  }

  if(foodGroup.isTouching(player))
  {
      foodGroup.destroyEach();
      score=score+2
      player.scale += +0.07;
  }
 

  if(obGroup.isTouching(player))
  {
    gameState=END
  }
    
   
  spawnstone();
  spawnfruit();
  drawSprites();
  }

  if(gameState===END)
  {
    backgr.velocityX=0
    player.visible=false

    foodGroup.destroyEach();
    obGroup.destroyEach();
    drawSprites();

    clear();
    textAlign(CENTER);
    fill("black")
    textSize(30);
    text("Game Over",350,220)

  }

  //drawSprites();

  fill("white")
  textSize(20)
  text("Score: "+score,700,50);
}

function spawnstone()
{
  if(frameCount%100===0)
    {
      stone=createSprite(850,350)
      stone.addAnimation("obstacle",obstacleImage)
      stone.velocityX=-(6+score*1.1)
      stone.lifetime=200
      stone.scale=0.15
      stone.debug=true;
      obGroup.add(stone);
    }
}

//creating fruits
function spawnfruit()
{
  if(frameCount%50===0)
    {
      banana=createSprite(850,515)
      banana.addAnimation("bananaImage",bananaImage)
      banana.velocityX=-(6+score*1.1)
      banana.lifetime=200
      banana.scale=0.1
      banana.y=Math.round(random(100,200))
      foodGroup.add(banana)
    }
}
