var img;
var imgClone;
 
var mk;
var z =0;

var colors = ['#48466d', '#3d84a8','#46cdcf', '#abedd8'];
var c_i=0;


function setup() {
    //createCanvas(400, 400);
    createCanvas( window.innerWidth, window.innerHeight );
    noStroke();
    rectMode(CENTER); 
}
 
function draw() {
    background(40);
    
    c_i = 0;
    for (var y1=-170; y1 < height+170; y1+=60) {
      fill( colors[ c_i % colors.length ] )
      for (var i=0; i < width; i+=10) {
        var y = sin( radians( z + map(i, 0, width, 0, 360) ) )*60;
        var x = i;
        var h = map(y, -50, 50, 10,50);
        rect(x,y+y1,5,h);
      }
      c_i+=1;
    }
    z +=1;
    
}
