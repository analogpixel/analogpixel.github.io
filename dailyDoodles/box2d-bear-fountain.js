// https://www.iforce2d.net/b2dtut/introduction

var world;
var pl = planck;

var boxes = new Array();
var tbear;

function preload() {
  tbear = loadImage("data/tbear.png");
}

function setup() {
    createCanvas(800, 800);

  tbear.resize(50,40);
  world = planck.World({
    gravity: planck.Vec2(0, -10)
  });

  world.on('remove-fixture', function(fixture) {
    // remove fixture from ui
    // console.log("CALLED", fixture);
  });

  // var ground = world.createBody();

  for (var i=0; i < 60; i++) {
   boxes.push(newBox());
  }

  updateFixtures();
}

function newBox() {
    var box = world.createBody().setDynamic();
    box.createFixture(pl.Box(50,40));
    m = Math.floor(Math.random()*2) == 1 ? 1 : -1;
    box.applyForce( planck.Vec2(m*random(430),m*random(900)), planck.Vec2(0,0) );
     box.setAngularVelocity(m*random(90),m*random(90));
    return box;
}

function updateFixtures() {
  world.step(1/260);
  // box.applyAngularImpulse(-20, -20);

  for (var i=0; i < boxes.length; i++) {
    var {x,y} =  boxes[i].getPosition() ;
    var a = boxes[i].getAngle();

    // console.log(x,y,a);
    y = map(y, -1,1,  height,0);
    x = map(x, -1,1, width, 0);

    push();
    translate(x,y);
    rotate( radians(a) );
    image(tbear,0,0);
    //rect(0,0, 10,10);
    pop();

    if (y > height) { world.destroyBody(boxes[i]); boxes[i] =  newBox(); }    
  }
}

function keyPressed() {

  updateFixtures();
}

function draw() {
  background(90,3);
  updateFixtures();
}
