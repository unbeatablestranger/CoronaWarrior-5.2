var bgImg, bg , girlImg, boyImg;
var gameState = 0;
var player, ground;
var boy, girl;
var mask, sanitizer, PPEKit, corona;
var sc1, sc3, sc5, rmvSC5, rmvSC5Img, sc1Img, sc3Img, sc5Img;
var maskImg, sanitizerImg, PPEKitImg, coronaImg;
var restart, restartImg;
var score = 15;
var maskGrp, saniGrp, kitGrp, coronaGrp;

var themeSong, goodSound, BadSound, YouWon, YouLost;

function preload()
{
  bgImg = loadImage("images/backgroundcorona.jpg");

  boyImg = loadImage("images/coronaBoy.png");
  girlImg = loadImage("images/coronaGirl.png");

  maskImg = loadImage("images/mask.png");
  sanitizerImg = loadImage("images/sanitizer.png");
  PPEKitImg = loadImage("images/ppe kit.png");
  coronaImg = loadImage("images/corona.png");

  sc1Img = loadImage("images/+1 img.png");
  sc3Img = loadImage("images/+3 img.png");
  sc5Img = loadImage("images/+5 img.png");
  rmvSC5Img = loadImage("images/-5 img.png");

  restartImg = loadImage("images/restart.png");

  themeSong = loadSound("sound/warriorTheme.mp3");
  goodSound = loadSound("sound/checkPoint.mp3");
  badSound = loadSound("sound/die.mp3");

  YouWon = loadSound("sound/YouWon.mp3");
  YouLost = loadSound("sound/YouLost.mp3");
  
}

function setup() 
{
  createCanvas(800,400);

  bg = createSprite(600, 200);
  bg.addImage("k", bgImg);
  bg.velocityX = -10;
  bg.scale = 2;

  player = createSprite(1000, 250);
  player.scale = 0.5;
  
  ground = createSprite(400, 380, 800, 20);

  boy = createSprite(200, 200);
  boy.addImage("k", boyImg);
  boy.scale = 0.5;

  girl = createSprite(600, 200);
  girl.addImage("j", girlImg);
  girl.scale = 0.5;

  restart = createSprite(1000, 300);
  restart.addImage("k", restartImg);
  restart.scale = 0.5;
  

  //declaring all the groups
  maskGrp = new Group();
  saniGrp = new Group();
  kitGrp = new Group();
  coronaGrp = new Group();

    
}


