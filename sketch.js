var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var ground;
var foodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;
var score = 0;
var gameState = "play";
var monkeyCollided;
function preload() {
  monkey_running = loadAnimation(
    "sprite_0.png",
    "sprite_1.png",
    "sprite_2.png",
    "sprite_3.png",
    "sprite_4.png",
    "sprite_5.png",
    "sprite_6.png",
    "sprite_7.png",
    "sprite_8.png"
  );

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
monkeyCollided = loadAnimation("monkeysitting.png")
}

function setup() {
  createCanvas(500, 350);
  //create monkey sprite and its properties
  monkey = createSprite(50, 190, 10, 40);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided", monkeyCollided);
  monkey.scale = 0.1;

  //ground
  ground = createSprite(50, 290, 1000, 10);
  foodGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw() {
  background("lightgreen");

  monkey.collide(ground);
  if (gameState == "play") {
    monkey.changeAnimation("running", monkey_running);
    if (keyDown("space") && monkey.y >= 161.5) {
      monkey.velocityY = -10;
    }
    monkey.velocityY = monkey.velocityY + 0.5;
    FoodGroup();
    generateObstacles();
    survivalTime = Math.ceil(frameCount / frameRate());
    if (monkey.isTouching(foodGroup)) {
      score = score + 1;
      foodGroup.destroyEach();
    }
    if (monkey.isTouching(obstacleGroup)) {
      gameState = "end";
    }
  }
  if (gameState == "end") {
    monkey.changeAnimation("collided", monkeyCollided);
    monkey.scale = 0.5
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
  }

  stroke("black");
  textSize(20);
  fill("black");
  text("Score: " + score, 400, 50);

  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time = " + survivalTime, 170, 50);
  drawSprites();
}
function FoodGroup() {
  if (frameCount % 60 === 0) {
    //creating cloud sprite and properties
    banana = createSprite(400, 100, 10, 40);
    banana.scale = 0.1;
    banana.addImage("banana", bananaImage);
    banana.velocityX = -4;
    banana.y = Math.round(random(30, 120));
    foodGroup.add(banana);
  }
}
function generateObstacles() {
  if (frameCount % 130 === 0) {
    obstacle = createSprite(470, 250, 50, 50);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -2;
    obstacleGroup.add(obstacle);
  }
}
