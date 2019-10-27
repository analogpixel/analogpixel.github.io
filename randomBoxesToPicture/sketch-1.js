
var pic1;
var bs=5;
var points;

function preload() {
  pic1 = loadImage("pic2.jpg");
}

function setup() {
    createCanvas(pic1.width, pic1.height);

    pic1.filter(GRAY);

    points = new Array( pic1.width/bs * pic1.height/bs);
    points.forEach( p => { p = Math.round(random(255));});

}
 
function draw() {
  noStroke();

  for (var x=0; x < width; x+=bs) {
    for (var y=0; y< height; y+=bs) {
      var c1 = red( pic1.get(x,y) );

      if (points[x + y*width] != c1) {
        points[x+y*width] = Math.round(random(255));
        fill( points[x+y*width] , random(255), random(255));
        rect(x,y,bs* random(5) ,bs*random(5));
      }else {
        fill( points[x+y*width] );
        rect(x,y,bs,bs);
      }


    }
  }
   //filter(BLUR,1);
   filter(ERODE);
}
