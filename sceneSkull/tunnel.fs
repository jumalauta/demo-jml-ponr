in vec2 texCoord;
out vec4 fragColor;
uniform sampler2D texture0;
uniform vec4 color;// = vec4(1.0, 1.0, 1.0, 1.0);
uniform float timeScale;
uniform float time;


void main()
{

	float leghtMod = 1.0;
	float uvMod = 1.0;

	vec2 uv = 2.0*texCoord - 1.0;
	uv *= uvMod;

	float rad = leghtMod*length (uv);
	float ang = atan(uv.x, uv.y);
	vec2 tunnelUv = vec2(1.0/rad + time, ang); 

	// kreisi 	vec2 tunnelUv = vec2(1.0/rad + time, ang+sin(uv.y*time*15.)); 

	
	tunnelUv.x = mod(tunnelUv.x,1.0);
	tunnelUv.y = mod(tunnelUv.y,1.0);

	tunnelUv *= 1.0; // joku arvo
	vec4 outColor = texture2D(texture0, tunnelUv);

	fragColor = outColor*color;
}