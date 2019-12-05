// https://www.iforce2d.net/b2dtut/introduction

var world;
var pl = planck;


function preload() {
}

function setup() {
    createCanvas(800, 800);

  world = planck.World({
    gravity: planck.Vec2(0, -10)
  });

  world.on('remove-fixture', function(fixture) {
  });

  updateFixtures();
}


function updateFixtures() {
  world.step(1/260);
}

function keyPressed() {

  updateFixtures();
}

function draw() {
  background(90,30);
  updateFixtures();
}
