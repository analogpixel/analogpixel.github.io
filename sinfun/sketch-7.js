var img;
var imgClone;
 
var mk;
var z =0;

var blockSize=20;
var swing=180;

var colors = ['#48466d', '#3d84a8','#46cdcf', '#abedd8'];

s = 0;
sinc = 2;
function setup() {
   createCanvas(400, 400);
   // createCanvas( window.innerWidth, window.innerHeight );
    noStroke();
    rectMode(CENTER); 
}
 
function draw() {
    background(40);
  
    fill(255);
    s += sinc; 

    for (var x=0; x < width; x+=blockSize) {
        var y = sin(map(x, 0, width, 0, 3.14))*s;
        rect(x,width/2-y,blockSize-5, blockSize);
        rect(x,width/2+y,blockSize-5, blockSize);
      }

    if (s > swing) { sinc *= -1;}
    if (s < -swing) { sinc *= -1;}
}
