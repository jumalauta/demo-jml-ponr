Demo.prototype.addClouds2 = function () {
  const cloudShader = {
    // extend generated material shader
    fragmentShaderPrefix:`
uniform float time;// = 21.0;
uniform float dark;
uniform float cloudCoverage;
uniform float skyDarkness;
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

#define OCTAVES 16

float fbm(in vec2 p) {




float t = time / 10.;
mat2 rot = mat2(
    cos(t), -sin(t),
    sin(t), cos(t)
);
vec2 coord = vMapUv;
coord.x = coord.x > 0.5 ? 1.0-coord.x : coord.x;
coord.y = coord.y > 0.5 ? 1.0-coord.y : coord.y;

float shift = time*0.25;

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
vec2 coord = vMapUv;
coord.x = coord.x < -0.5 ? -1.0-coord.x : coord.x;
//coord.y = coord.y > 0.7 ? 0.0 : coord.y;

vec2 uv = coord*5.;

float v = repFbm(uv, 3);

vec3 col = mix(col1,col2,clamp(v/3.,0.,.5));
   
col = mix(col,col3,mix(v*3.,.2,.66));

float gray = (col.r + col.g + col.b) / 3.4;
gl_FragColor = vec4(vec3(0.25,0.2,0.9)*1.1,0.45);
gl_FragColor.rgb = gl_FragColor.rgb*skyDarkness;
if  (gray < cloudCoverage) {

    return;
    discard;
}
vec2 uv2 = coord*2.5;
uv2.x = uv2.x+time*0.2;
uv2.y = uv2.y+time*0.1;
gl_FragColor *= vec4(mix(vec3(gray),texture(map,uv2).rgb,1.0)*dark, 1.0);
//gl_FragColor *= color;
}
    `,
    fragmentShaderSuffix:`
      drawClouds();
    `
  };

  let radius = 100.0; //2.0
  let type = 'SKYSPHERE'; // 'SPHERE'
  let shadow = false; // true
  let degreesY = -25; // -25
  let texture = "sceneEarthHit/clouds.png";
  let dark = 3.; //0.85
  let cloudCoverage = 0.82; //0.85

  if (shadow) {
    // cloud shadow
    this.loader.addAnimation({
      object: texture,
      shape: { type: type, radius: radius },
      material: { transparent: true },
      color: [{a:0.4}],
      angle: [{degreesY:()=>degreesY+2,degreesX:()=>1}],
      shader:{...cloudShader,
        variable:
        [
          {name:"dark","value":[()=>0.0]},
          {name:"cloudCoverage","value":[()=>cloudCoverage]},
          {name:"skyDarkness","value":[()=>Sync.get('Tree:skyDarkness')]},
        ]
      }
    });
  }
  // cloud
  this.loader.addAnimation({
    object: texture,
    //object: "_embedded/testUvMap.png",
    shape: { type: type, radius: radius + (shadow ? 0.03 : 0.0) },
    material: { transparent: true },
    angle: [{degreesY:()=>degreesY}],
    color: [{a:0.6}],
    shader:{...cloudShader,
      variable:
      [
        {name:"dark","value":[()=>dark]},
        {name:"cloudCoverage","value":[()=>cloudCoverage]},
        {name:"skyDarkness","value":[()=>Sync.get('Tree:skyDarkness')]},
      ]
    }
  });
};

let treeChildId = 0;
let initBranches = 6;
Demo.prototype.addEffectGrowingTree = function () {

  this.loader.addAnimation({
    "id":"nullak"
   ,"object":null
   ,"position":[{"x":1 ,"y":-1.75,"z":1}]
   ,"scale":[{"uniform3d":1.0}]
   ,"angle": [{"degreesY":()=>2*Math.sin(getSceneTimeFromStart()),"degreesZ":()=>2*Math.sin(1.3*getSceneTimeFromStart())}]
 });

  this.loader.addAnimation({
    "id":"nulltree"
   ,"object":null
   ,"position":[{"x":1 ,"y":-1.75,"z":1}]
   ,"scale":[{"uniform3d":4.0}]
   ,"angle": [{"degreesY":()=>2*Math.sin(getSceneTimeFromStart()),"degreesZ":()=>2*Math.sin(1.3*getSceneTimeFromStart()),"degreesX":-25}]
 });

 this.treeBranch(initBranches,"nulltree", 0.0,2, 4.0);
}

