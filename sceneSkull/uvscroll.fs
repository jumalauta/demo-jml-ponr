in vec2 texCoord;
out vec4 fragColor;
uniform sampler2D texture0;
uniform vec4 color;
uniform float time;
uniform vec2 direction;

void main()
{
    vec2 coord=texCoord;
    coord*=2.0;
    coord.x=mod(coord.x+(time*direction.x),1.0);
    coord.y=mod(coord.y+(time*direction.y),1.0);
    fragColor = texture2D(texture0, coord) * color;
    
}
