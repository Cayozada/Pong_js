//fx
let racksound;
let pointsound;
let ost;

//vars ball
let xb = 300;
let yb= 200;
let db = 25;
let r = db / 2;

//vars racket
let xr = 7;
let yr= 150;
let wr = 15;
let hr = 110;

//vars racket enemy
let xre = 575;
let yre= 150;
let wre = 15;
let hre = 110;
let velye;
let failchance = 0;

let colide = false;

//vars velocity
let velx = 8;
let vely = 8;

// vars points
let mypoints = 0;
let enemypoints = 0;


function setup() {
  createCanvas(600, 400);
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
  moveset_racket_enemy();
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

function moveset_racket_enemy(){
  velye = yb - yre - wr / 2 - 25;
  yre += velye + failchance;
  fail_chance_calc();
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

function fail_chance_calc(){
  if(enemypoints >= mypoints){
    failchance += 1;
    if(failchance >= 39){
      failchance = 40;
    }
  } else {
    failchance -= 1;
    if(failchance <= 35){
      failchance = 35;
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

function ball_adjust(){
    if (xb - r < 0){
    xb = 23;
    }
}

function score(){
  if(xb > 587){
    mypoints += 1;
    pointsound.play();
  }

  if(xb < 13){
    enemypoints += 1;
    pointsound.play();
  }
}

function preload(){
  ost = loadSound("fx/trilha.mp3");
  pointsound = loadSound("fx/ponto.mp3");
  racksound = loadSound("fx/raquetada.mp3");
}