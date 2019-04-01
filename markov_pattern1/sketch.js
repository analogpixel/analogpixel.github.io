
var chain = {0: [3,3,3,3,2,2], 1: [1,1,1,1,2,2,0], 2: [3,3,3,2,1], 3: [1,2,2]  }
var colors = ['#E74C3C','#8CB369', '#F4E285','#2C3E50']
var bs=20;

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function setup() {
    createCanvas(800, 800);
  keyPressed(); 
}

function keyPressed() {
var last = choose( Object.keys(chain) );
  
  for (var x=0; x < width; x+=bs) {
    fill( colors[last] );
    rect(x, 0, bs, height);
    noStroke();
    last = choose( chain[last] );
  }



}

function draw() {
  }
