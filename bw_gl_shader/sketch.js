// this time we're going to send an image to the shader
// in shaderland, an image is called a "texture"
// https://p5js.org/reference/#/p5.Shader/setUniform

// a shader variable
let uniformsShader;
let l1,l2;
let count;

function preload(){
  // load the shader
  //uniformsShader = loadShader('basic.vert', 'basic.frag');
  uniformsShader = loadShader('basic.vert' ,'basic.frag');
  l1 = loadImage('l1.png');
  l2 = loadImage('l2.png');
  count=1.0;
}

function setup() {
  // shaders require WEBGL mode to work
  l1.resize( windowWidth, windowHeight);
  l2.resize( windowWidth, windowHeight);
  createCanvas(l1.width, l1.height, WEBGL);
  noStroke();
}

function draw() {  
  background(190);
  // shader() sets the active shader with our shader
  shader(uniformsShader);

  // setUniform can also send an image to a shader
  // 'cactiTex' is the name of the variable in our shader
  // cactiImg, is a normal p5 image object
  uniformsShader.setUniform('l1', l1);
  uniformsShader.setUniform('l2', l2);
  uniformsShader.setUniform('c1', map( sin(radians(count)), -1,1, 1,0));
  uniformsShader.setUniform('c2', map( sin(radians(count)), -1,1, 0,1));

  
  count++;
  // rect gives us some geometry on the screen
  rect(0,0,width, height);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
