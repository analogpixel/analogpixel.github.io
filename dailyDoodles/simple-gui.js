// https://github.com/bitcraftlab/p5.gui

var myColor = "#ff0000";
var myNumber = 10;
var myChoice = ['1','2','3'];

function setup() {
  createCanvas(800,800);

  var gui = createGui('My awesome GUI');
  gui.addGlobals('myColor', 'myNumber', 'myChoice');
}

function draw() {
}

