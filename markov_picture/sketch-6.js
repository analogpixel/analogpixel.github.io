var img;
var bs=5;
var data;
var zz;
var zzinc;
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function preload() {
  //img = loadImage('facesmall.jpg');
  img = loadImage('junk.jpg');
}

function setup() {
  //createCanvas(400, 400);
  createCanvas(img.width*bs, img.height*bs);
  //img.resize(width, height);
  
  data = []
  start = [];
  zz=0;
  zzinc=1;
  img.loadPixels();
  //const d = img.pixelDensity();
  
  console.log("loading data");

  for (var i=0; i < img.pixels.length-4; i+=4) {
      i2 = i +4;
      c1 = rgbToHex( img.pixels[i], img.pixels[i+1],  img.pixels[i+2] )  ;
      c2 = rgbToHex( img.pixels[i2], img.pixels[i2+1], img.pixels[i2+2] ) ; 
      
      if (i ==0) {
        start.push(c1);
      }

      if (c1 in data) {
        data[c1].push(c2);
      } else {
        data[c1] = [c2];
      }
  }
 
  // get that last pixel
  i2 = img.pixels.length - 4;
  i1 = 0;
  c1 = rgbToHex( img.pixels[i1], img.pixels[i1+1],  img.pixels[i1+2] )  ;
  c2 = rgbToHex( img.pixels[i2], img.pixels[i2+1], img.pixels[i2+2] ) ; 

   if (c1 in data) {
      data[c1].push(c2);
    } else {
     data[c1] = [c2];
   }
  
  console.log("Data loaded");
  frameRate(5);
  create();
}

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function create() {
  //console.log('start');
  for (var y=0; y < img.height; y++) {
    //var p1 = start[Math.floor(Math.random() * start.length)];
    cc = img.get(0,y);
    var p1 = rgbToHex( cc[0], cc[1], cc[2]);
    // p1 = choose( Object.keys(data));
    for (var x=0; x < img.width; x++) {
      if (p1 in data) {
       c = data[p1][Math.floor(Math.random() * data[p1].length)];
      } else {
        c = start[0];
      }
      noStroke();
      fill(c);
      rect(x*bs,y*bs,bs,bs);

      if ( random() * 100 > zz) {
        p1 = c;
      } else {
        cc = img.get(x,y);
        p1 = rgbToHex( cc[0], cc[1], cc[2]);
      }

    }
  }
  //console.log('end');
  // filter(BLUR, 5);
  zz+=zzinc;
  if (zz > 100) { zzinc = -1;}
  if (zz <0) { zzinc = 1;}
}

function keyPressed() {
  create();
}

function draw() {
  create();
}
