var points = [];
var drawPoints = [];

function setup() {
    createCanvas(800, 800);
    
    var pt = [];

    for (var x = 0; x < width; x++) {
      //var y = Math.round((width/2) + sin(radians(x*2)) * 100);
      var y = (width/2) + sin(radians(x*2)) * 100;
      pt.push( {x: x, y: y});
    }

    var maxValue = Math.max( ... pt.map( (z) => z.y) ); 
    var minValue = Math.min( ... pt.map( (z) => z.y) ); 

    pt.filter( (v) => v.y == maxValue).forEach( (f) => {
    points.push( {x:f.x, y:f.y, c: [255,0,0], mult: {x: -1, y:-1}}); 
    points.push( {x:f.x, y:f.y, c: [0,255,0], mult: {x: 1, y:-1}}); 
    });

    pt.filter( (v) => v.y == minValue).forEach( (f) => {
    points.push( {x:f.x, y:f.y, c: [255,255,0], mult: {x: 1, y:1}}); 
    points.push( {x:f.x, y:f.y, c: [0,0,255], mult: {x: -1, y:1}}); 
    });
}
 
function draw() {

  background(90);
  fill(255);
  noStroke();
  drawPoints.forEach( (p) => {
    fill(p.c)
    ellipse(p.x, p.y, 10,10);
  });

}

function move(x,y,amt) {
  console.log( x,y,amt);

  points.forEach( (p) => {
    p.x +=  (x*amt) * p.mult.x;
    p.y +=  (y*amt) * p.mult.y;

    drawPoints.push( {x: p.x , y: p.y , c: p.c});
  });


}

function keyPressed() {
    var amt=10;

    if (key == 'w') {
      move(0,-1, amt);
    }

    if (key == 's') {
      move(0,1, amt);
    }

    if (key == 'a') {
      move(-1,0, amt);
    }

    if (key == 'd') {
      move(1,0,amt);
    }

}


