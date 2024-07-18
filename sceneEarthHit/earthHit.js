
Demo.prototype.sceneEarthHit = function () {
    this.setScene('earthHit');
    this.addEffectStarfield();

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
//uniform vec4 color;// = vec4(1);

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

float fbm(in vec2 p) {




  float t = time / 10.;
  mat2 rot = mat2(
      cos(t), -sin(t),
      sin(t), cos(t)
  );
 
  float shift = time/3.;

  float value = 0.;
  float amp = .5;
  float freq = 10.;
 
  for (int i = 0; i < OCTAVES; i++) {
 
      value += amp * noise(p  + shift);
      p *= 2.;
      amp *= .5;
 
  }
 
  return value;
}

float repFbm(in vec2 p, int l) {
 
  float o = 0.;
   o = fbm(vec2(p+o));

  return o;
 
}

const vec3 col3 = vec3(1.0),
         col2 = vec3(1.0),
         col1 = vec3(0.0, 0.0,1.0);

void drawClouds()
{
  vec2 uv = vMapUv.xy*16.;

  float v = repFbm(uv, 3);

  vec3 col = mix(col1,col2,clamp(v/3.,0.,.5));
     
  col = mix(col,col3,mix(v*3.,.2,.66));

  float gray = (col.r + col.g + col.b) / 3.0;
  if  (gray < cloudCoverage) {
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
    this.loader.addAnimation({
      object: "sceneEarthHit/clouds.png",
      shape: { type: 'SPHERE', radius: 2.0 },
      color: [{a:0.4}],
      angle: [{degreesY:()=>2,degreesX:()=>1}],
      shader:{...cloudShader,
        variable:
        [
          {name:"dark","value":[()=>0.0]},
          {name:"cloudCoverage","value":[()=>0.85]}
        ]
      }
    });
    // cloud
    this.loader.addAnimation({
      object: "sceneEarthHit/clouds.png",
      shape: { type: 'SPHERE', radius: 2.03 },
      color: [{a:0.7}],
      shader:{...cloudShader,
        variable:
        [
          {name:"dark","value":[()=>0.85]},
          {name:"cloudCoverage","value":[()=>0.85]}
        ]
      }
    });
}
  