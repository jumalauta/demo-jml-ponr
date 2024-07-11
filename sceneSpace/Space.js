const bpm = 120;
const beat = 60/bpm;

Demo.prototype.addHandFlyTrail = function () {
  const trailShader = {
    // extend generated material shader
    fragmentShaderPrefix:`
uniform float timePercent;
uniform float time;// = 21.0;
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

  float shift = time * 0.1;

  float value = 0.;
  float amp = .38;
  float freq = 4.;
 
  for (int i = 0; i < OCTAVES; i++) {
 
      value += amp * noise(p  * shift);
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
  float dark = 0.95;
  float cloudCoverage = 0.85;


  vec2 uv = vMapUv.xy*30.;
  uv.y -= time*10.0;

  float v = repFbm(uv, 3);

  vec3 col = mix(col1,col2,clamp(v/3.,0.,.5));
     
  col = mix(col,col3,mix(v*3.,.2,.66));

  float gray = (col.r + col.g + col.b) / 3.0;
  gl_FragColor.a = gray;
  if  (gray < cloudCoverage) {
      discard;
  }
  vec2 uv2 = vMapUv*2.5;
  uv2.x = mod(uv2.x+time*0.2, 1.0);
  uv2.y = mod(uv2.y+time*0.1, 1.0);
  //gl_FragColor *= vec4(vec3(gray)*dark, 1.0);
}

mat2 rotateZ(float angleDeg)
{
  float angleRad = radians(angleDeg);
  mat2 rot = mat2(vec2(cos(angleRad), sin(angleRad)), vec2(-sin(angleRad), cos(angleRad)));
  return rot;
}

void drawTrails() {
  vec2 coord = vec2(timePercent, vMapUv.y);
  coord.x *= 1.0;
  coord.x = mod(coord.x, 1.0);
  vec4 pixel = texture(map, coord)*vec4(2.0,0.8,0.8,1.0);

  coord = vMapUv * rotateZ(-90.0);
  coord.x = mod(coord.x, 0.5);
  coord.y = mod(coord.y, 0.5);
  coord = vec2(timePercent, coord.y);
  vec4 pixel2 = texture(map, coord);

  gl_FragColor = min(pixel+pixel2, vec4(1.0));
  //gl_FragColor.a = 1.0-vMapUv.y;
  drawClouds();
  float fadeTrail = 0.3;
  if (vMapUv.y > fadeTrail) {gl_FragColor.a = 1.0-min((vMapUv.y-fadeTrail)/(1.0-fadeTrail)*2.,1.0);}
  //if (gl_FragColor.g < 0.1) { gl_FragColor.a = gl_FragColor.g/0.1; discard; }
  gl_FragColor.rgb = min(gl_FragColor.rgb*1.0, vec3(1.0));
}
    `,
    fragmentShaderSuffix:`
      drawTrails();
    `
  };

  //Fly trail
  for(let i = 0; i < 1; i++) {
    this.loader.addAnimation({
      object: "spectogram.png",
      shape: { type: 'SPHERE', radius: 1.0+i*0.05 },
      color: [{a:1.0}],
      position:[{
        x:0,
        y:0,
        z:3.0
      }],
      scale:[{z:1.5,x:1.5,y:3.5}],
      "angle":[{
        "degreesY":i*20,
        "degreesX":90,
        "degreesZ":0
      }],
      //angle: [{degreesY:()=>2,degreesX:()=>1}],
      shader:{...trailShader}
    });
  }
}

Demo.prototype.addEffectSmoke = function (settings) {
  let smokes = new Array(200);

  this.loader.addAnimation({
    "image": "sceneSpace/smoke.png",
    "perspective": "3d",
    "layer": 100,
    "billboard": true,
    "additive": true,
    "instancer": {
      "count": smokes.length,
      "runInstanceFunction": (properties) => {
        const i = properties.index;
        const count = properties.count;
        const time = properties.time;
        let object = properties.object;
        let color = properties.color;

        let smoke = smokes[i];

        if (smoke === undefined || time + 5 < smoke.startTime || time > smoke.startTime + smoke.duration) {
          smokes[i] = {
            x1: settings.start.x,
            y1: settings.start.y,
            z1: settings.start.z,
            direction: {
              x: settings.direction.x + Math.random() * 0.2 - 0.1, y: settings.direction.y + Math.random() * 0.2 - 0.1, z: settings.direction.z + Math.random() * 0.2 - 0.1
            },
            startTime: time + Math.random() * (settings.duration * 2),
            duration: settings.duration + Math.random() * 0.1,
            distance: settings.distance + Math.random() * 0.1,
            scale: settings.scale + Math.random() * 0.2,
          };
          smoke = smokes[i];
        }

        const percent = (time-smoke.startTime)/smoke.duration;
        if (percent < 0) {
          color.a = 0;
          return;
        }

        const dynamicity = Math.sin(time+percent+i)*(0.1+0.1*percent)*percent;

        object.position.x = smoke.x1 + (smoke.direction.x * percent) * smoke.distance * percent + dynamicity*(1-smoke.direction.x);
        object.position.y = smoke.y1 + (smoke.direction.y * percent) * smoke.distance * percent + dynamicity*(1-smoke.direction.y);
        object.position.z = smoke.z1 + (smoke.direction.z * percent) * smoke.distance * percent + dynamicity*(1-smoke.direction.z);
    
        color.a = 0.05*(1-percent);

        const scale = 0.1 + percent * smoke.scale;
        object.scale.x = scale;
        object.scale.y = scale;
      }
    }
  });
}

