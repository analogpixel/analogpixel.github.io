var pw = 150;;
var ph = 150;

var p1=  {x:200, y: 600};
var p2 = {x:p1.x+pw, y:p1.y-ph};
var p3 = {x:p1.x+pw, y:p1.y-ph};
var p4 = {x:200, y: 600};

function setup() {
    createCanvas(800, 800);

    sx = width -90;
    sy = 90;
}
 
function draw() {

  
}

function keyPressed() {
    var amt=10;

    if (key == 'w') {
      p1.y-=amt;
      p3.y-=amt;
      p2.y+=amt;
      p4.y+=amt;
    }

    if (key == 's') {
      p1.y+=amt;
      p3.y+=amt;
      p2.y-=amt;
      p4.y-=amt;
    }

    if (key == 'a') {
      p1.x-=amt;
      p3.x-=amt;
      p2.x+=amt;
      p4.x+=amt;
    }

    if (key == 'd') {
      p1.x+=amt;
      p3.x+=amt;
      p2.x-=amt;
      p4.x-=amt;
    }

    noStroke();
    fill(0,0,255);
    ellipse(p1.x, p1.y, amt, amt)
    fill(255,0,0);
    ellipse(p2.x, p2.y, amt,amt);
    fill(0,255,0);
    ellipse(p3.x, p3.y, amt, amt);
    fill(255,255,0);
    ellipse(p4.x, p4.y, amt, amt);
}


