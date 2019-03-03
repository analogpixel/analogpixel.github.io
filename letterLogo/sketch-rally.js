
var data = "Individuals and interactions over processes and tools Working software over comprehensive documentation Customer collaboration over contract negotiation Responding to change over following a plan";
var img;
var fontSize=10;
var text;
var i = 0;

function preload() {
  img = loadImage("rally-small.png");
}

function setup() {
    //img.resize(img.width/2,img.height/2); 
    createCanvas(img.width*fontSize, img.height*fontSize);
  textData = data.split('');     
}
 
function draw() {
  textSize( fontSize);
  i = 0;
    for (var y=0; y< img.height; y++) {
  for (var x=0; x < img.width;x++) {
      //fill(255,0,0);
      if (img.get(x,y)[0] > 0) {
        fill( img.get(x,y) );
        text(textData[i], x*fontSize, y*fontSize);
        i++;
        if (i > textData.length) { i = 0; }
        //rect(x*fontSize, y*fontSize, fontSize,fontSize);
      }
    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
  save();
  }
}
