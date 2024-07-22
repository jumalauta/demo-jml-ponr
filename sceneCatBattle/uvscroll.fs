in vec2 texCoord;
out vec4 fragColor;
uniform sampler2D texture0;
uniform vec4 color;
uniform float time;

void main()
{
    vec2 coord=texCoord;
    coord.s=mod(coord.s+0.015*time,1.0);
    fragColor = texture2D(texture0, coord) * color;
}
