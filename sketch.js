var invisibleground
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground ;
var obi,fii
var obstaclesGroup;
var score;
var monkeyi
PLAY=1
END=0
var gameState=PLAY
function preload(){
 fii=loadImage("banana.png") 
  obi=loadImage("obstacle.png")
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeyi=loadImage("sprite_0.png")
 groundImage=loadImage("ground.jpg") 
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
 monkey=createSprite(50,340,20,20) 
monkey.addAnimation("runnning",monkey_running)
   monkey.addAnimation("run",monkeyi)
  monkey.scale=0.15
    
    
    
 
  obstacleGroup=new Group();
  FoodGroup=new Group();
  ground=createSprite(200,390,800,10)
  ground.velocityX=-7;
  ground.x=ground.width/2
score=0
  monkey.setCollider("circle", 0 ,0,300)
 //monkey.debug=true
  invisibleground=createSprite(300,400,600,10)
  invisibleground.visible=false
}


function draw() {
background(220)
 // console.log(monkey.y)
  if(gameState===PLAY){
    if(ground.x<0){
    ground.x=ground.width/2
  }
  if(keyDown("space")&&monkey.y>340){
    monkey.velocityY=-15
  } 
     monkey.velocityY= monkey.velocityY+0.5
     score=score+Math.round(random((getFrameRate()/50)))
    obstacles()
  food()
    if(obstacleGroup.isTouching(monkey)){
      gameState=END
    }
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach()
    }
  }else
    if(gameState===END){
      ground.velocityX=0;
          obstacleGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
       monkey.velocityY=0
      monkey.changeAnimation("run",monkeyi)
       text("Press  R To Restart ",200,200)
      if(keyDown("r")){
       obstacleGroup.destroyEach();
      FoodGroup.destroyEach();
        gameState=PLAY
        score=0
         monkey.changeAnimation("runnning",monkey_running)
      }
    }
  monkey.collide(invisibleground)
 
  text("score:"+score,340,50)
 
 
  
  drawSprites()
}
function  obstacles(){
  if(frameCount%300===0){
    var ob=createSprite(400,365,20,20)
    ob.velocityX=-(5+score/60)
    ob.addImage(obi)
    ob.scale=0.2
    obstacleGroup.add(ob)
    ob.lifetime=80
    ob.setCollider("circle",0,0,200)
     //ob.debug=true
  }
}
function food(){
  if(frameCount%80===0){
    var fi =createSprite(350,Math.round(random(120,200)),20,20)
    fi.velocityX=-(5+score/50)
    FoodGroup.add(fi)
    fi.addImage(fii)
    fi.scale=0.1
    fi.lifetime=80
  }
  
}



