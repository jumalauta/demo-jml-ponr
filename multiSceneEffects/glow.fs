in vec2 texCoord;
out vec4 fragColor;
uniform sampler2D texture0;
uniform vec4 color;// = vec4(1.0, 1.0, 1.0, 1.0);

uniform vec2 direction; // = vec2(1.,0.);
uniform int samples; // = 20;
uniform float spread; // = 0.004;
uniform float intensity; // = 0.08;

vec4 glow()
{
  int showOnlyGlow = 0;
  float alpha = 1.0;

	vec4 sum = vec4(0.,0.,0.,0.);
	vec2 coord = texCoord.st;

	for (int i = 0; i < samples; i++)
	{
    float decay = (1.0-abs(float(i))/float(samples));
    vec2 position = float(i) * direction * spread;
    sum += texture2D(texture0, coord + position) * decay;
    sum += texture2D(texture0, coord - position) * decay;
	}

	if (showOnlyGlow == 0)
	{
		sum += texture2D(texture0, coord);
	}

	sum *= intensity;
	sum.a = alpha;
	
	return sum * color;
}

void main()
{
    fragColor = glow();
}
