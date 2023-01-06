//fx
let racksound;
let pointsound;
let ost;

//vars ball
let xb = 300;
let yb= 200;
let db = 50;
let r = db / 2;

//vars racket
let xr = 10;
let yr= 300;
let wr = 25;
let hr = 120;

//vars racket enemy
let xre = 1360;
let yre= 300;
let wre = 25;
let hre = 120;
let velye;
let failchance = 0;

let colide = false;

//vars velocity
let velx = 10;
let vely = 10;

// vars points
let mypoints = 0;
let enemypoints = 0;


function setup() {
  createCanvas(1399, 759);
  ost.loop();
}

function draw() {
  background(0);
  ball();
  racket(xr, yr);
  colision_lib_racket(xr, yr);
  //racket enemy
  racket(xre, yre);
  colision_lib_racket(xre, yre);
  move_speed_ball();
  colision_ball();
  moveset_racket();
  moveset_racket_playert();
  scoreboard();
  score();
  ball_adjust();
}

function ball(){
  circle(xb, yb, db);
}

function racket(x, y){
  rect(x, y, wr, hr);
}

function move_speed_ball(){
  xb += velx;
  yb += vely;
}

function colision_ball(){
  if(xb + r > width || xb - r < 0){
    velx *= -1;
  } 
  
  if(yb + r > height || yb - r < 0){
    vely *= -1;
  } 
}

function moveset_racket(){
  if(keyIsDown(UP_ARROW)){
    yr += -8;
  }

  if(keyIsDown(DOWN_ARROW)){
    yr += 8;
  }
}

function ball_adjust(){
  if (xb - r < 0){
  xb = 23;
  }
}

// function moveset_racket_enemy(){
//   velye = yb - yre - wr / 2 - 20;
//   yre += velye + failchance;
//   fail_chance_calc();
// }

function moveset_racket_playert(){

  if(keyIsDown(87)){
    yre += -8;
  }

  if(keyIsDown(83)){
    yre += 8;
  }
}

// raw code of colision
function colision_racket(){
  if(xb - r < xr + wr && yb - r < yr + hr && yb + r > yr){
    velx *= -1;
  }
}

// library colision 
function colision_lib_racket(x, y){
  colide = collideRectCircle(x, y, wr, hr, xb, yb, r);
  if(colide){
    velx *= -1;
    racksound.play();
  }
}

function scoreboard(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(0,191,255);
  rect(230, 10, 40, 20);
  fill(255);
  text(mypoints, 250, 26);
  fill(0,191,255);
  rect(1180, 10, 40, 20);
  fill(255);
  text(enemypoints, 1200, 26);
}

function score(){
  if(xb > 1380){
    mypoints += 1;
    pointsound.play();
  }

  if(xb < 10){
    enemypoints += 1;
    pointsound.play();
  }
}

function preload(){
  ost = loadSound("fx/trilha.mp3");
  pointsound = loadSound("fx/ponto.mp3");
  racksound = loadSound("fx/raquetada.mp3");
}