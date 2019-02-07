var img;
var imgClone;
 
var mk;
var z =0;

var gridSize=40;
var swing=130;
var r =0;
var colors = ['#48466d', '#3d84a8','#46cdcf', '#abedd8'];
var rings;

s = swing;
sinc = .5;
hold = 0;

function setup() {
   createCanvas(400,400);
  rings = loadImage('rings.png');

   // createCanvas( window.innerWidth, window.innerHeight );
    //noStroke();
    //rectMode(CENTER); 
}

function keyPressed() {
 // console.log(s);
}

function draw() {
    background(255);

  
    //stroke(40);
    //strokeWeight(3);
    fill(255);
    
    translate(width/2, height/2);
    rotate( radians(r) );
    translate(-width/2, -height/2);
    r+=1;

    for (var x=0 ; x<=width; x+=gridSize) {
      y = sin( map(x, 0, width-gridSize, 0, 3.14) ) * s;
      //rect(x, (width/2 - y) - gridSize , gridSize, gridSize); 
      copy(rings, x, 0, gridSize, gridSize,  x, (width/2 - y) - gridSize, gridSize, gridSize);
      copy(rings, x, gridSize, gridSize, gridSize,  x, (gridSize + width/2 + y) - gridSize, gridSize, gridSize);
      //rect(x, (gridSize + width/2 + y) - gridSize, gridSize, gridSize); 
    }

    if (hold > 0) {
      hold +=1;
      if (hold > 60) { hold = 0;}
    } else {
      s += sinc;
      if (s > swing) { hold=1; sinc = sinc * -1; }
      if (s < 0) { hold=1; sinc = sinc * -1; }
    }
}
