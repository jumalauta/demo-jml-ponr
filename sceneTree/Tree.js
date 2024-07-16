
Demo.prototype.addClouds2 = function () {
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

float gray = (col.r + col.g + col.b) / 3.0;
    gl_FragColor = vec4(vec3(0.25,0.2,0.9)*1.1,0.45);
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
          {name:"cloudCoverage","value":[()=>cloudCoverage]}
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
    color: [{a:0.7}],
    shader:{...cloudShader,
      variable:
      [
        {name:"dark","value":[()=>dark]},
        {name:"cloudCoverage","value":[()=>cloudCoverage]}
      ]
    }
  });
};

let treeChildId = 0;
let initBranches = 6;
Demo.prototype.addEffectGrowingTree = function () {


  this.loader.addAnimation({
    "id":"nulltree"
   ,"object":null
   ,"position":[{"x":0,"y":-1.75,"z":0}]
   ,"scale":[{"uniform3d":4.0}]
   ,"angle": [{"degreesY":0,"degreesZ":0,"degreesX":0}]
 });

 this.treeBranch(initBranches,"nulltree", 0.0,2);
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
          "uniform3d":1.0-(initBranches-branches)*.1}]
    }]);

    this.treeBranch(branches-1,parentId+treeChildId, treeTime+2,Math.floor(Utils.random() * 1)+2);
  }
}

Demo.prototype.sceneTreeGrow = function () {
  this.setScene('treeGrow');
  this.addSkysphere();
  this.addEffectGrowingTree();

  this.loader.addAnimation({
    "light": {
        "type": "Directional",
        "properties": { "intensity": 1.55 },
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
        "properties": { "intensity": 1.15 },
        "castShadow": true
    }
    ,"color": [{
      "r": 1.0, "g": 1.0, "b": 1.0
    }]
    ,"position": [{
      "x": ()=>window.camPos[0], "y": 5, "z": ()=>window.camPos[2]
    }]
  });

  this.addClouds2();

  this.loader.addAnimation([{
    "object":{
      "name":"sceneTree/obj_dunes.gltf"
    }
   ,"position":[{
      "x":0,
      "y":0,
      "z":0
    }]
   ,"angle":[{
      "degreesY":0,
      "degreesX":0,
      "degreesZ":0
	  }]
   ,"scale":[{"uniform3d":1.0}]
  }]);

}
