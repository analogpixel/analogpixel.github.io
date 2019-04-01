var img;
var bs=5;
var data;

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function preload() {
  img = loadImage('junk.jpg');
}

function setup() {
  createCanvas(400, 400);
  img.resize(width, height);
  
  data = []
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

      c1 = rgbToHex( img.pixels[i1], img.pixels[i1+1],  img.pixels[i1+2] )  ;
      c2 = rgbToHex( img.pixels[i2], img.pixels[i2+1], img.pixels[i2+2] ) ; 
  
      if (c1 in data) {
        data[c1].push(c2);
      } else {
        data[c1] = [c2];
      }

      if (x == 0) {
        start.push(c1);
      }
    }

  }
  console.log("Data loaded");
  frameRate(5);
  create();
}

function create() {
  for (var y=0; y < height; y+=bs) {
    var p1 = start[Math.floor(Math.random() * start.length)];
    //cc = img.get(0,y);
    //var p1 = rgbToHex( cc[0], cc[1], cc[2]);
    
    for (var x=0; x < width; x+=bs) {
      console.log(p1);
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
  create();
}

function draw() {
  //create();
}
