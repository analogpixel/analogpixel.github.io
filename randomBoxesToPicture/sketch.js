
var pic1;
var bs=200;
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
  
  var finish=0;
  for (var x=0; x < width; x+=bs) {
    for (var y=0; y< height; y+=bs) {
      var c1 = red( pic1.get(x,y) );

      if (points[x + y*width] != c1) {
        points[x+y*width] = Math.round(random(255));
        //fill( points[x+y*width] , random(255), random(255));
        fill( points[x+y*width] );
        finish++;
      }else {
        fill( points[x+y*width] );
      }
        rect(x,y,bs,bs);


    }
  }

  if (finish< 4) {
    bs = bs /2;
    if (bs <= 1.9) { bs = 1;}
  }

   //filter(BLUR,1);
   // filter(ERODE);
}
