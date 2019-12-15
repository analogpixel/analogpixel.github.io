let skull = {
  mouth_width: 150,
  mouth_height: 200,
  tooth_height: 70,
  tooth_width: 20,
  tooth_round: 5,
  mouth_gap: 200
};

var sp;


function preload() {
  sp = loadImage("data/skullNoMouth.png");
}

function setup() {
  createCanvas(800,850);


  var gui = createGui('Skull Gui');
  gui.addObject( skull);


}

function draw_mouth(x,y,s) {
  rectMode(CENTER);

  if (s.tooth_width < 2) { s.tooth_width = 2; }
  r = s.tooth_round;

  fill(0);
  rect( x,y, s.mouth_width * 2 , s.mouth_gap/2 );
  rect( x-s.mouth_width, y, 20, s.mouth_height, r,r,r,r);
  rect( x+s.mouth_width, y, 20,  s.mouth_height, r,r,r,r);
  
  for (var tw=0; tw < s.mouth_width; tw+= s.tooth_width*2) { 
  rect( x-tw,  y  , s.tooth_width, s.tooth_height + s.mouth_gap/2 , r,r,r,r);
  rect( x+tw,  y  , s.tooth_width, s.tooth_height + s.mouth_gap/2, r,r,r,r);
  }


}

function draw() {
  background(255);
  imageMode(CENTER);
  image(sp, width/2, height/2 );
  draw_mouth(width/2 , 670, skull);
}

