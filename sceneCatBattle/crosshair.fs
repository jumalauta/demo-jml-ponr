in vec2 texCoord;
out vec4 fragColor;

uniform sampler2D texture0;
uniform vec4 color; // = vec4(1,1,1,1);
uniform float time; // = 0.0;

mat2 rotateZ(float angleDeg)
{
  float angleRad = radians(angleDeg);
  mat2 rot = mat2(vec2(cos(angleRad), sin(angleRad)), vec2(-sin(angleRad), cos(angleRad)));
  return rot;
}

float circle(vec2 coord, float size)
{
  return length(coord)-size;
}

float rect(vec2 p, vec2 b)
{
  vec2 d = abs(p) - b;
  return min(max(d.x,d.y),0.0) + length(max(d,0.0));
}

float circleLine(vec2 p, float innerRadius, float outerRadius)
{
  return max(circle(p, outerRadius),abs(circle(p, innerRadius)));
}

float bigCrossHairLine(vec2 p, float degreesZ)
{
  p *= rotateZ(degreesZ);
  float d = 1.;
  d = min(d, rect(p - vec2(-0.3, 0.0), vec2(0.2, 0.001)));
  d = min(d, rect(p - vec2(-0.24, 0.0), vec2(0.001, 0.05)));
  d = min(d, rect(p - vec2(-0.34, 0.0), vec2(0.001, 0.02)));
  d = min(d, rect(p - vec2(-0.44, 0.0), vec2(0.001, 0.05)));

  return d;
}

float bigCrossHair(vec2 p)
{
  float d = circleLine(p, 0.4-0.01, 0.4);
  d = min(d, bigCrossHairLine(p, 0.0));
  d = min(d, bigCrossHairLine(p, 90.0));
  d = min(d, bigCrossHairLine(p, 90.0*2.));
  d = min(d, bigCrossHairLine(p, 90.0*3.));
  return d;
}


float littleCrossHairLine(vec2 p, float degreesZ)
{
  p *= rotateZ(degreesZ);
  float d = 1.;
  d = min(d, rect(p - vec2(-0.24, 0.0), vec2(0.18, 0.001)));

  return d;
}

float littleCrossHair(vec2 p, float degreesZ)
{
  p *= rotateZ(degreesZ);
  float d = circleLine(p, 0.15-0.01, 0.15);
  d = min(d, littleCrossHairLine(p, 0.0));
  d = min(d, littleCrossHairLine(p, 90.0));
  d = min(d, littleCrossHairLine(p, 90.0*2.));
  d = min(d, littleCrossHairLine(p, 90.0*3.));
  return d;
}


void mainImage( vec2 fragCoord )
{
float rotation = 0.0;
float scale = 1.0;
float x = 0.0;
float y = 0.0;

  vec2 iResolution = vec2(512.0, 512.0);
    vec2 uv = fragCoord.xy / iResolution.xy;
    vec2 aspectRatio = vec2(iResolution.x/iResolution.y, -1.0);
    vec2 coord = aspectRatio * (uv - vec2(0.5));

    float d = bigCrossHair(coord);

    vec3 col = vec3(0);//0.5 + 0.5*cos(time+uv.xyx+vec3(0,2,4));

    col = sign(d)*col;
    vec3 shapeColor = vec3(0.9,0.9,0.9);

    col = mix(col, shapeColor, 1.0-smoothstep(0.0,0.01,d));

    fragColor = vec4(col,col.r);

  d = littleCrossHair(coord-vec2(sin(time*3.)*0.03,cos(time*2.5+sin(time*2.0))*0.03), sin(time*3.)*6.);

	
    col = vec3(0);//0.5 + 0.5*cos(time+uv.xyx+vec3(0,2,4));

    col = sign(d)*col;
    shapeColor = vec3(0.9,0.9,0.9);

    col = mix(col, shapeColor, 1.0-smoothstep(0.0,0.01,d));

    fragColor = clamp(fragColor + vec4(col,col.r), vec4(0.0), vec4(1.0))*color;
  }

void main()
{
  vec2 iResolution = vec2(512.0, 512.0);
    vec2 fragCoord = texCoord * iResolution;
    mainImage(fragCoord);
}
