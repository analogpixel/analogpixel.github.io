
var fontSize = 72;
var gap=0;
var rot=540;
var message;
var i=0;
var j=1;
var myFont;

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

function preload() {
  myFont = loadFont('sketch.otf');
}

function setup() {
    createCanvas(1300, 800);
  message = createText("analogpixel.org",fontSize); 
}

function createText(text, fontSize) {
  var rd = new Array();
  var c = 0;
  //[x,y] = polar_to_cart( fontSize/2, radians(270));
  text.split('').forEach( (l) => {
    c += fontSize;
    rd.push( {letter: l, x: c, y:0, rx:0, ry:0} ); 
  } );

  rd.push( {letter: ' ', x: c, y:0, rx:0, ry:0} ); 
  return rd;
}

function rotateText(messageData, i, j, rotamt) {
  var midPoint = abs(messageData[i].x + messageData[j].x)/2;
  var r = abs(message[i].x - midPoint);

  [messageData[i].rx,messageData[i].ry] = polar_to_cart( r, radians(270 + rotamt));
  [messageData[j].rx,messageData[j].ry] = polar_to_cart( r, radians(90 + rotamt));
  messageData[i].rx += r;
  messageData[j].rx -= r;

}

function drawText(offsetX, offsetY, messageData) {
  messageData.forEach( (l) => {
    text(l.letter, offsetX + l.x + l.rx, offsetY + l.y+ l.ry);  
  });
}

function draw() {
  background(20,80);
  rectMode(CENTER);
  textAlign(CENTER,CENTER);
  textSize(fontSize);
  textFont(myFont);

  rot-=5;
  if (rot < 270) {
    rot = 540;
    message[i].rx = 0;
    message[i].ry = 0
    message[j].rx = 0;
    message[j].ry = 0
    i++;
    j++;
    if (i > message.length -2) {
      i = 0;
      j = 1;
    }
  }

  rotateText(message, i, j,  rot);
  fill(255,255,255);
  drawText(100,400, message);


}

function keyPressed() {
  console.log( createText("matt") );
}

