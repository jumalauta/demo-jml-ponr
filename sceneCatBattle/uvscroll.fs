in vec2 texCoord;
out vec4 fragColor;
uniform sampler2D texture0;
uniform vec4 color;
uniform float time;
uniform float fakeTime;
uniform float timeScale;
uniform float tiling;
uniform float kolor;
void main()
{
    vec2 coord=texCoord;

    coord.s=mod(coord.s+fakeTime*timeScale,1.0);
    fragColor = texture2D(texture0, coord);
    fragColor.rgb*=kolor;
}
