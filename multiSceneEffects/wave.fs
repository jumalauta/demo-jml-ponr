in vec2 texCoord;
out vec4 fragColor;
uniform sampler2D texture0;
uniform vec4 color;
uniform float time;
uniform float strength;
void main()
{
    float t = time*2.0;
    vec2 coord=texCoord;

    coord.s += (sin(coord.t*20.0 + t*0.7)*0.025)*(coord.s-0.5);
    coord.t += (cos(coord.s*8.0 + t*0.6)*0.025)*(coord.t-0.5);

    fragColor = texture2D(texture0, coord) * color;

}
