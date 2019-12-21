var parm = {
  r1: 2,
  r1Max: 2,
  r1Min: 2,
  r2: 3,
  r2Max: 20,
  r2Min: 2,
  c: 4,
  cMax: 20,
  cMin: 1,
  mult: 10,
  stroke:1,
  strokeColor: "#ff0000"
};

function turtle(d, x,y) {

  var min_x=x;
  var max_x=x;
  var min_y=y;
  var max_y=y;

  for (j=0; j < d.length; j+=2) {
    var cmd = d[j];
    var amt = d[j+1] * parm.mult;

    strokeWeight( parm.stroke);
    stroke(parm.strokeColor);
    switch(cmd) {
      case 'U':
        line(x,y, x,y-(amt) );
        y -= amt;
        break;
      case 'D':
        line(x,y, x,y+(amt) );
        y += amt;
        break;
      case 'R':
        line(x,y, x+amt,y);
        x += amt;
        break;
      case 'L':
        line(x,y,  x-amt, y);
        x -= amt;
        break;
    }

    if (x > max_x) { max_x = x;}
    if (x < min_x) { min_x = x;}
    if (y > max_y) { max_y = y;}
    if (y < min_y) { min_y = y;}
  }
  return [x,y, Math.abs( max_x- min_x), Math.abs( max_y - min_y) ];
}

function drawit(x,y) {
  var w=0;
  var h=0;
  push();
  translate(x,y);
  var x_=0;
  var y_=0;
  for (var j=0; j < 4; j++) { 
    for (var c=0; c < parm.c; c++) {
      [x_,y_,w_,h_] = turtle(['R', parm.r2, 'U', 1, 'L', parm.r1, 'U', 1, 'R', parm.r2, 'D', 2], x_,y_ );
      w= w_;
      h= h_;
    }
    translate(x_,y_);
    x_=0;
    y_=0;
    rotate( radians(90) );
  }
  pop();
  return [w,h];
  /*
  noFill();
  stroke(255,0,0);
  rect(x-w+w/2,y-h, w* 5,h*10);
  rect(x,y, w*4,h*8);
  */
}

function setup() {
  createCanvas(800,800);
  
  var gui = createGui('My awesome GUI');
  gui.addObject(parm);
}

function draw() {
  background(0);
  var x=0;
  var y=0;
  while (true) {
    [w,h] = drawit(x,y);
    x+=w*(parm.c+1);
    if (x > width) { 
      y += h*2* (parm.c+1);
      x = 0;
    } 
    if (y > height) {
      noLoop();
      break;
    }
}
}
