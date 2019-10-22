
var numPoints=3;
var points;
var bs=25;
var maxDistance;
var grad;

function preload() {
  grad = loadImage("grad.png");

}

function setup() {
    createCanvas(1000, 800);

    points = new Array();
    for (var i=0; i < numPoints; i++) {
     points.push( [Math.round(random(width)), Math.round(random(height)), random(6) ,random(9)]);
    }

  maxDistance = Math.sqrt( width * width + height * height);

  findClosest(10,10);
}

const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function findClosest(x,y) {
  var closest=Infinity;
  var cloesestPoint=[];

  points.forEach( p=> { 
    var d = Math.sqrt( Math.pow( (p[0] - x),2) + Math.pow((p[1] -y),2) );
    if (d < closest) { closest = d;  cloesestPoint = p;}
    ;});

  return {distance: closest, cloesestPoint: cloesestPoint };
}

function updatePoints() {
  points.forEach( p => {
    p[0] += p[2];
    p[1] += p[3];

    if (p[0] > width || p[0] < 0 ) { p[2] = p[2] * -1;}
    if (p[1] > height || p[1] < 0)  { p[3] = p[3] * -1;}
  });

}

function updateBoxes() {
  for (var x=0; x< width; x+=bs) {
    for( var y=0; y< height; y+=bs) {

      var c = findClosest(x,y);

      var t =  scale( c.distance*1.3, 0, maxDistance, 0, grad.width);
      fill( grad.get(t, 1) );
      rect(x,y,bs,bs);
    }
  }
}

function draw() {
  noStroke();
  updatePoints();
  updateBoxes();
}
