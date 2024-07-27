const bpm = 120;
const beat = 60/bpm;
const pattern = beat*8;

Demo.prototype.addHandFlyTrail = function () {
  const trailShader = {
    // extend generated material shader
    fragmentShaderPrefix:`
uniform float timePercent;
uniform float time;// = 21.0;
//uniform vec4 color;// = vec4(1);
uniform float amp; // = .37;

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
  
  float freq = 4.;
  float amp2 = amp;
 
  for (int i = 0; i < OCTAVES; i++) {
 
      value += amp2 * noise(p  * shift);
      p *= 2.;
      amp2 *= .5;
 
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
  coord.s += (sin(coord.t*8.0 + time*6.0)*0.122)*(coord.t-0.5);
  coord.t += (cos(coord.s*50.0 + time*3.3)*0.125)*(coord.t-0.5);
  coord.x *= 1.0;
  coord.x = mod(coord.x, 1.0);
  vec4 pixel = texture(map, coord)*vec4(2.0,0.8,0.8,1.0);

  coord = vMapUv * rotateZ(-90.0);
  coord.s += (sin(coord.t*8.0 + time*4.0)*0.122)*(coord.t-0.5);
  coord.t += (cos(coord.s*50.0 + time*2.3)*0.125)*(coord.t-0.5);

  coord.x = mod(coord.x, 0.5);
  coord.y = mod(coord.y, 0.5);
  coord = vec2(timePercent, coord.y);
  vec4 pixel2 = texture(map, coord);

  gl_FragColor = min(pixel+pixel2, vec4(1.0));
  //gl_FragColor.a = 1.0-vMapUv.y;
  drawClouds();
  float fadeTrail = 0.3+0.1*cos(vMapUv.s*50.0 + time*2.3);
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
  for(let i = 0; i < 3; i++) {
    this.loader.addAnimation({
      object: "spectogram.png",
      shape: { type: 'SPHERE', radius: 1.0 },
      color: [{a:1.0}],
      position:[{
        x:-.2,
        y:0,
        z:6.0
      }],
      scale:[{z:1.5-i*0.2,x:1.5-i*0.2,y:5.5}],
      "angle":[{
        "degreesY":()=>i*20,
        "degreesX":90,
        "degreesZ":0
      }],
      //angle: [{degreesY:()=>2,degreesX:()=>1}],
      shader:{...trailShader,variable:[{name:"amp",value:[()=>0.37+Math.sin(getSceneTimeFromStart()*1)*0.005]}]}
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
              x: settings.direction.x + Utils.random() * 0.2 - 0.1, y: settings.direction.y + Utils.random() * 0.2 - 0.1, z: settings.direction.z + Utils.random() * 0.2 - 0.1
            },
            startTime: time + Utils.random() * (settings.duration * 2),
            duration: settings.duration + Utils.random() * 0.1,
            distance: settings.distance + Utils.random() * 0.1,
            scale: settings.scale + Utils.random() * 0.2,
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

Demo.prototype.addEffectPlanetExplosion = function (startTime,duration, planetId, cR,cG,cB) {

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
  let randomAngle = Utils.random()*720.0-360.0;
  for(let i2 = 0; i2 < amountOfPlanetLayers; i2++)
    {        
      this.loader.addAnimation({
        "start": startTime-2*beat, "duration": duration+8*beat
        ,"id":"null"+i2+planetId
        ,"object":null
        ,"color":[{"r":cR/255,"g":cG/255,"b":cB/255}]
        ,"position":[{"x":0,"y":0,"z":-40},
          {"duration":2.0*beat,
            "x":0,
            "y":0,
            "z":-5
          },
          {"duration":0.25*beat,
            "x":0,
            "y":0,
            "z":0
          },
          {"duration":2*duration,
            "x":0,
            "y":0,
            "z":40
          }
        ]
        ,"scale":[{"uniform3d":1.0}]
        ,"angle": [{"degreesY":i2*45+randomAngle,"degreesZ":i2*45+randomAngle,"degreesX":i2*45+randomAngle}]
      });

      if (i2 === 0 && planetId === 2){
        this.addPlanetRings(startTime-2*beat, duration+8*beat,"null"+i2+planetId,cR,cG,cB);
      }

      this.addEffectExplosion(
        "sceneCatBattle/tex_temp_cat.png",
        null,
        startTime,2,  // startTime, duration
        45, 15, 1.0,  // maxDist, amount, scale
        0,0,0,        // posX, posY, posZ
        0,0,0,        // startDim
        .3,.01,0.3,   // dimX, dimY, dimZ
        0,0,0,        // xOffset, yOffset, zOffset
        "AdditiveBlending", // blendmode
        "null"+i2+planetId);     // parent

        this.addEffectExplosion(
          "sceneCatBattle/tex_temp_cat.png",
          null,
          startTime,2,  // startTime, duration
          115, 15, 1.0, // maxDist, amount
          0,0,0,        // posX, posY, posZ          
          0,0,0,        // startDim
          .01,.3,0.3,   // dimX, dimY, dimZ
          0,0,0,        // xOffset, yOffset, zOffset
          "AdditiveBlending", // blendmode
          "null"+i2+planetId);     // parent

    for(let i=0;i<8;i++)
      {
        this.loader.addAnimation([{
          "start": startTime-2*beat, "duration": duration*3
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
          {"duration":2.0*beat,
            "x":0,
            "y":0,
            "z":0
          },
          {"duration":duration*3,
            "x":(Utils.random()*pieceDirections[i*3]+pieceDirections[i*3]*(3+amountOfPlanetLayers-i2))*5.0,
            "y":(Utils.random()*pieceDirections[i*3+1]+pieceDirections[i*3+1]*(3+amountOfPlanetLayers-i2))*5.0,
            "z":(Utils.random()*pieceDirections[i*3+2]+pieceDirections[i*3+2]*(3+amountOfPlanetLayers-i2))*5.0,
          }]
        ,"angle":[{
            "degreesY":0,
            "degreesX":0,
            "degreesZ":0
          },
          {"duration":2*beat,
            "degreesX":0,
            "degreesY":0,
            "degreesZ":0
          },
          {"duration":duration*4,
            "degreesX":-90+180*Utils.random(),
            "degreesY":-90+180*Utils.random(),
            "degreesZ":-90+180*Utils.random(),
          }]
        ,"scale":[{"uniform3d":2.50-.75*i2}]
        }]);
      }
    }

    if (planetId==5) {
      this.addRainbowExplotion(startTime+pattern/2,duration+pattern/4);
    }
}

Demo.prototype.addRainbowExplotion = function(startTime,duration, inverse) {
  var flagColors = [
    {"r":0xff/255, "g":0x45/255, "b":0x4a/255},
    {"r":0xff/255, "g":0xa2/255, "b":0x2e/255},
    {"r":0xfe/255, "g":0xff/255, "b":0x16/255},
    {"r":0x12/255, "g":0xe6/255, "b":0x11/255},
    {"r":0x51/255, "g":0x6b/255, "b":0xfe/255},
    {"r":0xd3/255, "g":0x4a/255, "b":0xfd/255},
  ];
  
  const loader = this.loader;
  flagColors.forEach((color, index) => {
    //if (index >1) return;
  
    const pos = index%2==0?-1:1;
    const shapePoints = [];
    const precision = 100;
    const shapeSize = 2;
    for (let i = 0; i <= precision; i++) {
      const angleRad = (i * 4 / precision) * 2 * Math.PI * pos;
      let size = shapeSize + index*0.5;
      size *= (Math.sin(i/precision*Math.PI)+1)/2*2+0.1;
      shapePoints.push([
        (Math.sin(i*1.2)*0.02+Math.sin(angleRad)) * size,
        i/precision*8-index*0.7,
        (Math.cos(i*1.3)*0.02+Math.cos(angleRad)) * size,
      ]);
    }



      const steps = 500;
      const drawDuration = inverse?duration:3;
    loader.addAnimation({
      start:startTime,duration:duration,
      object:{name:null},
      material:{side:'DoubleSide',castShadow:false,receiveShadow:false,transparent:true,frustumCulled:false},
        shape:{type:'SPLINE',
          precision:2,
          points:shapePoints,
          extrudeSettings:{steps:steps}},
      position:[{x:0,y:0,z:0}],
      scale:[{uniform3d:inverse?2:0.1},{duration:drawDuration*2,uniform3d:inverse?1:4}],
      color:[{...color, a:inverse?1:0},{duration:inverse?drawDuration:0.2,a:inverse?0.0:1.0}],
      angle:[{degreesY:()=>getSceneTimeFromStart()*100}],
      runFunction:(animation) => {
        if (inverse) {
          animation.ref.mesh.geometry.setDrawRange(0,(Math.min(Math.max(1.0-(getSceneTimeFromStart()*1.8-startTime)/drawDuration,0.0), 1.0))*steps);
        } else {
          animation.ref.mesh.geometry.setDrawRange(0,(Math.min((getSceneTimeFromStart()-startTime)/drawDuration, 1.0))*steps*8);
        }
      }
    });
  });  
};

Demo.prototype.addPlanetRings = function(startTime,duration,parentId,r,g,b) {  
  const loader = this.loader;
  //if (index >1) return;

  const shapePoints = [];
  const precision = 100;
  const shapeSize = 5;
  for (let i = 0; i <= precision; i++) {
    const angleRad = (i / precision) * 2 * Math.PI;
    let size = shapeSize;
    shapePoints.push([
      (Math.sin(angleRad)) * size,
      0,
      (Math.cos(angleRad)) * size,
    ]);
  }

  const steps = 40;
  loader.addAnimation({
    start:startTime,duration:duration,
    parent:parentId,
    object:{name:'sceneSpace/ring_texture.png'},
    material:{type:'Basic',side:'DoubleSide'},
      shape:{type:'SPLINE',
        size:1,
        precision:2,
        closed:true,
        points:shapePoints,
        extrudeSettings:{steps:steps}}, 
    position:[{x:0,y:0,z:0},{duration:2*beat},{duration:2*beat,x:-20,y:6,z:5}],
    //scale:[{uniform3d:inverse?2:0.1},{duration:drawDuration*2,uniform3d:inverse?1:4}],
    color:[{r:r/255,g:g/255,b:b/255,a:0.5},{duration:2*beat},{duration:3*beat,a:0}],
    shader:{
      vertexShaderSuffix:`
        vMapUv.x = mod(vMapUv.x, 1.0);
        vMapUv.y = mod(vMapUv.y, 1.0);
      `
    },
    angle:[{},{duration:2*beat},{duration:2*beat,degreesX:()=>-getSceneTimeFromStart()*20,degreesY:()=>getSceneTimeFromStart()*6,degreesZ:()=>getSceneTimeFromStart()*4}],
  });

  loader.addAnimation({
    start:startTime,duration:duration,
    parent:parentId,
    object:{name:'sceneSpace/ring_texture.png'},
    material:{type:'Basic',side:'DoubleSide'},
      shape:{type:'SPLINE',
        size:0.24,
        precision:2,
        closed:true,
        points:shapePoints,
        extrudeSettings:{steps:steps}}, 
    position:[{x:0,y:0,z:0},{duration:2*beat},{duration:2*beat,x:-20,y:6,z:5}],
    scale:[{"uniform3d":0.84}],
    //scale:[{uniform3d:inverse?2:0.1},{duration:drawDuration*2,uniform3d:inverse?1:4}],
    color:[{r:r/255*0.1,g:g/255*0.1,b:b/255*0.1,a:0.3},{duration:2*beat},{duration:3*beat,a:0}],
    shader:{
      vertexShaderSuffix:`
        vMapUv.x = mod(vMapUv.x, 1.0);
        vMapUv.y = mod(vMapUv.y, 1.0);
      `
    },
    angle:[{},{duration:2*beat},{duration:2*beat,degreesX:()=>-getSceneTimeFromStart()*20,degreesY:()=>getSceneTimeFromStart()*6,degreesZ:()=>getSceneTimeFromStart()*4}],
  });

  loader.addAnimation({
    start:startTime,duration:duration,
    parent:parentId,
    object:{name:'sceneSpace/ring_texture.png'},
    material:{type:'Basic',side:'DoubleSide'},
      shape:{type:'SPLINE',
        size:0.06,
        precision:2,
        closed:true,
        points:shapePoints,
        extrudeSettings:{steps:steps}}, 
    position:[{x:0,y:0,z:0},{duration:2*beat},{duration:2*beat,x:-20,y:6,z:5}],
    scale:[{"uniform3d":1.1}],
    //scale:[{uniform3d:inverse?2:0.1},{duration:drawDuration*2,uniform3d:inverse?1:4}],
    color:[{r:r/255*0.1,g:g/255*0.1,b:b/255*0.1,a:0.3},{duration:2*beat},{duration:3*beat,a:0}],
    shader:{
      vertexShaderSuffix:`
        vMapUv.x = mod(vMapUv.x, 1.0);
        vMapUv.y = mod(vMapUv.y, 1.0);
      `
    },
    angle:[{},{duration:2*beat},{duration:2*beat,degreesX:()=>-getSceneTimeFromStart()*20,degreesY:()=>getSceneTimeFromStart()*6,degreesZ:()=>getSceneTimeFromStart()*4}],
  });
};

Demo.prototype.sceneSpace = function () {

  this.setScene('space');
  this.addEffectStarfield(Sync.get('Starfield:Speed'));
  this.addHandFlyTrail();

  Utils.setSeed(8999);

  let explosionTimes= [
    4*pattern,              // neptunus
    5.5*pattern + 2 * beat, // uranus
    5.5*pattern + 6 * beat, // saturnus
    6.5*pattern + 2 * beat, // jupiter
    6.5*pattern + 6 * beat, // mars
    7.5*pattern + 2 * beat, // venus
    7.5*pattern + 6 * beat, // merkurius
  ]

  let planetColors = [
    0,26,226,               // neptunus sininen
    20,211,255,             // uranus syaani
    206,138,0,              // saturnus ruskea
    255,255,0,              // jupiter keltainen
    255,45,39,              // mars punainen
    255,39,215,             // venus pinkki
    255,136,39              // merkurius oranssi
  ]

  this.addEffectPlanetExplosion(explosionTimes[0],8*beat,0, planetColors[0],planetColors[1],planetColors[2]);
  
  for(let i = 1;i<explosionTimes.length;i++)
  {
    this.addEffectPlanetExplosion(explosionTimes[i],4*beat,i, planetColors[i*3],planetColors[i*3+1],planetColors[i*3+2]);
  }




  this.loader.addAnimation({
    "light": { 
        "type": "Point",
        "properties": { "intensity": 45.75 },
        "castShadow": false
    }
    ,"color": [{
      "r": 1.0, "g": 1.0, "b": 1.0
    }]
    ,"position": [{
      "x": ()=>((window.camPos[0]/window.camPosLength)*5.0), "y": ()=>((window.camPos[1]/window.camPosLength)*5.0), "z": ()=>((window.camPos[2]/window.camPosLength)*5.0)
    }]
  });


  this.loader.addAnimation({
    "light": { 
        "type": "Point",
        "properties": { "intensity": 15.75 },
        "castShadow": true
    }
    ,"color": [{
      "r": 1.0, "g": 1.0, "b": 1.0
    }]
    ,"position": [{
      "x": 0, "y": 0, "z": -2.5
    }]
  });

  this.loader.addAnimation({

    "light": {
        "type": "Directional",
        "properties": { "intensity": 2.5 },
        "castShadow": false
    }
    ,"color": [{
      "r": 1.0,
      "g": 1.0,
      "b": 1.0
    }]
    ,"position": [{
      "x": 0,
      "y": 0,
      "z": 15
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
   ,"scale":[{"uniform3d":1.03}]
  }]);
  //this.addEffectPlanetSmoke();
  //this.addEffectPlanetExplosion();

  this.addDemoTitle();
}

Demo.prototype.addDemoTitle = function() {
  this.loader.addAnimation({"object":{"name":null}, "id":"titleShortId",
    "angle":[{"degreesY":0},{"start":8, "duration":3, "degreesY":180}]});
  
    const letterWidth = 1.25;
    const centerX = -letterWidth*3/2;
    const r = 1.0;
    const gb=0.4;
    this.addText("P", {
      parent:"titleShortId",
      duration:22,
      "scale":[{"uniform3d":20.0}]
      ,"position":[{"x":centerX,"y":1.5,"z":-1}]
      ,"color":[{"r":r,"g":gb,"b":gb,"a":0},{"start":8, "duration":3, "a":1}]
    });
  
  this.addText("O", {
    parent:"titleShortId",
    duration:22,
    "scale":[{"uniform3d":20.0}]
    ,"position":[{"x":letterWidth+centerX,"y":1.5,"z":-1}]
    ,"color":[{"r":r,"g":gb,"b":gb,"a":0},{"start":8, "duration":3, "a":1}]});  
  
    this.addText("*", {
      parent:"titleShortId",
      duration:16,
      "scale":[{"uniform3d":20.0}]
      ,"position":[{"x":letterWidth*2+centerX,"y":1.9,"z":-1},{"start":18.5,"duration":0.15,"x":letterWidth*3+centerX}]
      ,"color":[{"r":r,"g":gb,"b":gb,"a":0},{"start":8, "duration":3, "a":1}]});  

      this.addText("R", {
        parent:"titleShortId",
        duration:22,
        "scale":[{"uniform3d":20.0}]
        ,"position":[{"x":letterWidth*2+centerX,"y":1.5,"z":-1},{"start":19.5,"duration":0.15,"x":letterWidth*3+centerX}]
        ,"color":[{"r":r,"g":gb,"b":gb,"a":0},{"start":16, "duration":0, "a":1}]});  

    this.addText("N", {
      parent:"titleShortId",
      duration:22,
      "scale":[{"uniform3d":20.0}]
      ,"position":[{"x":letterWidth*3+centerX,"y":1.5,"z":-1},{"start":19.5,"duration":0.15,"x":letterWidth*2+centerX}]
      ,"color":[{"r":r,"g":gb,"b":gb,"a":0},{"start":8, "duration":3, "a":1}]});  
  
    this.addText("POINT OF NO RETURN", {start:16,"duration":6,
      "scale":[{"x":-20.0,"y":20,"z":20}]
      ,"position":[{"x":letterWidth*3,"y":-2.5,"z":-1}]
      ,"color":[{"r":0,"g":0,"b":0,"a":0.0},{start:16,"duration":1,"r":()=>(Math.sin(getSceneTimeFromStart()*216.0)+1)/2*r, "a":1},{"r":r}]});  
}

Demo.prototype.addText = function(text, options) {
  this.loader.addAnimation([{
    "text":{
      "string":text,
      "name":"multiSceneEffects/font.ttf",
      "parameters": {depth:0.3,bevelEnabled:true,bevelThickness:0.05,bevelSize:0.05,bevelSegments:6}
    }
    ,"perspective":"3d"
    ,...options
  }]);
};
