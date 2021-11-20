// Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

var knife, fruit, monster, r, s, position, restart;
var knifeImage, monsterImage, restartImage;
var score;

function preload() {
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  monsterImage = loadImage("bomb.png");

  knifeImage = loadImage("knife.png");
  knifeSwooshSound = loadSound("knifeSwoosh.mp3");
  
  restartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 600);
  
  // creating sword
  knife = createSprite(40, 200, 20, 20);
  knife.addImage(knifeImage);
  knife.scale = 0.7;
  
  // creating restart button
  restart = createSprite(295, 250);
  restart.addImage(restartImage);
  restart.scale = 0.2;
  restart.visible = false;
  
  // set collider for sword
  knife.setCollider("rectangle", 0, 0, 40, 40);

  score = 0;
  // create fruit and monster Group variable here
  fruitGroup = new Group();
  monsterGroup = new Group();
}

function draw() {
  background("lightblue");
  
  if (gameState === PLAY) {
    // Call fruits and Monster function
    fruits();
    Monster();
    
    // Move knife with mouse
    knife.y = World.mouseY;
    
    if (fruitGroup.isTouching(knife)) {
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score = score + 2;
    }
    
    // Increase score if sword or knife touching fruit
    if (fruitGroup.isTouching(knife)) {
      fruitGroup.destroyEach();
    }
    
    // Go to end state if knife touching enemy
    if (monsterGroup.isTouching(knife)) {
      monsterGroup.destroyEach();
      gameState = END;
    } 
  }
  else if (gameState === END) {
    fill(0, 0, 0);
    textSize(25);
    text("GAME OVER", 215, 200);
    
    restart.visible = true;
    
    if(mousePressedOver(restart) || touches.length > 0) {
      reset();
      touches = [];
    }
  }
  drawSprites();
  
  // Display score
  fill(0, 0, 0);
  textSize(25);
  text("Score : " + score, 250, 50);
}

function fruits() {
  if (frameCount % 80 === 0) {
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
    // fruit.debug = true;
    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y = Math.round(random(50, 340));
    
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
  }
  
  position = Math.round(random(1, 2));
  
  // using a random variable, change the position of the fruit
  if (position == 1) {
    // fruit.x = 600;
  }
}

function Monster() {
  monster = createSprite(400, 200, 20, 20);
  monster.addImage(monsterImage);
  monster.scale = 0.06;
  // monster.debug = true;
  s = Math.round(random(1, 2));
  if (s == 1) {
    monster.visible = true;
  } else {
    monster.visible = false;
  }
  
  monster.y = Math.round(random(50, 340));
  
  monster.velocityX = -7;
  monster.setLifetime = 100;
  
  monsterGroup.add(monster);
  
  position = Math.round(random(1, 2));
  
  // using a random variable, change the position of the monster
  if (position == 1) {
    // monster.x = 600;
  }
}

function reset() {
  gameState = PLAY;
  restart.visible = false;
  
  score = 0;
  
}