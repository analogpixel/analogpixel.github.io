// https://greensock.com/docs/Easing
// https://ihatetomatoes.net/wp-content/uploads/2016/07/GreenSock-Cheatsheet-4.pdf
var bounce;

var b = {x: 200, y: 200, c: 6};
var tl = new TimelineLite();;

function preload() {
  bounce = loadImage("bounce1.png");
}

function setup() {
  frameRate(50);
    createCanvas(400, 800);
    b.y = height - 200;
 
}
 
function draw() {
  background(30,100);

  copy(bounce, Math.floor(b.c)*100, 0, 100,200, width/2-100, b.y, 100,200);

  tl.to(b, .5, {c:0})
    .to(b, .2, {c:9})
    .to(b, 1, {y:-200, ease: Power3.easeOut })
    .to(b, 0, {c: 6, y:height+200})
    .to(b, 3, {y:height-200})
    .to(b, 0, {x: 200, y: height-200, c: 6});

}
