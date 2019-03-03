
var fontSize = 32;
var gap=0;
var rot=450;

function cart_to_polar(x,y) {
  var r = sqrt( x*x + y*y);
  var theta = atan2(y,x);
  return [r, theta];
}

function polar_to_cart(r,theta) {
  var x = r * cos(theta);
  var y = r * sin(theta);
  return [x,y];
}

function setup() {
    createCanvas(400, 400);
 
}
 
function draw() {
  background(255,90);
  rectMode(CENTER);
  textAlign(CENTER,CENTER);
  textSize(fontSize);

  var r = fontSize/2;

  if (rot > 90) {
  rot-=10; 
  }

  [rx1,ry1] = polar_to_cart( r, radians(90 + rot));
  [rx2,ry2] = polar_to_cart( r, radians(270 + rot));
  text('A',50 + rx1, 50 + ry1);
  text('B',50 + rx2, 50 + ry2);


}

function keyPressed() {
  rot = 450;
}

