precision mediump float;

// we need our texcoords for drawing textures
varying vec2 vTexCoord;

// images are sent to the shader as a variable type called sampler2D
uniform sampler2D l1;
uniform sampler2D l2;
uniform float c1;
uniform float c2;

void main() {
  // by default, our texcoords will be upside down
  // lets flip them by inverting the y component
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;

  // we can access our image by using the GLSL shader function texture2D()
  // texture2D expects a sampler2D, and texture coordinates as it's input
  vec4 l1tex = texture2D(l1, uv);
  vec4 l2tex = texture2D(l2, uv);


  // lets invert the colors just for fun
  //cactus.rgb = 1.0 - cactus.rgb;
	if (l1tex.r < 0.1) {
		gl_FragColor = vec4(c1,c1,c1,1.0);
	}

	if (l2tex.r < 0.1) {
		gl_FragColor = vec4(c2,c2,c2,1.0);
	}
}
