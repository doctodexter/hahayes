let bubbles = [];
let canvas;
let space;
let imagex = 0;
let imagey = 0;
let speedx = 2;
let speedy = 2;
let dodoimg;
let angle = 0;
let dodosound;
let cross;
let musicnote;
let songisplaying = 0;
let backgroundsong;
function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}
function preload(){
    space = loadImage('assets/images/background.jpg');
    dodoimg = loadImage('assets/images/spacedodo.png');
    dodosound = loadSound('assets/sounds/dodoecho.wav');
    backgroundsong = loadSound('assets/sounds/backgroundsong.mp3');
    cross = loadImage('assets/images/cross.png');
    musicnote = loadImage('assets/images/musicnote.png');
}
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
canvas.style('z-index','-1');
 angleMode(DEGREES);
 backgroundsong.play();
 backgroundsong.setVolume(0.3);
setInterval(function(){
  backgroundsong.loop();
},2040000);
}

function mouseDragged() {
  let r = random(20, 40);
  let b = new Bubble(mouseX, mouseY, r);
  bubbles.push(b);
  fill(255,0,0);
  line(pmousX,pmouseY,mouseX,mouseY);
}

function draw() {
  background(space);
image(musicnote,1380,420,50,50);
if(songisplaying === 1){
          image(cross,1380,420,50,50);
}
  for (let bubble of bubbles) {
    bubble.move();
    bubble.show();
  }

  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
  }
  angle++ ;
  translate(imagex,imagey);
  rotate(angle);
  image(dodoimg,-20,-20,200,200);
  if(imagex >= 2200 || imagex < 0){
    speedx *= -1;
    dodosound.play();
    dodosound.setVolume(0.3);
  }
  if(imagey >= height || imagey < 0){
    speedy *= -1;
    dodosound.play();
    dodosound.setVolume(0.3);
  }
  imagex += speedx;
  imagey += speedy;
}
class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }

  show() {
    strokeWeight(3);
    stroke(random(255),random(255),random(255),80);
    noFill();
    ellipse(this.x, this.y, this.r * 2);
  }
}
function keyPressed(){
  if(keyCode === 77){
    if(backgroundsong.isPlaying()){
      backgroundsong.pause();
       songisplaying = 1;
      print("song muted");
    }else if (backgroundsong.isPaused()){
      backgroundsong.play();
      songisplaying = 0;
      print("song unmuted");
    }
  }
}
