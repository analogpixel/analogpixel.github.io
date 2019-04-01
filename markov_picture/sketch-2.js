var img;
var bs=30;
var data;

function preload() {
  img = loadImage('bw8.png');
}

function setup() {
  createCanvas(800, 800);
  console.log("creating array");
  data = new Array(256).fill([]); 
  start = [];

  console.log("loading data");
  for (var y=0; y < img.height; y++) {
    for (var x=0; x < img.width-1; x++) {
      c1 = img.get(x,y)[0];
      c2 = img.get(x+1,y)[0];

      data[c1].push(c2);

      if (x == 0) {
        start.push(c1);
      }
    }
  }
  frameRate(5);
  create();
}

function create() {
  for (var y=0; y < height; y+=bs) {
    var p1 = start[Math.floor(Math.random() * start.length)];
    for (var x=0; x < width; x+=bs) {
       c = data[p1][Math.floor(Math.random() * data[p1].length)];
        noStroke();
      fill(c);
      rect(x,y,bs,bs);
      p1 = c;
    }
  }

  //filter(BLUR, 10);
}

function keyPressed() {
}

function draw() {
  create();
}