Demo.prototype.treeBranch = function (branches, parentId, treeTime, branchAmount) {

  if(branches<=0)
    return;

  let spawnPoints =
  [
    0.0, 0.37, 0.0
  ]

  Utils.setSeed(661);
    
  for(let i = 0; i<branchAmount;i++)
  {
      treeChildId++;

    let myScale = 1.0-(initBranches-branches)*.1;
    this.loader.addAnimation([{
        "start": treeTime+i*2.3+Utils.random()*.5, "duration": 30.0-((treeTime+i*.1)-30),
        "id":parentId+treeChildId
       ,"parent":parentId
       ,"object":{
         "name":"sceneTree/obj_tree.obj",
         "time":()=>0.1*getSceneTimeFromStart(),
       }
     ,"position":[{
         "x":spawnPoints[0],
         "y":spawnPoints[1],
         "z":spawnPoints[2],
       }]
     ,"angle":[{
         "degreesY":Utils.random()*360-180 ,
         "degreesX":Utils.random()*50-25,
         "degreesZ":Utils.random()*50-25
       }
       ,
       {"duration":6,
         "degreesY":Utils.random()*360-180,
         "degreesX":Utils.random()*80-40 ,
         "degreesZ":Utils.random()*80-40
       }]
     ,"scale":[{"uniform3d":0.0}
        ,{"duration":5,
          "uniform3d":myScale}]
    }]);

    this.treeBranch(branches-1,parentId+treeChildId, treeTime+2,Math.floor(Utils.random() * 1)+2);
  }
}

