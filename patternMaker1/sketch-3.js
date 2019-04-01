var sympoints  = [];
var drawPoints = [];

function setup() {
    createCanvas(800, 800);
 
    sympoints.push( {x: width/2, y: height/2} );
    var pt = [];

    for (var x = 0; x < width; x++) {
      var y = (width/2) + sin(radians(x*2)) * 100;
      pt.push( {x: x, y: y});
    }

    var maxValue = Math.max( ... pt.map( (z) => z.y) ); 
    var minValue = Math.min( ... pt.map( (z) => z.y) ); 

    pt.filter( (v) => v.y == maxValue).forEach( (f) => {
      sympoints.push( {x: f.x, y: f.y} );
    });

    pt.filter( (v) => v.y == minValue).forEach( (f) => {
      sympoints.push( {x: f.x, y: f.y} );
    });
}
 
function draw() {


}

function mouseDragged() {
  noStroke();
  sympoints.forEach( (p) => {
    dx = abs(p.x - mouseX);
    dy = abs(p.y - mouseY);
    /*
    fill(255);
    ellipse( p.x + dx, p.y + dy, 10,10);
    ellipse( p.x + (-1*dx), p.y + dy , 10,10);
    ellipse( p.x + dx, p.y + (-1 * dy) , 10,10);
    fill(255,0,0);
    ellipse(mouseX, mouseY, 10,10);
    */
    ellipse( p.x + dx , mouseY, 10,10);
    ellipse( p.x - dx , mouseY, 10,10);
    ellipse( mouseX, p.y + dy, 10,10);
    ellipse( mouseX, p.y - dy, 10,10);
    ellipse( mouseX, mouseY, 10,10);

  });
}

