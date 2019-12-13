var blobs = [];
var bs=20;
var w=100;
var h=50;

function newBlob() {
return   { r: random(20,40),
           p:  createVector(random(w), random(h)) ,
           a:  createVector(random(.1,1), random(.1,1)),
           s:  random(1,2) };  
}

function setup() {

  createCanvas(bs*w, bs*h);
  //  colorMode(HSB);

  for (var i=0; i < 20; i++) {
    blobs.push(  newBlob() );
  }

}

function updateBlobs() {
  for (var b=0; b < blobs.length; b++) {
    blobs[b].p.add( blobs[b].a )
    if (blobs[b].p.x > w || blobs[b].p.x < 0) { blobs[b].a.x *= -1; }
    if (blobs[b].p.y > h || blobs[b].p.y < 0) { blobs[b].a.y *= -1;}

    // blobs[b].r -= blobs[b].s;
    //if (blobs[b].r <= 0) { blobs[b] = newBlob(); }
    }
  }

function draw() {
  updateBlobs();
  noStroke();
  // loadPixels(); 
  for (var x=0; x < w; x++) {
    for (var y=0; y < h; y++) {
      var t = 0;
      for (var b=0; b < blobs.length; b++) {
        t += (10 * blobs[b].r) / Math.sqrt( ( Math.pow( x - blobs[b].p.x,2) + Math.pow(y - blobs[b].p.y,2)) );
      }
      // set(x,y, color(t, 255,255));
      fill ( color(t, 255,255) );
      rect(x*bs, y*bs, bs,bs);
    }
  }
  // updatePixels();
}

