//fx
let rackSound;
let pointSound;
let ostSound;

//vars ball
let xb = 300;
let yb= 200;
let db = 17;
let r = db / 2;

//vars racket
let xr = 5;
let yr= 150;
let wr = 9;
let hr = 75;

//vars racket enemy
let xre = 585;
let yre= 150;
let wre = 9;
let hre = 75;
let velye;
let failchance = 5;

let colide = false;

//vars velocity
let velx = 7.5;
let vely = 7.5;

// vars points
let mypoints = 0;
let enemypoints = 0;


function setup() {
  createCanvas(600, 400);
  ostSound.loop();
}

function draw() {
  background(0);
  ball();
  racket(xr, yr);
  colisionLibRacket(xr, yr);
  //racket enemy
  racket(xre, yre);
  colisionLibRacket(xre, yre);
  moveSpeedBall();
  colisionBall();
  movesetRacket();
  movesetRacketEnemy();
  scoreboard();
  score();
  ballAdjust();
}

function ball(){
  circle(xb, yb, db);
}

function racket(x, y){
  rect(x, y, wr, hr);
}

function moveSpeedBall(){
  xb += velx;
  yb += vely;
}

function colisionBall(){
  if(xb + r > width || xb - r < 0){
    velx *= -1;
  } 
  
  if(yb + r > height || yb - r < 0){
    vely *= -1;
  } 
}

function movesetRacket(){
  if(keyIsDown(UP_ARROW)){
    if(RacketCanMoveUp()){
      yr -= 0;
    }
    else{
      yr -=8
    }
  }

  if(keyIsDown(DOWN_ARROW)){
    if (RacketCanMoveDown()){
      yr += 0;
    }
    else {
        yr += 8;
    }
  }
}

function movesetRacketEnemy(){
  velye = yb - yre - wr / 2 - 30;
  yre += velye + failchance;
  failChanceCalc();
}

// raw code of colision
function colisionRacket(){
  if(xb - r < xr + wr && yb - r < yr + hr && yb + r > yr){
    velx *= -1;
  }
}

// // library colision 
function colisionLibRacket(x, y){
  colide = collideRectCircle(x, y, wr, hr, xb, yb, r);
  if(colide){
    velx *= -1;
    rackSound.play();
  }
}

function failChanceCalc(){
  if(enemypoints >= mypoints){
    failchance += 1;
    if(failchance >= 39){
      failchance = 40;
    }
  } else {
    failchance -= 1;
    if(failchance <= 40){
      failchance = 37;
    }
  }
}

function scoreboard(){
  stroke(255);
  textAlign(CENTER);
  textSize(16)
  fill(0,191,255);
  rect(130, 10, 40, 20);
  fill(255);
  text(mypoints, 150, 26);
  fill(0,191,255);
  rect(430, 10, 40, 20);
  fill(255);
  text(enemypoints, 450, 26 )
}

function ballAdjust(){
    if (xb - r < 0){
    xb = 23;
    }
    if (xb + r > 600){
      xb = 580;
    }
}

function score(){
  if(xb > 593){
    mypoints += 1;
    pointSound.play();
  }

  if(xb < 7){
    enemypoints += 1;
    pointSound.play();
  }
}

function RacketCanMoveDown(){
  return yr > 326;
}

function RacketCanMoveUp(){
  return yr < 1;
}

function preload(){
  ostSound = loadSound("trilha.mp3");
  pointSound = loadSound("ponto.mp3");
  rackSound = loadSound("raquetada.mp3");
}
