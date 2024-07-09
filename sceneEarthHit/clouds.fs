
in vec2 texCoord;
out vec4 fragColor;


uniform sampler2D texture0;
uniform float time;// = 21.0;
uniform vec4 color;// = vec4(1);
#define speed 0.0
#define speedY 0.3
#define video 0.0
#define value1 1.0
#define value2 0.5
#define value3 2.0
#define value4 2.0
#define contrast 0.025
#define alpha 1.0


float random(in vec2 p) {
    return fract(cos(dot(p,
        vec2(16.12327, 27.4725))) *
        29322.1543424);
}

float noise(in vec2 p) {

    vec2 i = floor(p);
    vec2 f = fract(p);
   
    float a = random(i);
    float b = random(i + vec2(1., 0.));
    float c = random(i + vec2(0., 1.));
    float d = random(i + vec2(1., 1.));
   
    vec2 u = smoothstep(0., 1., f);
   
    return mix(a, b, u.x) +
        (c - a) * u.y * (1.0-u.x) +
        (d - b) * u.x * u.y;

}

#define OCTAVES 12

float fbm(in vec2 p) {




    float t = time / 10.;
    mat2 rot = mat2(
        cos(t), -sin(t),
        sin(t), cos(t)
    );
   
    float shift = time/3.;

    float value = 0.;
    float amp = .5;
    float freq = 10.;
   
    for (int i = 0; i < OCTAVES; i++) {
   
        value += amp * noise(p  + shift);
        p *= 2.;
        amp *= .5;
   
    }
   
    return value;
}

float repFbm(in vec2 p, int l) {
   
    float o = 0.;
     o = fbm(vec2(p+o));

    return o;
   
}

const vec3 col3 = vec3(1.0),
           col2 = vec3(1.0),
           col1 = vec3(0.0, 0.0,1.0);

uniform float dark;
uniform float cloudCoverage;

void main()
{
    vec2 uv = texCoord.xy*8.;
	
    float v = repFbm(uv, 3);

    vec3 col = mix(col1,col2,clamp(v/3.,0.,.5));
       
    col = mix(col,col3,mix(v*3.,.2,.66));

    // Output to screen
    //discard;
    float gray = (col.r + col.g + col.b) / 3.0;
    if  (gray < cloudCoverage) {
        discard;
    }
    fragColor = vec4(vec3(gray), dark);
}