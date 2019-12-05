// https://www.iforce2d.net/b2dtut/introduction

/*
Suppose you have a sprite for a character that is 100x100 pixels. You decide to use a scaling factor that is 0.01. This will make the character physics box 1m x 1m. So go make a physics box that is 1x1. Now suppose the character starts out at pixel coordinate (345,679). So position the physics box at (3.45,6.79). Now simulate the physics world. Suppose the character physics box moves to (2.31,4.98), so move your character sprite to pixel coordinates (231,498). Now the only tricky part is choosing a scaling factor. This really depends on your game. You should try to get your moving objects in the range 0.1 - 10 meters, with 1 meter being the sweet spot.

*/

var world;
var pl = planck;

var box;
var box2;
var bs=2;

function preload() {
}

function setup() {
    createCanvas(800, 800);

  world = planck.World({
    gravity: planck.Vec2(0, -9.8)
  });

  world.on('remove-fixture', function(fixture) {
  });

  box2 = world.createBody().setStatic();
  box2.createFixture( pl.Box(10,2) );
  box2.setPosition(-5,1);

  box = world.createBody().setDynamic();
  box.createFixture(pl.Box(bs,bs));
   box.setAngularVelocity(random(99),random(99));
}


function updateFixtures() {
  world.step(1/60);

  fill(255,0,0);
  rect(width/2 , height/2  , bs*10,bs*10);

  fill(0,0,255);
  var {x,y} =  box.getPosition() ;
  var r =  box.getAngle() ;
 
  // 1 meter = 10 pixels
  console.log("x:", x,"y:", y,"r:",r); 

  var xx =  x * 10;
  var yy = y * 10;

  push();
  translate( width/2 - xx, height/2 -yy);
  rotate( radians(r));
  rect(0,0, bs * 10, bs * 10);
  pop();
}

function keyPressed() {
  updateFixtures();
}

function draw() {
  // background(90,30);
  //   updateFixtures();
}
