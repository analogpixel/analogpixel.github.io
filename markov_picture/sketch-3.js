var img;
var bs=1;
var data;

function preload() {
  img = loadImage('bw256.png');
}

function setup() {
  createCanvas(400, 400);
  img.resize(width, height);
  
  data = new Array(256).fill([]); 
  start = [];
  
  img.loadPixels();
  //const d = img.pixelDensity();
  
  console.log("loading data");
  for (var y=0; y < img.height; y++) {
    for (var x=0; x < img.width-1; x++) {

      //const i1 = 4 * d*(y * d*width + x);
      //const i2 = 4 * d*(y * d*width + x+1);
      const i1 = 4 * (y * width + x);
      const i2 = 4 * (y * width + x+1);

      c1 = img.pixels[i1];
      c2 = img.pixels[i2];
   
      //if (c1 && c2) {
      data[c1].push(c2);
      //}
      if (x == 0) {
        start.push(c1);
      }
    }
  }
  console.log("Data loaded");
  frameRate(5);
}

function create() {
  for (var y=0; y < height; y+=bs) {
    //var p1 = start[Math.floor(Math.random() * start.length)];
    var p1 = img.get(0,y)[0];
    for (var x=0; x < width; x+=bs) {
       c = data[p1][Math.floor(Math.random() * data[p1].length)];
        noStroke();
      fill(c);
      rect(x,y,bs,bs);
      p1 = c;
    }
  }

  //filter(BLUR, 5);
}

function keyPressed() {
}

function draw() {
  create();
}