function draw() 
{
  
  background("Black");
  //displaying the sprites
  drawSprites();

  
  
  //this avoids the background to get out of the canvas
  if(bg.x<200)
  {
    bg.x = 600;
  }
 
  //when the game satrts the beginning screen will be shown
  if(gameState === 0)
  {
    
  
    
    
    fill("black");
    textSize(30);
    text("Let us start! Please choose a character to continue", 20, 50);
    text("Right Arrow", 550, 80);
    text("Left Arrow", 150, 80);
    
    //if left arrow key is pressed then the boy Image will be selected
    if(keyWentDown("left_arrow"))
    {
      player.addImage("k", boyImg);
      player.scale = 0.3;
      player.visibilty = "true";
      girl.destroy();
      boy.destroy();
      gameState = 1;
    }

    //if right arrow key is presses then the girl Image will be selected
    if(keyWentDown("right_arrow"))
    {
      player.addImage("j", girlImg);
      player.scale = 0.3;
      player.visibilty = "true";
      girl.destroy();
      boy.destroy();
      gameState = 1;
    }

    fill("red");
    text("Avoid touching the CoronaVirus! Press space to jump.", 50, 350);
    fill("blue");
    text("Get your score to 80 to win and avoid getting it to 0", 50, 380);

  }

  //when the game starts
  if(gameState === 1)
  {
    player.x = 100;
    
    player.scale = 0.3;    

    //calling the functions for mask, sanitizer, PPEKit and corona
    spawnMask();
    spawnSani();
    spawnKit();
    spawnCorona();

    //giving the player gravity
    player.velocityY = player.velocityY+0.8;
    player.collide(ground);

    
    
    //this will make the player jump only when it is touching the ground and not just float in the air
    if(player.y>250)
    {
      //making the player jump
      if(keyDown("space"))
      {
        player.velocityY = -15;
      }
    }

    //increasing the score when the player touches the sanitizer
    if(player.isTouching(maskGrp))
    {
      //if we do not destroy, then the mask will not vanish and may give the player some extra points
      maskGrp.destroyEach();
      score = score+3;
      sc3 =createSprite(player.x+100, player.y);
      sc3.addImage("k", sc3Img);
      sc3.lifetime = 10;
      goodSound.play();
    }

    //increasing the score when the player touches the sanitizer
    if(player.isTouching(saniGrp))
    {
      saniGrp.destroyEach();
      score = score+1;
      sc1 =createSprite(player.x+100, player.y);
      sc1.addImage("k", sc1Img);
      sc1.lifetime = 10;
      goodSound.play();
    }

    //increasing the score when the player touches the PPEKit
    if(player.isTouching(kitGrp))
    {
      kitGrp.destroyEach();
      score = score+5;
      sc5 =createSprite(player.x+100, player.y);
      sc5.addImage("k", sc5Img);
      sc5.lifetime = 10;
      goodSound.play();
    }

    //decreasing th escore when the player is in contact with Corona
    if(player.isTouching(coronaGrp))
    {
      coronaGrp.destroyEach();
      score = score-5;
      rmvSC5 = createSprite(player.x+100, player.y);
      rmvSC5.addImage("k", rmvSC5Img);
      rmvSC5.lifetime = 10;
      badSound.play();
    }

    //displaying the score
    textSize(30);
    fill("black");
    text("score->"+score, 50,50);

    //if the score reaches 100 then the player wins
    if(score>=80||score<=0)
    {
      gameState = 2;
    }

    
  }
    
  if(gameState === 2)
  {
    bg.velocityX = 0;
    player.velocityY = 0;
    restart.x = 400;
    restart.visibility = true;
    
    if(score>=80)
    {
      fill("green");
      textSize(40);
      text("You Won!", 300, 150);
    }

    if(score<=0)
    {
      fill("red");
      textSize(40);
      text("You Lost!", 300, 150);
    }

    

    if(mousePressedOver(restart))
    {
      gameState = 1;
      score = 15;
      bg.velocityX = -14;
      restart.x = 1000;
    }
  }

  
}

//everything has been added through functions so that each and every sprite will not need to be added manually
function spawnMask()
{
  if(frameCount%180 === 0)
  {
    mask = createSprite(820, random(50,150), 80, 80);
    mask.addImage("l", maskImg);
    mask.scale = 0.15;
    mask.velocityX = -14;
    mask.lifetime = 2500;
    //adding the mask sprite to the mask group
    maskGrp.add(mask);
  }
}

function spawnSani()
{
  if(frameCount%80 === 0)
  {
    sanitizer = createSprite(820, random(50,150), 80, 80);
    sanitizer.addImage("l", sanitizerImg);
    sanitizer.scale = 0.15;
    sanitizer.velocityX = -14;
    sanitizer.lifetime = 2500;
    //addding the sanetizer sprite to the sanitizer group
    saniGrp.add(sanitizer);
  }
}

function spawnKit()
{
  if(frameCount%300 === 0)
  {
    PPEKit = createSprite(820, random(50,150), 80, 80);
    PPEKit.addImage("l", PPEKitImg);
    PPEKit.scale = 0.2;
    //making the object move with respect to the score
    PPEKit.velocityX = -14;
    PPEKit.lifetime = 2500;
    //adding the PPE Kit sprite to the PPE Kit group
    kitGrp.add(PPEKit);
  }
}

function spawnCorona()
{
  if(frameCount%80 === 0)
  {
    corona = createSprite(820, 320, 80, 80);
    corona.addImage("k", coronaImg);
    corona.scale = 0.1;
    corona.velocityX = -14;
    corona.lifetime = 2500;
    //adding the corona Sprite to the corona group
    coronaGrp.add(corona);
  }

}
