in vec2 texCoord;
out vec4 fragColor;
uniform sampler2D texture0;
uniform vec4 color;
uniform float time;
uniform float shiftHue;
uniform float shiftSaturation;
uniform float shiftValue;

vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main()
{
    vec2 coord=texCoord;
    fragColor = texture2D(texture0, coord);
    vec3 hsv = rgb2hsv(fragColor.rgb);

    float centerize = distance(coord.xy, vec2(0.5,0.5));

    hsv.x = mod(hsv.x + shiftHue + centerize, 1.0);
    hsv.y = mod(hsv.y + shiftSaturation + centerize, 1.0);
    hsv.z = mod(hsv.z + shiftValue + centerize, 1.0);

    fragColor.rgb = hsv2rgb(hsv);
    fragColor *= color;
}
