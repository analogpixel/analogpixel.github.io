var img;
var imgClone;
 
var mk;
var z =0;

var gridSize=20;
var swing=180;
var r =0;
var colors = ['#48466d', '#3d84a8','#46cdcf', '#abedd8'];

s = swing/2 ;
sinc = 2;
function setup() {
   createCanvas(400, 400);
   // createCanvas( window.innerWidth, window.innerHeight );
    //noStroke();
    //rectMode(CENTER); 
}

function keyPressed() {
  console.log(s);
}

function draw() {
    background(40);

  
    stroke(40);
    strokeWeight(3);
    fill(255);
    s += sinc; 

    translate(width/2, height/2)
    rotate( radians(r) );
    translate( - width/2, - height/2);
    r+=1;

    for (var x=0; x <= width; x+=gridSize) {
        var y = sin(map(x, 0, width, 0, 3.14))*s;

        bx = map(x, 0, width, 0, gridSize);
        by = map(y, 0, height, 0, gridSize);
       
       fill( colors[0] );
        rect(x,width/2 - y,gridSize,gridSize + random(22));
       fill( colors[1] );
      rect(x,width/2 + y,gridSize,gridSize + random(22));
      }

    if (s > swing) { sinc *= -1;}
    if (s < -swing) { sinc *= -1;}
    //if (s < swing/2-gridSize ) { sinc *= -1;}
}
