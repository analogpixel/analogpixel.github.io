var marios = new Array();
var b = {x: 0, y: 0, mario: 0, r:0, a:255};
var tl = new TimelineLite({onComplete:function() { this.restart()}});
var block;
var mySound;

function preload() {
  marios.push( loadImage("./data/marioAlive.png"));
  marios.push( loadImage("./data/marioDead.png"));
  block = loadImage("./data/marioBlock.png");
  soundFormats('mp3', 'ogg');
  mySound = loadSound('./data/nintendoDeathAnimation.mp3');
}

function setup() {
  createCanvas(400,400);

  marios[0].resize(90,90);
  marios[1].resize(90,90);
  block.resize(50,50);

  tl.to(b, .5, {y:-200})
  .to(b, 0, {mario:1})
  .to(b, .5, {y: 0})
  .to(b, .2,  {r: 360, a:0})
  .to(b, 0, {mario:0})
  .to(b, .2, {a: 255})


  // mySound.setVolume(0.1);
  mySound.playMode('restart');
  mySound.loop();

  }

function draw() {
  background("#6A81FF");

  tint(255,255);
  imageMode(CORNER);
  for(var x=0; x < width; x+= block.width) {
    image(block, x, height - block.height - 10);
  }
  imageMode(CENTER);
  translate(width/2, height-100);
  translate(b.x, b.y);
  rotate(radians(b.r));
  tint( 255, b.a);
  image(marios[b.mario],0,0);

 
}

