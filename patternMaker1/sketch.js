bs=200;
var grid=1;
var tile=1;

points = [];
function setup() {
    createCanvas(800, 800);
 
}
 
function draw() {

  background(90);

  if (grid == 1) {
  stroke(255,0,0, 90);
  noFill();
  rect(0,0, bs,bs);
  line(bs/2,0, bs/2, bs);
  line(0, bs/2, bs, bs/2);
  }

  noStroke();
  fill(255);

  if (tile == 1) {
    ww = width;
    hh = height;
  } else {
    ww = bs * 2;
    hh = bs * 2;
  }

  for (var x=0; x < ww; x+=bs) {
    for (var y=0; y < hh; y+=bs) {
      points.forEach( (p) => {
        ellipse(x + p.x, y+ p.y, 5,5);
      });
    }
  }
 
}

function keyPressed() {
  if (key == 'g') {
  grid *= -1;
  }

  if (key == 's') {
    save();
  }

  if (key == 't') {
    tile *= -1;
  }

  if (key == 'c') {
    points = [];
  }

}

function mouseDragged() {
  noStroke();
  if (mouseX >0 && mouseX < bs/2 && mouseY > 0 && mouseY < bs/2) {
    xd = (bs/2) - mouseX;
    xy = (bs/2) - mouseY;
    points.push({x: mouseX, y: mouseY});
    points.push({x: (bs/2) + xd, y: mouseY });
    points.push({x: (bs/2) + xd, y: (bs/2) + xy });
    points.push({x: (bs/2) - xd, y: (bs/2) + xy });
  }
}

