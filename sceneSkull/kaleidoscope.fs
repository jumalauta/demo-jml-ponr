in vec2 texCoord;
out vec4 fragColor;
uniform sampler2D texture0;
#define M_PI 3.1415926535897932384626433832795
uniform float kaleidoscopeXangle;
uniform vec2 coordBias;

vec2 kaleidoscope(vec2 coord, float angle) {
    float a = abs(mod(atan(coord.s,coord.t),angle*2.0)-angle);
    float dist = length(coord);
    coord.s = sin(a)*dist;
    coord.t = cos(a)*dist;
    return coord;
}

void main()
{
    vec2 coord = texCoord + coordBias;
    coord.x = mod(coord.x, 1.0);
    coord.y = mod(coord.y, 1.0);
    coord = kaleidoscope((2.0 * coord - 1.0),  M_PI / kaleidoscopeXangle);
    fragColor = texture(texture0, coord);
}
