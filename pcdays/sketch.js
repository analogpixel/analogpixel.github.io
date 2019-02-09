
var colors = ['#d98a69','#e86e47','#e0aa4a','#7d7757','#587477','a97065'];

var barHeight;
var bgGraphic;
var s = 0;
var sinc = 2;
var smax=90;
var mask;
var mask_inv;
var texture;

var vf = [];

function preload() {
  mask = loadImage('p_mask.png');
  mask_inv = loadImage('p_mask_inv.png');
  texture = loadImage('texture.png');
}

function setup() {
  createCanvas(400, 400);
  barHeight = height / (colors.length-1); 
  noStroke();

  for (var i=0; i < 20; i+=1) {
    vf.push( [random(20), random(height), random(10)] );
  }
}
 
function draw() {

  bgGraphic = createGraphics(width, height);
  b2 = createGraphics(width,height);

  b2.background(20);
  b2.noStroke();
  for (var i=0; i < vf.length; i++) {
    var es = map(vf[i][2], 0, 10, 1,10);
    var vel = map(vf[i][2], 0, 10, .01, 2); 
    var col = map(vf[i][2], 0, 10, 90,255);
    b2.fill(col);
    b2.ellipse(vf[i][0], vf[i][1], es,es);
    vf[i][0] += vel;
    if (vf[i][0] > width) {
      vf[i][0] = random(20);
    }
  }

  bgGraphic.background(90);
  bgGraphic.noStroke();
  var c=0;
  for (var y1=0; y1< height; y1+=barHeight) {
        for (var x=0; x< width; x+=10) {
      var y = sin( map(x, 0,width, 0, 3.14))*s;
      //console.log( colors[c], c);
      bgGraphic.fill(colors[c]);
      bgGraphic.rect(x,y1+y-barHeight-20, 10,barHeight); 

    }
      c+=1;
      if (c >= colors.length) { c = 0;}
  }
  s += sinc;
  if (s > smax) { sinc = sinc * -1; }
  if (s < -smax) { sinc = sinc * -1; }

  // b2.filter(INVERT);

  var i = bgGraphic.get();
  var i2 = b2.get();
 
  tint(255,255);
  i.mask(mask);
  i2.mask(mask_inv);
  image(i2,0,0);
  image(i,0,0);
  tint(255, 70);
  image(texture,0,0);
}
