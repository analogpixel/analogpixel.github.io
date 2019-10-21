var buffer1;
var buffer2;
var bs=5;
var gridSize=200;

function setup() {
    createCanvas(gridSize*bs, gridSize*bs);

    //buffer1 = new Array(gridSize * gridSize);
    //buffer2 = new Array(gridSize * gridSize);
    buffer1 = createGraphics(gridSize * gridSize);
    buffer2 = createGraphics(gridSize * gridSize);

    // point to a div
    // var canvas = createCanvas(800, 800);
    //canvas.parent('sketch'); 
  // for (var x=0; x< gridSize; x++) { buffer2[x + (gridSize-1) *gridSize] = int(random(255)); }

}

function readBuffer(x,y, buf) {

    var n = x + y * gridSize;
    if (n > buf.length) {
      return 0;
    }
    if (n < 0) {
      return 0;
    }

    return buf[n];

}

function writeBuffer(x,y, val, buf) {

    var n = x + y * gridSize;
    if (n > buf.length) {
      return 0;
    }
    if (n < 0) {
      return 0;
    }

    buf[n] = val;
    return 0;

}

function crateFire() {
    for (var x=0; x< gridSize; x++) { 
      pg.set( x, height -1, 255);
    }
    pg.updatePixels();
}

function draw() {
  background(90);
    // for (var x=0; x< gridSize; x++) { buffer2[x + (gridSize-1) *gridSize] = int(random(300)); }
    for (var x=0; x< gridSize; x++) { buffer2[x + (gridSize-1) *gridSize] = 255; }
 
  for (var x=0; x< gridSize; x++) {
    for (var y=0; y< gridSize; y++) {
      var n1 = readBuffer(x+1, y, buffer1);
      var n2 = readBuffer(x-1, y, buffer1);
      var n3 = readBuffer(x, y+1, buffer1);
      var n4 = readBuffer(x, y-1, buffer1);

      //  var c  = read pixel from CoolingMap(x, y)     ;Read a pixel from the cooling map
      var c=random(5);
      var  p = ((n1+n2+n3+n4) / 4);
      var  p = p-c;
      if (p < 0) { p = 0;}
      
      writeBuffer(x, y-1, p, buffer2);
    }
  }
  
  for (var x=0; x< gridSize; x++) {
    for (var y=0; y< gridSize-5; y++) {
      fill ( color(readBuffer(x,y, buffer2), 0,0));
      noStroke();
      rect(x*bs, y*bs, bs,bs);
    }
  }
  updatePixels();

  buffer1 = JSON.parse(JSON.stringify(buffer2));
  // buffer1  = [...buffer2];
  // buffer1 = Array.from(buffer2);
  
}
