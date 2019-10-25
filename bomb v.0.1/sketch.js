var sprBomb;
var bombSize = 40;

var sprEnemy;
var enemySize = 50;
var bg;

let soundFire;
let soundExplosion;
var score = 0;

let imgW = 1024;
let imgH = 768;

let initFrameCount = 0;

var sprScale=0.2;

/*projectile motion*/
var Vo = 0;
var f = 45;//degrees
var sec = 0;
var g = 9.81; // m/s
//var g = 1.625;



function preload() {
    
    bg = loadImage('peppa-background.jpg');
    soundFire = loadSound('assets/sounds/laser5.wav');
    soundExplosion = loadSound('assets/sounds/8bit_bomb_explosion.wav');
}

//let spritePosX = 40;
function setup() {
    
    let per = 90;
    imgW = imgW * per/100;
    imgH = imgH * per/100;
    
    let myCanvas = createCanvas(imgW,imgH);
//    resizeCanvas(width, height);
    
    let imgPosW = document.documentElement.clientWidth/2 - imgW/2;
    let imgPosH = document.documentElement.clientHeight/2 - imgH/2;

    myCanvas.position(imgPosW, imgPosH);
    
    sprBomb = createSprite(0, imgH-100, bombSize, bombSize);
    sprBomb.shapeColor = color(255);
    sprBomb.rotateToDirection = true;
    
    sprEnemy = createSprite(enemySize/2 +500, imgH-(enemySize/2), enemySize, enemySize);
    sprEnemy.shapeColor = color(255,100,100);
    
    
}


function draw() 
{
    background(0);
    
    fill(255, 255, 255);
    let tSize = imgW *3/100;
    textSize(tSize);
    text('Ταχύτητα (m/s):'+ Vo, 10, 30);
    text('Γωνία εκτόξευσης:'+ f, 10, 80);
    
    text('Σκορ:'+ score, imgW - tSize*4, 30);

    /*projectile motion*/
    var F = radians(f);//radians
    initFrameCount++;
    
    sec = initFrameCount/60;
    
    
    let actualX = Vo * cos(F) *  sec;
    let actualY = (Vo * sin(F) *  sec) - (1/2)* (g * (pow(sec,2))); // actual Y in m/s
    
    let screenRatio = imgW/imgH;
    let heightInMeters = 10;
    
    let newX = actualX * imgW/(screenRatio * heightInMeters) + (bombSize/2);
    let newY = imgH - (actualY * imgH/heightInMeters) - (bombSize/2);
    
    let oldX = sprBomb.position.x;
    let oldY = sprBomb.position.y;
    
    sprBomb.position.x = newX ;
    sprBomb.position.y = int(newY)+1 ;
    
    if (sprBomb.position.y >= height ) {
   
        console.log("bomb y: " + oldY);
        
        sprBomb.position.x = oldX;
        sprBomb.position.y = imgH -(bombSize/2) ;
        
  }
    
    
    if(sprBomb.overlap(sprEnemy))
    {
        soundExplosion.play();
        score ++;
        let enemyX = sprEnemy.position.x;
        sprEnemy.remove();
        
        let newEnemyX = enemySize/2 +getRandomX(enemyX)
        while(newEnemyX >imgW || newEnemyX <0)
        {
            newEnemyX = enemySize/2 +getRandomX(enemyX);
        }
        
        sprEnemy = createSprite(newEnemyX , imgH-(enemySize/2), enemySize, enemySize);
        sprEnemy.shapeColor = color(255,100,100);
        
        
    }
    

    if(frameCount % 60 == 0)
    {    
//        
        
        
//        console.log("excelY: "+ actualY);
//        console.log("newY: "+ newY);
//        console.log("Vo * sin(F) *  sec: "+ Vo * sin(F) *  sec);
//        console.log(" (sec^2)): "+  (sec^2));
//        console.log(" Vo: "+  Vo);
    }
    drawSprites();
}



function keyPressed() {
    
    if (keyCode == RIGHT_ARROW) {
      Vo++;
        if(Vo==21)
            Vo=20;
    }
    else if (keyCode == LEFT_ARROW) {
      Vo--;
        if(Vo==0)
            Vo=1;
    }
    else if (keyCode == UP_ARROW) {
      f++;
        if(f==91)
            f=90;
    }
    else if (keyCode == DOWN_ARROW) {
      f--;
        if(f==-1)
            f=0;
    }    
    else if (key == ' ') {
        initFrameCount=0;
        soundFire.play();
          
  }
    else if (key == SPACE) {
    }
  
  
  return false;
}

function getRandomX(oldX)
{
    let coin = Math.floor(Math.random() * 2);
    let proshmo = 1;
    
    if(coin==0)
    {
        proshmo = -1;
    }
    else
        proshmo=1;
    
    return oldX +(proshmo * 150);
        
}
