/// http://jseyster.github.io/plasmafractal/
var data;

function setup() {
    createCanvas(800, 800);
  noStroke();
  data = fractal(0,0, width,height, random(1), random(1), random(1), random(1));

  data.forEach( (d) => { 
    //set( Math.round(d[0]), Math.round(d[1]), map(d[2], 0,1, 0, 200)); 
    fill( map(d[2], 0,1, 0, 200));
    rect( Math.round(d[0]), Math.round(d[1]), 2,2);

  }); 
  //updatePixels();
  console.log('done');
}

function displace( num) {
		var max = num / width + height* 3;
		return (random(1) - 0.5) * max;
	}

function fractal(p1x,p1y, w, h, c1,c2,c3,c4) {

  var nh = h /2;
  var nw = w /2;
  var centerColor = displace(nh+nw) + (c1+c2+c3+c4)/4;
  
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

function draw() {
  for(var x=0; x < width; x++) {
    for(var y=0; y < height; y++) {
      var c = get(x,y)[0] + 5;
      if (c > 255) { c = 90; }
      set(x,y,c);
    }
  }
  updatePixels();
 }
