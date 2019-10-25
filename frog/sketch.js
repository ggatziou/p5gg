var sprKormos;
var sprVelanidi;
var sprBomb;
var bg;


var taxyt = 3;

var starty=0;

let imgW = 1024;
let imgH = 768;
let kormosAboveGround = 200;

let kormosW = 1015;
let kormosH = 257;

//var peppa;
var kormosImg;
var velanidiImg;

const theseis = 5;

let initFrameCount = 0;

//var sprScale=0.2;
var sprScale = imgW / (kormosW * theseis);

var newKormosX = imgW/2 * sprScale;

/*projectile motion*/
var Vo = 10;
var f = 80;//degrees
var sec = 0;
var g = 9.81; // m/s
//var g = 1.625;

function preload() {
    kormosImg = loadImage('kormos.png');
    velanidiImg = loadImage('velanidi.png');
}

//let spritePosX = 40;
function setup() {
    let myCanvas = createCanvas(imgW,imgH);
    //resizeCanvas(document.documentElement.clientWidth*80/100, document.documentElement.clientHeight*80/100);
    
    let imgPosW = document.documentElement.clientWidth/2 - imgW/2;
    let imgPosH = document.documentElement.clientHeight/2 - imgH/2;

    myCanvas.position(imgPosW, imgPosH);

    bg = loadImage('peppa-background.jpg');

    
    sprKormos = createSprite(newKormosX, height - kormosAboveGround);
    sprVelanidi = createSprite(50, 100);
    
    
    sprBomb = createSprite(0, imgH, 40, 40);
    sprBomb.addImage(velanidiImg);
    sprBomb.scale = sprScale;
    
    
    sprKormos.addImage(kormosImg);
    sprKormos.drawR
    sprKormos.scale = sprScale;
    
    sprVelanidi.addImage(velanidiImg);
    sprVelanidi.scale = sprScale;

    sprVelanidi.setSpeed(taxyt, 90);
    
}


function draw() 
{
    background(bg);

    sprKormos.velocity.x = (newKormosX - sprKormos.position.x) * 0.2 /** taxyt*/;
        
    if(sprVelanidi.position.y>imgH)
    {
        sprVelanidi.position.x = getRandomX() + 50;
        sprVelanidi.position.y = 100;

    }
    else if(sprVelanidi.position.y<100)
    {

        sprVelanidi.velocity.y *= -1;

    }
    
    if(sprVelanidi.overlap(sprKormos))
    {
        sprVelanidi.setSpeed(taxyt, 270);
    }
    
    
    /*projectile motion*/
    var F = radians(f);//radians
    initFrameCount++;
    
    sec = initFrameCount/60;
    
    
    let actualX = Vo * cos(F) *  sec;
    let actualY = (Vo * sin(F) *  sec) - (1/2)* (g * (pow(sec,2))); // actual Y in m/s
    
    let screenRatio = imgW/imgH;
    let heightInMeters = 10;
    
    let newX = actualX * imgW/13.3333;
    let newY = imgH - (actualY * imgH/10);
    sprBomb.position.x = newX ;
    sprBomb.position.y = newY ;
    //console.log("newX: "+ newX);
    if(frameCount % 60 == 0)
    {    
//        console.log("sec: " + sec);
//        console.log("excelY: "+ actualY);
//        console.log("newY: "+ newY);
//        console.log("Vo * sin(F) *  sec: "+ Vo * sin(F) *  sec);
//        console.log(" (sec^2)): "+  (sec^2));
        console.log(" Vo: "+  Vo);
    }
    drawSprites();
}



function keyPressed() {
    
  let sp=2;
  if (keyCode == RIGHT_ARROW) {
      
      newKormosX += kormosW * sprScale;
//      spr.position.x= newKormosX;
  }
  else if (keyCode == LEFT_ARROW) {

       newKormosX -= kormosW * sprScale;
//      spr.position.x= newKormosX;
  }
  else if (key == ' ') {
    initFrameCount=0;
      if(f==80)
      {
          
          f = 45;//degrees
      }
      else
      {
         
          f = 80;//degrees
      }
      
      
  }
    else if (key == SPACE) {
    }
  
  
  return false;
}

function getRandomX()
{
    let x = Math.floor(Math.random() * theseis) + 1;
    //console.log(x);
    
    let visualKormosW = sprKormos.width;
    let misoVelanidi = sprVelanidi.width / 2;
    
    //console.log(sprVelanidi.width);

    return visualKormosW * x - (visualKormosW/2) - misoVelanidi ;
        
}