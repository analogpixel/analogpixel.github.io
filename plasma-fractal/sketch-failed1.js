/// http://jseyster.github.io/plasmafractal/
var data;

function setup() {
    createCanvas(400, 400);

    data = new Array(height+1);
      for (var y=0; y< height+1; y++) {
        data[y] = new Array(width+1).fill(0);
    }

  /*
  for(var x=0; x < width; x++) {
    for(var y=0; y < height; y++) {
      data[y][x] = random(255);
    }
  }
  */

  data[0][0] = random(1)
  data[0][width] = random(1);
  data[height][0] = random(1);
  data[height][width]= random(1);
  
  fractal( {x: 0, y:0}, {x:width, y: 0}, {x:0, y: height}, {x:width, y: height} );
  /*
  for(var x=0; x < width; x++) {
    for(var y=0; y < height; y++) {
      set(x,y, map( data[y][x], 0,1, 0, 255));
    }
  }
  */
  updatePixels();
}

function fractal(p1, p2, p3, p4) {

  if ( abs(p1.x - p2.x) < 2) {
    var c =  random(1) + Math.floor( (data[p1.y][p1.x] + data[p2.y][p2.x] + data[p3.y][p3.x] + data[p4.y][p4.x])/4 );
    set( Math.floor(p1.x), Math.floor(p1.y),c) 
    return;
  }
  // set the center point
  var centerPoint = {x:Math.floor((p1.x + p2.x)/2), y:Math.round((p1.y + p3.y)/2)};
  var p5 = {x:Math.floor((p1.x + p2.x)/2), y:p1.y}
  var p6 = {x: p1.x, y:Math.floor((p1.y + p3.y)/2)};
  var p7 = {x: p2.x, y:Math.floor((p2.y + p4.y)/2)};
  var p8 = {x:Math.floor((p1.x + p2.x)/2), y:p4.y}

  /*
  if ( abs(centerPoint.x - p1.x) < 2) {
    return;
  }
  */

  data[centerPoint.y][centerPoint.x] =  random(1) + Math.floor( (data[p1.y][p1.x] + data[p2.y][p2.x] + data[p3.y][p3.x] + data[p4.y][p4.x])/4 );
  data[p6.y][p6.x] =  Math.floor( (data[p1.y][p1.x] + data[p3.y][p3.x])/2);
  data[p7.y][p7.x] =  Math.floor( (data[p2.y][p2.x] + data[p4.y][p4.x])/2);
  data[p5.y][p5.x] = Math.floor( (data[p1.y][p1.x] + data[p2.y][p2.x])/2);
  data[p8.y][p8.x] = Math.floor( (data[p3.y][p3.x] + data[p4.y][p4.x])/2);

  // recurse into the 4 squares
  fractal( {... p1}, {... p5}, {... p6}, {... centerPoint});
  fractal( {... p5}, {... p2}, {... centerPoint}, {...p7});
  fractal( {... p6}, {... centerPoint}, {...p3}, {...p6});
  fractal( {... centerPoint}, {... p7}, {...p6}, {...p4});
}

function draw() {

 }
