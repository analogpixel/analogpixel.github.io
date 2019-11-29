
tsize=40;
data = {};
rr = 0;

function setup() {
    createCanvas(800, 800);

}

// https://stackoverflow.com/questions/2259476/rotating-a-point-about-another-point-2d
function rotate_point(cx,cy, px,py, angle) 
{
  s = Math.sin(angle);
  c = Math.cos(angle);

  // translate point back to origin:
  px -= cx;
  py -= cy;

  // rotate point
  xnew = px * c - py * s;
  ynew = px * s + py * c;

  // translate point back:
  px = xnew + cx;
  py = ynew + cy;
  return [px,py];
}

function tri(x,y,s,r) {

  // https://math.stackexchange.com/questions/1344690/is-it-possible-to-find-the-vertices-of-an-equilateral-triangle-given-its-center/1344707

  x1 = x;
  y1 = y + ((Math.sqrt(3)/3) * s);
  x2 = x - (s/2);
  y2 = y - ((Math.sqrt(3)/6) * s);
  x3 = x + (s/2);
  y3 = y - ((Math.sqrt(3)/6) * s);

  
  if (r > 0) {
    [x1,y1] = rotate_point(x,y, x1,y1, r);
    [x2,y2] = rotate_point(x,y, x2,y2, r);
    [x3,y3] = rotate_point(x,y, x3,y3, r);
  } 
  
  triangle(x1,y1, x2,y2, x3,y3);
  // ellipse(x,y,10,10);
  return [x1,y1,x2,y2,x3,y3];
}

function pointIntri(sx , sy,  ax, ay, bx, by,  cx, cy)
{
    as_x = sx-ax;
    as_y = sy-ay;

    s_ab = (bx-ax)*as_y-(by-ay)*as_x > 0;

    if((cx-ax)*as_y-(cy-ay)*as_x > 0 == s_ab) return false;

    if((cx-bx)*(sy-by)-(cy-by)*(sx-bx) > 0 != s_ab) return false;

    return true;
}

function a(x,y,z) {

  if (mouseIsPressed) {
    // console.log(x,y,z);
    s = x + "_" + y + "_" + z;
    if (keyIsPressed) {
      if (Object.keys(data).includes(s)) {
      delete data[s];
      }
    } else {
       data[s] = 1;
    }
  }
  
}

function b(x,y,z) {
  s = x + "_" + y + "_" + z;
  return s in data;
}

function draw() {
  /*
  for(var y=0; y< height; y+= (Math.sqrt(3)/2) * tsize) {
    for (var x=0; x< width; x+=tsize) {

      // if even point down if odd point up
      var o = y%2==0 ? 0 : radians(180);
      noStroke();      
      fill(255,0,0);
      tri(x,y,tsize,0);
      fill(0,255,0);
      tri(x+(tsize/2),y+ ((Math.sqrt(3)/6) * tsize) ,tsize,radians(180));

  }
}
*/
  for(var y=0; y< height; y++) {
    yy = y * ((Math.sqrt(3)/2) * tsize);
    if (yy > height) {break;}
    for (var x=0; x< width; x++) {

      xx = x * tsize + (y%2==0 ? 0 : tsize /2 );
      if (xx > width) { break;}

      noStroke();      
      fill( b(x,y,0) == 0 ? 90: 255);
      [x1,y1,x2,y2,x3,y3] = tri(xx,yy,tsize,0);
      if (pointIntri(mouseX, mouseY, x1,y1,x2,y2,x3,y3)) { 
        fill(255,0,0);
        tri(xx,yy,tsize,0);
        a(x,y,0); 
      }      

      fill( b(x,y,1) == 0 ? 90: 255);
      [x1,y1,x2,y2,x3,y3] = tri(xx+(tsize/2),yy+ ((Math.sqrt(3)/6) * tsize) ,tsize,radians(180));
      if (pointIntri(mouseX, mouseY, x1,y1,x2,y2,x3,y3)) { 
        fill(255,0,0);
        tri(xx+(tsize/2),yy+ ((Math.sqrt(3)/6) * tsize) ,tsize,radians(180));
        a(x,y,1); }      

  }
}
}
