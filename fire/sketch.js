var buffer1;
var buffer2;
var bs=10;

var w=100;
var h=60;
var ynoise=0;

var img1;
var mask1;
var firegfx;

function preload() {
  img1 = loadImage("analog1.png");
  mask1 = loadImage("mask1.png");
}

function setup() {
    //createCanvas(w*bs, h*bs);
    createCanvas(img1.width, img1.height);

    firegfx= createGraphics(width, height);

    buffer1 = new Array(w*h);
    buffer2 = new Array(w*h);

    buffer1.fill(0);
    buffer2.fill(0);
}


function createFire(buf) {
    for (var x=0; x< w; x++) { 
      buf[x + (h-1)*w] = 1600;
    }
}

function updateFire() {
  for (var x=1; x< w-1;  x++) {
    for (var y=1; y< h-1; y++) {
      var n1 = buffer1[ (x+1) + (y*w)] ;
      var n2 = buffer1[ (x-1) + (y*w)] ;
      var n3 = buffer1[ (x) + (y+1) *w] ;
      var n4 = buffer1[ (x) + (y-1)* w] ;

      var c = noise(x,y+ynoise) * 40 ;
      if (c < 20) { c = 0; }
      var  p = ((n1+n2+n3+n4) / 4);
      var  p = p-c;
      if (p < 0) { p = 0;}
      
      buffer2[x + (y-1) * w] = p;
    }
  }
  ynoise+=1;
} 

function draw() {
  createFire(buffer1);
  updateFire();
  background(90);

  image(img1,0,0);

  for (var x=0; x< w; x++) {
    for (var y=0; y< h-4; y++) {
      firegfx.fill ( color(buffer2[x + y*w], 0,0));
      firegfx.noStroke();
      firegfx.rect(x*bs, (y+bs) *bs, bs,bs);
    }
  }

  iclone = firegfx.get();
  iclone.mask( mask1 );
  image(iclone, 0,0);

  // updatePixels();
  /*
  filter(ERODE);
  filter(ERODE);
  filter(ERODE);
  filter(ERODE);
  filter(BLUR);
  */

  buffer1 = JSON.parse(JSON.stringify(buffer2));
  
}
