var pdf;
var pageCount=0;
var maxWidth=150;
var maxHeight=330;
var padding=50;
var PDF=true;
var PDF_PAGES=10;

var objects = ['sword','bag','overcoat','hat','armor','gun','skateboard','phone','book'];
var emotions = ['Exhausted','Confused', 'Ecstatic', 'Guilty', 'Suspicious', 'Angry',
                'Hysterical', 'Frustrated', 'Sad', 'Confident', 'Embarrassed', 'Happy', 'Mischievous',
                'Disgusted', 'Frightened', 'Enraged', 'Ashamed', 'Cautious', 'Smug', 'Depressed',
                'Overwhelmed', 'Hopeful', 'Lonely', 'Lovestruck', 'Jealous', 'Bored', 'Surprised',
                'Anxious', 'Shocked', 'Shy' ];

var archTypes = ['The Innocent',
                 'The Orphan/Regular Guy or Gal',
                 'The Hero',
                 'The Caregiver',
                 'The Explorer',
                 'The Rebel',
                 'The Lover',
                 'The Creator',
                 'The Jester',
                 'The Sage',
                 'The Magician',
                 'The Ruler'];

function polygon(x,y, h, top, bottom) {
  push();
  translate(x,y);
  quad( -(top/2), -(h/2),
         (top/2), -(h/2),
         (bottom/2), (h/2),
        -(bottom/2), (h/2) );

  pop();
}

function randomCharacter(x,y) {
    var headHeight = random(20, maxHeight/2);
    var headWidth = random(20, maxWidth);
    var headShape = Math.floor(random(2)); // 0,1

    var bodyHeight = random(20, maxHeight - headHeight);
    var bodyWidth = random(20, maxWidth);
    var bodyShape = Math.floor(random(2)); // 0,1

    var arch = Math.floor(random( archTypes.length));
    var object = Math.floor(random( objects.length));
    var emotion = Math.floor(random( emotions.length));

    noFill();
    stroke(230);

    push();
    translate(x + (maxWidth/2) + padding, y+padding);

    switch( headShape) {
      case 0:
        ellipse( 0, headHeight/2, headWidth, headHeight);
        break;
      case 1:
        polygon( 0, headHeight/2 , headHeight, random(50,headWidth) , random(50,headWidth));
        break
    }

    switch( bodyShape) {
      case 0:
        ellipse( 0, headHeight + (bodyHeight/2) , bodyWidth, bodyHeight);
        break;
      case 1:
        polygon( 0, headHeight + (bodyHeight/2), bodyHeight, random(50,100) , random(100,200));
        break
    }

    textAlign(CENTER, CENTER);
    fill(90);
    text( archTypes[arch], 0, -(padding/2));
    text( emotions[emotion] + " with a " + objects[object], 0, -(padding/2)-15);

    pop();
}


function setup() {
    canvas = createCanvas(1100, 800, P2D);
    canvas.parent('sketch'); 

    mousePressed();
    
    if (PDF) {
    pdf = createPDF();
    pdf.beginRecord();
    } 

}

function mousePressed() {
  background(255); 
  for (var x=0; x < width-maxWidth; x+=(maxWidth+(padding*2))) {
    for (var y=0; y< height-maxHeight; y+=(maxHeight+(padding*2))) {
      randomCharacter(x,y);
    }
  }
}

function draw() {

  if (PDF) {
  mousePressed();
    pageCount++;
      if (pageCount == PDF_PAGES) {
          noLoop();
          pdf.save({width: " letter ", height: " landscape "});
      }
    pdf.nextPage();
  }
}
