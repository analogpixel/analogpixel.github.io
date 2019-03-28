
var r = 30;
var eyes = [];
var cat;
var meow;

function preload() {
  cat = loadImage("cat.png");
  meow = loadSound("meow.wav");
}

function setup() {
  cat.resize(500,500);
  createCanvas(cat.width, cat.height);

  eyes.push(createVector(227,97));
  eyes.push(createVector(294,102));
 
}

function mouseClicked() {
  console.log(mouseX, mouseY);
    meow.play();
}

function draw() {

  background(0);
  noStroke();
  image(cat,0,0);
  //var m = createVector(mouseX - width/2 , mouseY - height/2);
  eyes.forEach( (e) => {
    var m = createVector(mouseX, mouseY);
    //m.sub( width/2, height/2);
    m.sub( e.x, e.y);
    m.normalize();
    m.mult( r/4);
    push();
    translate( e.x, e.y);
    fill(90,10);
    ellipse( 0,0, r+5,r+5);
    fill(220);
    //ellipse( 0,0, r,r);
    fill(90);
    ellipse(m.x, m.y, r/2.5,r/2);
    pop();
  });
 }