Demo.prototype.addEffectPlanetSmoke = function () {
  const smokeCount = 8;
  const distance = 1;
  for(let i = 0; i < smokeCount; i++) {
    const x1 = Math.sin(i * Math.PI * 2 / smokeCount) * distance;
    const y1 = Math.cos(i * Math.PI * 2 / smokeCount) * distance;
    const x2 = Math.sin(i * Math.PI * 2 / smokeCount) * (distance + 1);
    const y2 = Math.cos(i * Math.PI * 2 / smokeCount) * (distance + 1);
    const directionX = x2 - x1;
    const directionY = y2 - y1;

    this.addEffectSmoke({start:{x:0,y:0,z:-10}, direction:{x:directionX,y:directionY,z:0}, duration:9, distance:35, scale:6.5});
  }
}

Demo.prototype.addEffectPlanetExplosion = function (startTime,duration, planetId) {

  let pieceDirections =
  [
    -1, 1,-1,
     1, 1,-1,
     1, 1, 1,
    -1, 1, 1,
    -1,-1,-1,
     1,-1,-1,
     1,-1, 1,
    -1,-1, 1,
  ];

  let amountOfPlanetLayers = 4;
  let randomAngle = Math.random()*720.0-360.0;
  for(let i2 = 0; i2 < amountOfPlanetLayers; i2++)
    {

      this.loader.addAnimation({
        "start": startTime-2*beat, "duration": duration+8*beat
        ,"id":"null"+i2+planetId
        ,"object":null
        ,"position":[{"x":0,"y":0,"z":-40},
          {"duration":2*beat,
            "x":0,
            "y":0,
            "z":-4
          },
          {"duration":8*beat,
            "x":0,
            "y":0,
            "z":40
          }]
        ,"scale":[{"uniform3d":1.0}]
        ,"angle": [{"degreesY":i2*45+randomAngle,"degreesZ":i2*45+randomAngle,"degreesX":i2*45+randomAngle}]
      });
 
    for(let i=0;i<8;i++)
      {
        this.loader.addAnimation([{
          "start": startTime-2*beat, "duration": duration+8*beat
          ,"id":"planet"+planetId
          ,"parent":"null"+i2+planetId
          ,"object":{
            "name":"sceneSpace/obj_planet_piece_" + (i+1) + ".obj",
            "time":()=>0.1*getSceneTimeFromStart(),
          }
        ,"position":[{
            "x":0,
            "y":0,
            "z":0
          },
          {"duration":2*beat,
            "x":0,
            "y":0,
            "z":0
          },
          {"duration":40,
            "x":(Math.random()*pieceDirections[i*3]+pieceDirections[i*3]*(3+amountOfPlanetLayers-i2))*5.0,
            "y":(Math.random()*pieceDirections[i*3+1]+pieceDirections[i*3+1]*(3+amountOfPlanetLayers-i2))*5.0,
            "z":(Math.random()*pieceDirections[i*3+2]+pieceDirections[i*3+2]*(3+amountOfPlanetLayers-i2))*5.0,
          }]
        ,"angle":[{
            "degreesY":0,
            "degreesX":0,
            "degreesZ":0
          },
          {"duration":40,
            "degreesX":-90+180*Math.random(),
            "degreesY":-90+180*Math.random(),
            "degreesZ":-90+180*Math.random(),
          }]
        ,"scale":[{"uniform3d":2.50-.75*i2}]
        }]);
      }
    }
}


Demo.prototype.sceneSpace = function () {
  const bpm = 120;
  const beat = 60/bpm;
  const pattern = beat*8;


  this.setScene('space');
  this.addEffectStarfield(Sync.get('Starfield:Speed'));
  this.addHandFlyTrail();

  let explosionTimes= [
    4*pattern,
    5*pattern + 2 * beat,
    5*pattern + 6 * beat,
    6*pattern + 2 * beat,
    6*pattern + 6 * beat,
    7*pattern + 2 * beat,
    7*pattern + 6 * beat,
  ]

  for(let i = 0;i<explosionTimes.length;i++)
  {
    this.addEffectPlanetExplosion(explosionTimes[i],4*beat,i);
  }

  this.loader.addAnimation({

    "light": {
        "type": "Point",
        "properties": { "intensity": 255.0 },
        "castShadow": false
    }
    ,"color": [{
      "r": 1.0,
      "g": 1.0,
      "b": 1.0
    }]
    ,"position": [{
      "x": -5,
      "y": 1,
      "z": -5
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
   ,"position":[{
      "x":0,
      "y":0,
      "z":0
    }]
   ,"angle":[{
      "degreesY":()=>Sync.get('Fist:AngleY'),
      "degreesX":()=>Sync.get('Fist:AngleX'),
      "degreesZ":()=>Sync.get('Fist:AngleZ')
	  }]
   ,"scale":[{"uniform3d":1.03}]
  }]);
  //this.addEffectPlanetSmoke();
  //this.addEffectPlanetExplosion();
}
