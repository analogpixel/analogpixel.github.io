
var sentence = ['there','was','once', 'a','cat', 'in', 'a', 'hat', 'how','about', 'that'];
//var sentence = ['theresjdf1','theresjdf2','theresjdf3','theresjdf4','theresjdf5','theresjdf6','theresjdf7','theresjdf8'];
var wordObjects = [];
var oldObjects = [];
var currentObject;

var tl;
var gx;
var gy;
var wordPos=0;
var fontSize = 32;
var fontSpace= 16;
var font;
var overlay;
var margin = 30;

function ranNumbers(x) {
     return Array(x).fill(0).map( () => Math.floor( Math.random() * 2))
}

function ranLetters(x) {
     return Array(x).fill(0).map( () => String.fromCharCode( 65 + Math.floor( Math.random() * 57)));
}

function preload() {
  font = loadFont('F25_Bank_Printer_Bold.otf');
  overlay = loadImage('greenScreen.png');
}

function setup() {
    createCanvas(800, 800);
    frameRate(10);
    textFont(font)
    textSize(fontSize);
    overlay.resize(width, height);

    gx = margin;
    gy = 80;
    sentence.forEach( (w) =>  addWord(w)  );
    console.log( wordObjects);
    tl = new TimelineLite();
    tl.eventCallback('onComplete', nextWord);
    nextWord();
}

function drawText() {
  fill("#66ff66");

  // draw all the previous words
  oldObjects.forEach( (w) => { 
    text( w.word, w.x, w.y);
  });

  const {x,y,count,stage,word} = currentObject;

  switch( stage) {
    case 0:
      text(ranNumbers(16).join(''), x,y);
      break;
    case 1:
      text(ranLetters(count).join(''), x,y);
      if (count > word.length) { 
        currentObject.count--;
      }
      break;
    case 2:
      text( word,x,y);
      break;
  }
}

function addWord(word) {

  var wordLen =  font.textBounds(word, 0,0, fontSize).w + fontSpace;

  // move the gx,gy pointer
  if (gx + wordLen  > width-margin) {
    gy += fontSize;
    gx = margin;
    wordObjects.push( {word: word, x: gx, y:gy, stage: 0, count: 16 } ) ;
    gx += wordLen;
  } else {
    wordObjects.push( {word: word, x: gx, y:gy, stage: 0, count: 16 } ) ;
    gx += wordLen;
  }
}

function nextWord() {
  if ( wordObjects.length > 0) {
  oldObjects.push( { ... currentObject } );
  currentObject = wordObjects.shift();
  tl.to(currentObject,  3, {stage:2, ease: SteppedEase.config(2)});
  }
}

function draw() {
 
  background(40,90,40,130);
  
  // draw all the previous words
  fill("#66ff66");
  oldObjects.forEach( (w) => { 
    text( w.word, w.x, w.y);
  });


  // draw some scan lines or whatnot
  stroke(0,90,0,250);
  for (var y=0; y< height; y+=10) {
    var z = random(0,2);
    line(0,y+z, width, y+z);   
  }

  drawText();

  // draw a reflection
  noStroke();
  fill(90,10);
  rect(width/2+90, 0, width/2, height);

  image(overlay,0,0);
}
