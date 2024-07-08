in vec2 texCoord;
out vec4 fragColor;

uniform sampler2D texture0;
uniform sampler2D texture1;

// WARNING: This function requires that lut texture is initiated using mag NearestFilter (instead of default LinearFilter)
// example: settings.demo.image.texture.magFilter = 'NearestFilter';

vec4 sampleAs3DTexture(sampler2D tex, vec3 uv, float width) {
    float innerWidth = width - 1.0;
	float sliceSize = 1.0 / width;              // space of 1 slice
    float slicePixelSize = sliceSize / width;           // space of 1 pixel
    float sliceInnerSize = slicePixelSize * (innerWidth);  // space of width pixels
    float zSlice0 = min(floor(uv.z * width), innerWidth);
    float zSlice1 = min(zSlice0 + 1.0, innerWidth);

    float xOffset = slicePixelSize * 0.5 + uv.x * sliceInnerSize;

    float s0 = xOffset + (zSlice0 * sliceSize);
    float s1 = xOffset + (zSlice1 * sliceSize);

	float yPixelSize = sliceSize;
	float yOffset = yPixelSize * 0.5 + uv.y * (1.0 - yPixelSize);

    vec4 slice0Color = texture2D(tex, vec2(s0, yOffset));
    vec4 slice1Color = texture2D(tex, vec2(s1, yOffset));
    float zOffset = mod(uv.z * width, 1.0);
    vec4 result = mix(slice0Color, slice1Color, zOffset);
    return result;
}
void main()
{

    vec4 color2 = texture2D(texture0, texCoord.st);

    color2.y = 1.0 - color2.y;

	vec4 target = sampleAs3DTexture(texture1,color2.rgb,16.);
    fragColor = min(target*1.1,vec4(1.0));
}