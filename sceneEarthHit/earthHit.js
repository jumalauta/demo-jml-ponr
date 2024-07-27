Demo.prototype.sceneEarthHit = function () {
    this.setScene('earthHit');
    this.addSkysphere();
    this.addEffectStarfield(0, 3*window.pattern, 5000, "multiSceneEffects/star.png", 500, 1.7);

    this.loader.addAnimation({
      "id":"explosionParent"
     ,"object":null
     ,"position":[{"x":1,"y":1,"z":1}]
     ,"scale":[{"uniform3d":1.0}]
     ,"angle": [{"degreesY":0,"degreesZ":-45,"degreesX":0}]
   });

   this.loader.addAnimation({
    "parent":"explosionParent",
    "start":window.biitti*8,
    "additive":true,
    "billboard":true,
    "perspective":"3d",
    "image": ["multiSceneEffects/tex_nuke.png"],
    "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
    "scale":[{"uniform3d":0.0}
      ,{"duration":10,"uniform3d":2}
    ]
    ,"position":[{"x":0,"y":.5,"z":0}
      ,{"duration":10,"y":1.5}
    ]

    ,"color": [{
      "r": 1.0, "g": 0.66, "b": 0.2
    }]
  });

    this.addEffectExplosion(
      "multiSceneEffects/tex_explosionGeneric.png",
      null,                   // model
      window.biitti*8,4,  // startTime, duration
      10, 65, 1.0,  // maxDist, amount, scale
      0,0,0,        // posX, posY, posZ
      0,0,0,        // startDim
      .3,.01,0.3,   // dimX, dimY, dimZ
      0,0,0,        // xOffset, yOffset, zOffset
      "AdditiveBlending",
      "explosionParent");     // blendmode

      this.addEffectExplosion(
        "multiSceneEffects/tex_explosionGeneric.png",
        null,                   // model
        window.biitti*8,4,  // startTime, duration
        3, 25, 1.0,  // maxDist, amount, scale
        0,0,0,        // posX, posY, posZ
        0,0,0,        // startDim
        0.1,2,0.1,   // dimX, dimY, dimZ
        0,5,0,        // xOffset, yOffset, zOffset
        "AdditiveBlending",
        "explosionParent");     // blendmode

        this.addEffectExplosion(
          "multiSceneEffects/tex_explosionGeneric.png",
          null,                   // model
          window.biitti*8+.75,5,  // startTime, duration
          3, 75, 1.0,  // maxDist, amount, scale
          0,0,0,        // posX, posY, posZ
          0,0,0,        // startDim
          1,1,1,   // dimX, dimY, dimZ
          0,5,0,        // xOffset, yOffset, zOffset
          "AdditiveBlending",
          "explosionParent");     // blendmode

    this.loader.addAnimation({
      "light": {
          "type": "Directional",
          "properties": { "intensity": 10.25 },
          "castShadow": true
      }
      ,"color": [{
        "r": 1.0, "g": 1.0, "b": 1.0
      }]
      ,"position": [{
        "x": -5, "y": 3, "z": 0
      }]
    });
  
    this.loader.addAnimation([{
      "object":{
        "name":"sceneHand/fist.gltf",
        "time":3.0,
        "animations": {
          "fist":  {"weight":1.0, "timescale":1.0, "enabled":true, "loop":false}
        }
      }
      ,"color": [{
        "r": 0.35,
        "g": 0.35,
        "b": 0.35
      }]
     ,"position":[{
        "x":()=>Sync.get('Fist:PosX'),
        "y":()=>Sync.get('Fist:PosY'),
        "z":()=>Sync.get('Fist:PosZ')
      }]
     ,"angle":[{
        "degreesY":()=>Sync.get('Fist:AngleY'),
        "degreesX":()=>Sync.get('Fist:AngleX'),
        "degreesZ":()=>Sync.get('Fist:AngleZ')
      }]
     ,"scale":[{"uniform3d":.43}]
    }]);
    
    this.loader.addAnimation([{
      "object":{
        "name":"sceneEarthHit/obj_earth.obj"
      }
     ,"position":[{
        "x":0,
        "y":0,
        "z":0
      }]
     ,"angle":[{
        "degreesY":()=>-getSceneTimeFromStart()*10,
        "degreesX":0,
        "degreesZ":0
        }]
     ,"scale":[{"uniform3d":1.0}]
    }]);
 
    const cloudShader = {
      // extend generated material shader
      fragmentShaderPrefix:`
uniform float time;// = 21.0;
uniform float dark;
uniform float cloudCoverage;
uniform float blastRadius;
//uniform vec4 color;// = vec4(1);

float drawBlastRadius()
{
  vec2 uv = vMapUv.xy;
  vec2 position = vec2(0.5,0.9);
  float radius = blastRadius;

	if (radius <= 0.)
	{
		return 0.;
	}

  vec2 circleDeform = vec2(0.008,0.008);
	vec2 deformUv = uv;
	deformUv.x += sin(uv.y*time+time*2.)*circleDeform.x;
	deformUv.y += cos(uv.x*time+time*2.)*circleDeform.y;

	float distance = length(position - deformUv);
	float circleDistance = distance - radius;
	if (circleDistance < radius)
	{
    return 1.0-min(distance/1.0,1.0);
	}

	return 0.;
}

float random(in vec2 p) {
  return fract(cos(dot(p,
      vec2(16.12327, 27.4725))) *
      29322.1543424);
}

float noise(in vec2 p) {

  vec2 i = floor(p);
  vec2 f = fract(p);
 
  float a = random(i);
  float b = random(i + vec2(1., 0.));
  float c = random(i + vec2(0., 1.));
  float d = random(i + vec2(1., 1.));
 
  vec2 u = smoothstep(0., 1., f);
 
  return mix(a, b, u.x) +
      (c - a) * u.y * (1.0-u.x) +
      (d - b) * u.x * u.y;

}

#define OCTAVES 12

float fbm(in vec2 p,float blast) {

  float shift = time/3.;

  float value = 0.;
  float amp = .5+blast*0.25;
 
  for (int i = 0; i < OCTAVES; i++) {
 
      value += amp * noise(p  + shift);
      p *= 2.+blast*5.0;
      amp *= .5;
 
  }
 
  return value;
}

float repFbm(in vec2 p, int l,float blast) {
 
  float o = 0.;
   o = fbm(vec2(p+o),blast);

  return o;
 
}

const vec3 col3 = vec3(1.0),
         col2 = vec3(1.0),
         col1 = vec3(0.0, 0.0,1.0);

void drawClouds()
{
  vec2 uv = vMapUv.xy*16.;

  float blast = drawBlastRadius();
  float v = repFbm(uv, 3,blast);

  vec3 col = mix(col1,col2,clamp(v/3.,0.,.5));
     
  col = mix(col,col3,mix(v*3.,.2,.66));

  float gray = (col.r + col.g + col.b) / 3.0;
  float diffCoverage = blast * 0.15 * 0.0;
  if  (gray < cloudCoverage - diffCoverage) {
      discard;
  }
  vec2 uv2 = vMapUv*2.5;
  uv2.x = mod(uv2.x+time*0.2, 1.0);
  uv2.y = mod(uv2.y+time*0.1, 1.0);
  gl_FragColor *= vec4(mix(vec3(gray),texture(map,uv2).rgb,1.0)*dark, 1.0);
}
      `,
      fragmentShaderSuffix:`
        drawClouds();
      `
    };

    // cloud shadow
    window.sceneEarthHitCloudBlastRadius = 0.85;
    this.loader.addAnimation({
      object: "sceneEarthHit/clouds.png",
      shape: { type: 'SPHERE', radius: 2.0 },
      color: [{a:0.4}],
      angle: [{degreesY:-40+2,degreesX:1}],
      shader:{...cloudShader,
        variable:
        [
          {name:"dark","value":[()=>0.0]},
          {name:"cloudCoverage","value":[()=>0.85]},
          {name:"blastRadius","value":[()=>window.sceneEarthHitCloudBlastRadius]}
        ]
      }
      ,runFunction: (animation) => {
        const time = getSceneTimeFromStart()-animation.start;
        const start = 5.5;
        if (time > start) {
          const duration = 22;
          window.sceneEarthHitCloudBlastRadius = Math.min((time-start)/duration,1.0);
        } else {
          window.sceneEarthHitCloudBlastRadius = 0.0;
        }
      }
    });
    // cloud
    this.loader.addAnimation({
      object: "sceneEarthHit/clouds.png",
      shape: { type: 'SPHERE', radius: 2.07 },
      color: [{a:0.7}],
      angle: [{degreesY:-40}],
      shader:{...cloudShader,
        variable:
        [
          {name:"dark","value":[()=>0.85]},
          {name:"cloudCoverage","value":[()=>0.85]},
          {name:"blastRadius","value":[()=>window.sceneEarthHitCloudBlastRadius]}
        ]
      }
    });

    this.loader.addAnimation({
      id:'ship',"object":null
      ,"position":[{"x":0,"y":0,"z":0 }]
      ,"angle":[{"degreesX":-35,"degreesZ":0,"degreesY":()=>-180}]
    });
    this.loader.addAnimation([{
      "parent":'ship',
      "object":{
        "name":"sceneEarthHit/jaerjan.obj"
      } 
      ,"position":[{"x":0,"y":0,"z":-2 },{"duration":5},{"duration":2,"z":-1.8}]
      ,"angle":[{"degreesX":()=>-90+Math.cos(getSceneTimeFromStart()*5)*1,"degreesZ":0,"degreesY":()=>Math.sin(getSceneTimeFromStart()*10)*1+180}]
      ,"scale":[{"uniform3d":.05}]
      
      ,"color": [{
        "r": 1.0,
        "g": 0.2,
        "b": 0.2
      }]
    }]);

    const bpm = 120;
    const beat = 60/bpm;  
    this.addRainbowExplotion(0,5*beat,true);
}
  