//"start": akSpawnTimes[i]*biitti, "duration": 4*8*window.biitti,
Demo.prototype.addTreeParticles = function (akSpawnTimes, akSpawnPos) {
  Utils.setSeed(666);
  let stars = new Array(400);

  const baseY = 2;

  for(let i= 0; i<akSpawnTimes.length;i++) {
    this.loader.addAnimation({
      object: null,
      id: "treeParticles"+i,
      position: [{x:0,y:baseY,z:0}],
      angle:[{degreesY:0},{duration:akSpawnTimes[0]*biitti,degreesY:360*2}],
      runFunction:(animation)=>{
        let pos = animation.position[0];
        pos.x = 0; pos.y = baseY; pos.z = 0;
        const time = getSceneTimeFromStart()-animation.start;
        const duration = 4*8*window.biitti;
        for(let j=0;j<akSpawnTimes.length;j++) {
          const start = akSpawnTimes[j]*biitti;
          const percent = (time-start)/duration;
          if (percent >= 0 && percent < 1.0) {
            let p = percent > 0.5 ? 1.0 - percent : percent;
            pos.x = Math.sin(time+j+i+p*500)*(0.01);
            pos.y = Math.cos(time+j+i+p*300)*(0.01)+baseY;
            pos.z = Math.sin(time+j+i+p*600)*(0.01);
          }
        }
      }
    });
  }

  for (let i = 0; i < stars.length; i++) {
    let parentId = i%akSpawnTimes.length;
    const size = 2 + Utils.random() * 4;
    const phi = Math.acos(1 - 2 * Utils.random());
    const theta = 2 * Math.PI * Utils.random();

    stars[i] = {
      "x1": size*Math.sin(phi)*Math.cos(theta),
      "y1": size*Math.sin(phi)*Math.sin(theta),
      "z1": size*Math.cos(phi)
    };

    if (stars[i].y1 < 0) {
      continue;
    }

    const animDuration = 30;
    this.loader.addAnimation({
      "image": "multiSceneEffects/star.png",
      parent: "treeParticles"+parentId,
      "perspective": "3d",
      "billboard": true,
      "scale":[{"uniform3d":0.5+Math.random()*0.5}],
      "material":{transparent:true, blending:'AdditiveBlending'},
      "position":[{x:stars[i].x1,y:stars[i].y1,z:stars[i].z1},{duration:akSpawnTimes[parentId]*biitti,x:akSpawnPos[parentId*3+0],y:akSpawnPos[parentId*3+1]-baseY,z:akSpawnPos[parentId*3+2]}],
      "color":[{a:()=>(Math.sin(i+getSceneTimeFromStart()*2.5)+1)/2*0.45},{duration:akSpawnTimes[parentId]*biitti,a:0.1},{duration:biitti,a:0.0}],
    });
  }

}
Demo.prototype.sceneTreeGrow = function () {
  this.setScene('treeGrow');
  this.addSkysphere();
  this.addEffectGrowingTree();


  this.loader.addAnimation({
    "light": {
        "type": "Directional",
        "properties": { "intensity": 0.1 },
        "castShadow": true
    }
    ,"color": [{
      "r": 1.0, "g": 1.0, "b": 1.0
    }]
    ,"position": [{
      "x": ()=>-window.camPos[0], "y": ()=>window.camPos[1], "z": ()=>-window.camPos[2]
    }]
  });


  this.loader.addAnimation({
    "light": {
        "type": "Directional",
        "properties": { "intensity": 1.25 },
        "castShadow": true
    }
    ,"color": [{
      "r": 1.0, "g": 1.0, "b": 1.0
    }]
    ,"position": [{
      "x": ()=>window.camPos[0], "y": 7, "z": ()=>window.camPos[2]
    }]
  });

  this.addClouds2();

  this.loader.addAnimation([{
    "id":"dunes",
    "object":{
      "name":"sceneTree/obj_dunes.gltf"
    }
   ,"position":[{
      "x":0,
      "y":0,
      "z":0
    }]
    ,"color": [{
      "r": 1.0, "g": 1.0, "b": 1.0
    }]
   ,"angle":[{
      "degreesY":0,
      "degreesX":0,
      "degreesZ":0
	  }]
   ,"scale":[{"uniform3d":1.0}]
  }]);

  
  this.loader.addAnimation([{
    "parent":"dunes",
    "object":{
      "name":"sceneTree/obj_farjan.obj"
    }
   ,"position":[{
      "x":24,
      "y":2,
      "z":24
    }]
    ,"color": [{
      "r": 1.0, "g": 1.0, "b": 1.0
    }]
   ,"angle":[{
      "degreesY":0,
      "degreesX":45,
      "degreesZ":45
	  }]
   ,"scale":[{"uniform3d":1.0}]
  }]);

 

  let akSpawnTimes = [
    4*8,
    4*8+2,
    4*8+4,
    5*8,
    5*8+2,
    5*8+4,
    6*8,
    6*8+2,
    6*8+4];

  let parentPos = [1, -1.75, 1];
  let akSpawnPos = [
      .75, 2.9,1.15,
    1.3, 4.1, .45,
    -.75, 2.1, -.55,
    2.7,  3.25, -.7,
    -1.3, 2.7 , .45,
    2,    4.15, -1.45,
    .0,   1.2,  -.15,
    .45,   3.0,  -.3,
    -1.0, 3.8,  0.0
  ];
  /*

*/

  Utils.setSeed(777);
    
  for(let i=0;i<akSpawnPos.length/3;i++)
  {
    this.loader.addAnimation([{
      "parent":"nullak",
      "start": akSpawnTimes[i]*biitti, "duration": 4*8*window.biitti,
      "object":{
        "name":"multiSceneEffects/obj_ak.obj"
      }
    ,"position":[{
        "x":akSpawnPos[i*3] - parentPos[0],
        "y":akSpawnPos[i*3+1] - parentPos[1],
        "z":akSpawnPos[i*3+2] - parentPos[2]
      }]
    ,"angle":[{
        "degreesZ":Utils.random()*90-45,
        "degreesY":Utils.random()*360,
        "degreesX":()=>2*Math.sin(5*getSceneTimeFromStart())
        }]
        ,"scale":[{"uniform3d":0.0}
          ,{"duration":1.5*biitti,
            "uniform3d":.45}]
    }]);
  }
  Utils.setSeed(177);
  for(let i=0;i<64;i++)
    {
      this.loader.addAnimation([{
        "start": 7.75*8*biitti+(i*biitti*2/64), "duration": 32*biitti,
        "object":{
          "name":"multiSceneEffects/obj_ak.obj"
        }
      ,"position":[{
          "x":.85+Utils.random()*4 -2,
          "y":3.25+Utils.random()*2-1,
          "z":-2.25-0.00625*i
        }]
      ,"angle":[{
          "degreesZ":Utils.random()*360,
          "degreesY":180
          }]
          ,"scale":[{"uniform3d":0.35+i*0.0025}]
      }]);
    }

    this.addTreeParticles(akSpawnTimes, akSpawnPos);


}

Demo.prototype.sceneTreeOverlay = function () {
  this.setScene('treeOverlay');

  this.loader.addAnimation({
    "image": ["sceneTree/tex_overlay_grunge.png"],
    "additive":false,
    "scale":[{"uniform3d":()=>1.0+Math.sin(getSceneTimeFromStart()*.01+.01)}],
    "color": [{
      "r": 1, "g": 1, "b": 1, "a":()=>Sync.get('Tree:GrungeAlpha')
    }]
  });

  this.loader.addAnimation({
    "image": ["sceneTree/tex_overlay_plants.png"],
    "additive":false,
    "scale":[{"uniform3d":()=>1.0+Math.sin(getSceneTimeFromStart())*.01+.01}],
    "color": [{ 
      "r": 1, "g": 1, "b": 1, "a":()=>Sync.get('Tree:PlantAlpha')
    }]
  });
}