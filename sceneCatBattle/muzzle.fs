in vec2 texCoord;
out vec4 fragColor;
uniform sampler2D texture0;
uniform vec4 color;
uniform float time;

void main()
{
    float t = floor(time*100.0);
    vec2 coord=texCoord;

    coord.s += (sin(coord.t*8.0 + t*1.0)*0.0122)*(coord.t-0.5);
    coord.t += (cos(coord.s*50.0 + t*0.3)*0.0125)*(coord.t-0.5);

    fragColor = texture2D(texture0, coord) * color;

}
