var sprBomb;
var bg;

let imgW = 1024;
let imgH = 768;

let initFrameCount = 0;

var sprScale=0.2;

/*projectile motion*/
var Vo = 10;
var f = 80;//degrees
var sec = 0;
var g = 9.81; // m/s
//var g = 1.625;

function preload() {
    
    bg = loadImage('peppa-background.jpg');
}

//let spritePosX = 40;
function setup() {
    let myCanvas = createCanvas(imgW,imgH);
    //resizeCanvas(document.documentElement.clientWidth*80/100, document.documentElement.clientHeight*80/100);
    
    let imgPosW = document.documentElement.clientWidth/2 - imgW/2;
    let imgPosH = document.documentElement.clientHeight/2 - imgH/2;

    myCanvas.position(imgPosW, imgPosH);
    
    sprBomb = createSprite(0, imgH, 40, 40);
//    sprBomb.addImage(velanidiImg);
//    sprBomb.scale = sprScale;   
    
}


function draw() 
{
    background(0);

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

    if(frameCount % 60 == 0)
    {    
//        console.log("sec: " + sec);
//        console.log("excelY: "+ actualY);
//        console.log("newY: "+ newY);
//        console.log("Vo * sin(F) *  sec: "+ Vo * sin(F) *  sec);
//        console.log(" (sec^2)): "+  (sec^2));
//        console.log(" Vo: "+  Vo);
    }
    drawSprites();
}



function keyPressed() {
    
  let sp=2;
  if (key == ' ') {
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