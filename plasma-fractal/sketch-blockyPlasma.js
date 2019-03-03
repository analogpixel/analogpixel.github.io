/// http://jseyster.github.io/plasmafractal/
// apple + ctrl + f : full screen in chrome
var data;
var colors = ['#00a8b5','#774898','#de4383','#f3ae4b'];
var grad;
var cycle =0;
var bs=20;
var fw=100
var fh=100;

function preload() {
  grad = loadImage("grad1.png");
}

function setup() {
  createCanvas(fw*bs, fh*bs);
  rectMode(CENTER);
  //createCanvas(2880, 2880);
  noStroke();
  data = fractal(0,0, fw,fh, random(1), random(1), random(1), random(1));
}

function displace( num) {
		var max = num / width + height* 3;
		return (random(1) - 0.5) * max;
	}

function fractal(p1x,p1y, w, h, c1,c2,c3,c4) {

  var nh = h /2;
  var nw = w /2;
  //var centerColor = displace(nh+nw) + (c1+c2+c3+c4)/4;
  var centerColor =  random(1) - random(1) +  (c1+c2+c3+c4)/4;
  
  if (centerColor >1) {centerColor = 1;}
  if (centerColor <0) {centerColor = 0;}

  if ((nw < 1) || (nh < 1)) {
    return [[p1x, p1y, (c1+c2+c3+c4)/4]];
  }

  var e1 = (c1 + c2) / 2;
  var e2 = (c1 + c3) /2;
  var e3 = (c2 + c4) /2;
  var e4 = (c3 + c4) /2;

  var rd = [];
  rd = [ ...rd, ... fractal(p1x, p1y, nw, nh, c1, e1,e2,centerColor) ];
  rd = [ ...rd, ... fractal(p1x+nw, p1y, nw,nh, e1, c2, centerColor, e3)];
  rd = [ ...rd, ... fractal(p1x, p1y+nh, nw,nh, e2, centerColor, c3, e4)];
  rd = [ ...rd, ... fractal(p1x+nw, p1y+nh, nw, nh, centerColor, e3, e4, c4)];

  return rd;

}

function keyPressed() {
  //save();
}

function draw() {
  cycle +=50;
  data.forEach( (d) => { 
    x =  ( Math.floor( map( d[2], 0,1, 0, grad.width))+cycle) % grad.width;
    fill(grad.get(x, 1), 2);
    rect( Math.round(d[0])*bs, Math.round(d[1])*bs, bs*2,bs*2);
  }); 
  
 }
