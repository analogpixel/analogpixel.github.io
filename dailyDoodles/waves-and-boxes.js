var el;
var m=0;
var freq=10;
var amp=100;

var MESH_WIDTH=80;
var MESH_HEIGHT=40;
var MESH_SIZE=80;

var mesh;
var cam;

var counters;

class Mesh {
  constructor(mesh_width, mesh_height, mesh_size) {
    this.width = mesh_width;
    this.height = mesh_height;
    this.size = mesh_size;
    this.mesh = new Array( this.width * this.height).fill(0);
  }

  set(x,y,z) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.mesh[x + y * this.width] = z; 
    }
  }

  get(x,y) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      return this.mesh[x + y * this.width];
    } else {
      return 0;
    }
  }

  display() {
    background(90);
    for (var x=0; x < this.width; x++) {
      for (var y=0; y< this.height;y++) {
        push()
        // console.log(x,y, this.get(x,y));
        translate(x*this.size, y*this.size, this.get(x,y));
        if (x %2 == 0 && y %2 == 1) {
        specularMaterial( 0);
        } else {
        specularMaterial( 0  + (y*10) );
        }
        box(this.size*1,this.size*1, 16,5);
        pop();
      }
    }

  }

}

function setup() {
   var canvas = createCanvas(800, 800,WEBGL);
   canvas.parent('sketch'); 

   cam = createCamera();
   mesh = new Mesh(MESH_WIDTH,MESH_HEIGHT,MESH_SIZE);
  counters = new Array([0,1,100], [0,.1,10], [0,1,1000]);
  mesh.display();

}

function update() {
  counters.forEach( (f) => {
    f[0] += f[1];
    if (f[0] > f[2]) {f[1] = f[1] * -1;}
    if (f[0] < -f[2]) {f[1] = f[1] * -1;}
  });

 freq = counters[1][0];
  amp = counters[2][0];
}

function draw() {
  cam.setPosition( (MESH_WIDTH*MESH_SIZE)/2 ,(MESH_WIDTH*MESH_SIZE)/2, 900 );
  cam.lookAt( (MESH_WIDTH*MESH_SIZE)/2 ,(MESH_WIDTH*MESH_SIZE)/2, -400 );
  //cam.pan(radians(352));
  cam.tilt(radians(-65));
  setCamera(cam);
  mesh.display();
  
  update();

  for (var x=0; x < MESH_WIDTH; x++) {
    for (j=0; j < 50; j++) {
      var y =  (amp-(j*20))  * sin( radians(freq * x) + radians(m) );
      mesh.set(x,j,y); 
    }
  }

}
