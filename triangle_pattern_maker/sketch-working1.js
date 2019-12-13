
tsize=20;
rr = 0;
var grid1;
var grid2;
var gridSize=8;
var save=false;

function setup() {
    createCanvas(800, 800);
  save=false;
  key='a';
  grid1 = new Array( gridSize * gridSize).fill(0);
  grid2 = new Array( gridSize * gridSize).fill(0);

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

function tri(x,y,s,c, r,fx,fy) {

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

  // if mouse is in this triangle fill it red
  mouseIn = pointIntri(mouseX, mouseY, x1,y1,x2,y2,x3,y3) ;
  if (mouseIn && fx <= gridSize && fy <= gridSize) {
    fill(255,0,0);
  } else {
    fill(c);
  }

  strokeWeight(1);
  stroke(c);
  triangle(x1,y1, x2,y2, x3,y3);
  //fill(255,0,0);
  //ellipse(x,y,10,10);
  return [x1,y1,x2,y2,x3,y3, pointIntri(mouseX, mouseY, x1,y1,x2,y2,x3,y3)];
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

function keyPressed() {
  if (key == 's') {
    save=true;
  }
}

function draw() {
  background(0);
  noStroke();      
    for(var y=0; true; y++) {
      yy = y * ((Math.sqrt(3)/2) * tsize);
      //if (yy > tsize * width) {break;}
      if (yy >  height) {break;}

      for (var x=0; true; x++) {
        offset =  (y%2==0 ? 0 : tsize /2 );

        xx = x * tsize + offset;
        if (xx > height) { break;}

        // grid1
        var fillC = grid1[x + (y * width)] == 1 ? 255: 90;
        [x1,y1,x2,y2,x3,y3,m] = tri(xx,yy,tsize,fillC, 0,x,y);
        if (m && mouseIsPressed && x <= gridSize && y <= gridSize) { 
          for (j=0; j <= (width / tsize) / gridSize; j++) {
            for (k=0; k <= (height / tsize) / gridSize; k++) {
              grid1[(x+gridSize*j) +(y+gridSize * k) * width] =  key=='d'?0:1; 
            }
          }
        }
       
        // grid2
        var fillC = grid2[x + y* width] == 1 ? 255: 90;
        [x1,y1,x2,y2,x3,y3,m] = tri(xx+(tsize/2),yy+ ((Math.sqrt(3)/6) * tsize) ,tsize,fillC,radians(180),x,y);
        if (m && mouseIsPressed && x <= gridSize && y <= gridSize) { 
          //grid2[x +y * width] =  key=='d'?0:1; 
          for (j=0; j <= (width / tsize) / gridSize; j++) {
            for (k=0; k <= (height / tsize) / gridSize; k++) {
              grid2[(x+gridSize*j) +(y+gridSize * k) * width] =  key=='d'?0:1; 
            }
          }
        }
    }
  }

  if (!save && key=='d') {
    noFill();
    strokeWeight(2);
    stroke(255,0,0);
    rect(0,0,width,height);
    strokeWeight(1);
  }

  if (save) {
    saveCanvas("out.png");
    save=false;
  }

}
