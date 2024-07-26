in vec2 texCoord;
out vec4 fragColor;
uniform sampler2D texture0;
uniform sampler2D texture1;
uniform float time;

#define M_PI 3.14159265358979323844

void main()
{    
    vec2 coord = texCoord;
    float alpha = texture(texture0, texCoord).a;
    if (alpha < 0.93) {discard;}

    float dist2 = min(distance(texCoord, vec2(0.517, 0.5)), 1.0);
    if (dist2 < 0.37) {
      fragColor = vec4(vec3(0.0), 1.0);
      return;
    }

    float dist = 1.0-min(distance(coord, vec2(0.5, 0.5))*0.7, 1.0);
    coord.s += (sin(coord.t*3.0 + time*5.0)*0.03)*(coord.t-0.5)*dist;
    coord.t += (cos(coord.s*20.0 + time*5.3)*0.03)*(coord.t-0.5)*dist;

    vec2 uv = coord;
    vec2 x = uv - vec2(0.5);
    uv.x = atan(x.x, x.y) * 0.5 / M_PI + 0.5;

    float col = texture(texture1,mod(vec2(uv.x,time*0.05-uv.y),vec2(1.0))).x;    
    fragColor = vec4(((vec3(clamp(col*1.8,0.0,1.0)))),1.0) * alpha;
}

