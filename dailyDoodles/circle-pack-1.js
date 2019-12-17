
var maxR = 25;
var running=true;

class Circle {
  constructor(_x,_y,_r,_img) {
    this.x = _x;
    this.y = _y;
    this.growing = true;
    this.r = _r;
    this.rotate = random(360);
    this.rotateInc = Math.random() < 0.5 ? -1 : 1;
    this.rotateInc *= random(1,5);
    this.c = color( random(255), random(255), random(255));
    this.c = color("#FFF84C");
    this.img = createImage( _img.width, _img.height);
    this.img.copy( _img, 0,0, _img.width, _img.height, 0,0, _img.width, _img.height);
  }

  stopGrowing() {
        this.growing = false; 
        this.img.resize( this.r*2, this.r*2);
  }

  update() {

    if (this.growing) {
      this.r += 1;
      if ( this.x + this.r > width || this.x - this.r < 0 || this.y + this.r > height || this.y - this.r < 0)               { 
        this.stopGrowing();
      }
    }

  }

  draw() {
    if (this.growing) {
      noStroke();
      fill(this.c);
      ellipseMode(RADIUS);
      ellipse(this.x, this.y, this.r, this.r);
    } else {
      imageMode(CENTER);
      this.rotate += this.rotateInc;
      push();
      translate(this.x, this.y);
      rotate( radians( this.rotate) );
      image(this.img, 0,0);
      pop();
    }
  }

}


function newCircle() {

  while (maxR > 1) {
    for (var retry=0; retry < 400; retry++) {
      var x = random(width);
      var y = random(height);
      var ok=true;
      for (var z=0 ; z < c.length; z++) {
        if ( dist(x,y, c[z].x, c[z].y) < c[z].r + maxR +1 ) { ok=false; break }
      }
      if (ok) { return new Circle( x,y,maxR, smile); }
    }
    maxR -= 1;
  }
  console.log("Finished");
  return false;
}

var c = [];
var smile;


function preload() {
  smile = loadImage("data/smile.png");
}

function setup() {

  createCanvas(800,800);
  for (var i=0; i < 5; i++) {
    c.push( newCircle() );
  }

}

function draw() {
  background("#353535");

  var u=0;

  for (var i=0; i < c.length; i++) {
    for (var j=0; j < c.length; j++) {
      if ( c[i].growing && i != j && dist( c[i].x, c[i].y, c[j].x, c[j].y) <= c[i].r + c[j].r + 2) {
        c[i].stopGrowing();
        c[j].stopGrowing();
        u+=2;
      }
    }
  }

  if ( running) {
    for (var o=0; o <= u; o++) {
      var t =  newCircle() ;
      if (t) {
        c.push(t);
      } else {
        console.log("all done"); 
        running = false;
        break;
      } 
    }
    }
  c.forEach( d => {  d.update(); d.draw();} );

}

