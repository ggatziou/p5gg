var spr;
var bg;

let imgW = 2048;
let imgH = 1536;

var peppa;
var peppaImg;

function preload() {
  peppaImg = loadImage('peppa.png');
}

let spritePosX = 40;
function setup() {
    let myCanvas = createCanvas(imgW,imgH);
    //resizeCanvas(document.documentElement.clientWidth*80/100, document.documentElement.clientHeight*80/100);
    
    console.log("width: " + document.documentElement.clientWidth );
    
    let imgPosW = document.documentElement.clientWidth/2 - imgW/2;
    let imgPosH = document.documentElement.clientHeight/2 - imgH/2;


    myCanvas.position(imgPosW, imgPosH);

    bg = loadImage('peppa-background.jpg');

    
    spr = createSprite(width/2, height/2);
  spr.addImage(peppaImg);
    spr.scale = 0.2;
  
    
    spr.rotateToDirection = true;
  spr.maxSpeed = 2;
  spr.friction = 0.99;
}
//
//
//
function draw() {
  background(bg);
    
if (mouseIsPressed) {
    spr.attractionPoint(0.5, mouseX, mouseY);
  }
    
  drawSprites();
}



function keyPressed() {
    
    let sp=1;
  if (keyCode == RIGHT_ARROW) {
    spr.setSpeed(sp, 0);
  }
  else if (keyCode == DOWN_ARROW) {
    spr.setSpeed(sp, 90);
  }
  else if (keyCode == LEFT_ARROW) {
    spr.setSpeed(sp, 180);
  }
  else if (keyCode == UP_ARROW) {
    spr.setSpeed(sp, 270);
  }
  else if (key == ' ') {
    spr.setSpeed(0, 0);
  }
  return false;
}