in vec2 texCoord;
out vec4 fragColor;
uniform sampler2D texture0;
uniform float time;
uniform vec4 color;

uniform float invert; // = 0.0;
uniform float greenPercent; // = 0.5;
uniform float yellowPercent; // = 0.2;
uniform float redPercent; // = 0.3;

void main()
{
    vec2 coord = texCoord;

    fragColor = texture(texture0, coord);

    float x = coord.x;
    if (invert == 1.0) {
      x = 1.0 - x;
    }
    if (x < greenPercent) {
        fragColor = vec4(1.0, 0.0, 0.0, 1.0);
    } else if (x < greenPercent + yellowPercent) {
        fragColor = vec4(0.2, 0.2, 0.2, 1.0);
    } else if (x < greenPercent + yellowPercent + redPercent) {
        fragColor = vec4(0.2, 0.2, 0.2, 1.0);
    }
    fragColor.rgb *= 1.0-distance(coord.y, 0.5);
    
    fragColor *= color;
}
