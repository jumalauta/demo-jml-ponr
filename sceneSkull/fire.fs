in vec2 texCoord;
out vec4 fragColor;
uniform sampler2D texture0;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform float time;
uniform vec4 color;
#define M_PI 3.1415926535897932384626433832795

uniform float fireSlide;// = 8.;

void smoke() {
  vec2 coord = texCoord;
  coord.s += (sin(coord.t*8.0 + time*1.0)*0.032)*(coord.s-0.5);
  coord.t += (cos(coord.s*50.0 + time*0.3)*0.025)*(coord.t-0.5);

  float r = -coord.y;

  int steps = 5;
  for(int i = 0; i < steps; i++)
  {
    float f = float(i+1);
    vec2 newCoord = mod(((coord-vec2(time*0.003*coord.y,time*0.2))*pow(3., f)*0.3), vec2(1.));
    r += (10./pow(2., f)) * texture2D(texture1, newCoord)[int(mod(float(i),3.))];
  }
  r = clamp(r, 0., float(steps));

  fragColor = clamp(vec4(vec3(r*r)*(1.0-coord.y)*0.3, 1.), vec4(0.), vec4(1.));

  float alphaThreshold = 0.1;
  if (fragColor.r+fragColor.g+fragColor.b < alphaThreshold) {
    fragColor.a = 0.;
  }
}
void fire() {
  vec2 coord = texCoord;
  coord.s += (sin(coord.t*8.0 + time*1.0)*0.012)*(coord.s-0.5);
  coord.t += (cos(coord.s*50.0 + time*0.3)*0.015)*(coord.t-0.5);

  float r = 3. - length(fireSlide*coord.y)*2.;

  int steps = 5;
  for(int i = 0; i < steps; i++)
  {
    float f = float(i+1);
    vec2 newCoord = mod(((coord-vec2(time*0.003*coord.y,time*0.2))*pow(2., f)*0.9), vec2(1.));
    r += (10./pow(2., f)) * texture2D(texture1, newCoord)[int(mod(float(i),3.))];
  }
  r = clamp(r, 0., float(steps));

  fragColor += clamp(vec4(r, r*r*0.2, r*r*0.1, 1.), vec4(0.), vec4(1.));

  float alphaThreshold = 0.1;
  if (fragColor.r+fragColor.g+fragColor.b < alphaThreshold) {
    fragColor.a = 0.;
  }
}

void main()
{    
  smoke();
  fire();

  fragColor *= color;
}

