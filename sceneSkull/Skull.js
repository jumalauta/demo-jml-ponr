Demo.prototype.sceneSkullCat = function () {
  this.setScene('skullCatBg');
  this.loader.addAnimation({fbo:{name:'skullCarBackgroundFbo',action:'begin',storeDepth:false}});
  // pattern 0

  this.loader.addAnimation({
    "light": {
        "type": "Directional",
        "properties": { "intensity": 1.55 },
        "castShadow": false
    }
    ,"color": [{
      "r": 1.0, "g": 1.0, "b": 1.0
    }]
    ,"position": [{
      "x": ()=>window.camPos[0], "y": ()=>window.camPos[1], "z": ()=>window.camPos[2]
    }]
  });

  this.addEffectStarfield(0,.5*window.pattern, 1000, "multiSceneEffects/star.png", 50, 1.7);

  this.loader.addAnimation({
    "start":0, "duration":.5*window.pattern,
    "image": ["sceneSkull/tex_hypnopenta.png"],
    "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
    "scale":[{"uniform3d":3.0}]
    ,"perspective":"3d"

    ,"angle":[{
      "degreesZ":()=>getSceneTimeFromStart()*155
	  }]
    ,"color": [{
      "r": 1.0, "g": 0.3, "b": 0.05
    }]
  });

// pattern .5



this.loader.addAnimation([{
"start":.5*window.pattern, "duration":.5*window.pattern,
  "object":{
    "name":"sceneSkull/obj_gridSphere.obj"
  }
  ,"image": ["sceneSkull/tex_hypnopenta.png"]
 ,"position":[{
    "x":0,
    "y":0,
    "z":0
  }]
  ,"color":[{
    "r":1.0,
    "g":1.0,
    "b":1.0
  }]
 ,"angle":[{
    "degreesY":()=>90*getSceneTimeFromStart(),
    "degreesX":()=>- 70*getSceneTimeFromStart()
    }]
 ,"scale":[{"uniform3d":15.5}]
}]);

  // pattern 1


  this.loader.addAnimation({
    "start":1*window.pattern, "duration":.5*window.pattern,
    "image": ["multiSceneEffects/tex_allseeingparticle.png"],
    "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
    "scale":[{"uniform2d":10.0}]
    ,"angle":[{
      "degreesZ":()=>getSceneTimeFromStart()*155
	  }]
    ,"color": [{
      "r": 0.40, "g": 1.00, "b": 0.25
    }]
  });

  // pattern 1.5
  this.addEffectStarfield(1.5*window.pattern,.5*window.pattern, 100, "multiSceneEffects/tex_battlecat.png", 50, 1.1);
  this.loader.addAnimation({
    "start":1.5*window.pattern, "duration":.5*window.pattern,
    "image": ["multiSceneEffects/tex_lilith.png"],
    "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
    "scale":[{"uniform2d":4.0}]
    ,"angle":[{
      "degreesZ":()=>getSceneTimeFromStart()*155
	  }]
    ,"color": [{
      "r": 0.8, "g": 0.0, "b": 0.9
    }]
  });

  // pattern 2

  this.loader.addAnimation({
    "start":2*window.pattern, "duration":.5*window.pattern,
    "image": ["multiSceneEffects/tex_nuke.png"],
    "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
    "scale":[{"uniform2d":3.0}]
    ,"angle":[{
      "degreesZ":()=>getSceneTimeFromStart()*155
	  }]
    ,"color": [{
      "r": 1.0, "g": 0.66, "b": 0.2
    }]
  });
  this.loader.addAnimation({fbo:{name:'skullCarBackgroundFbo',action:'unbind',storeDepth:false}});

  this.loader.addAnimation({
    "light": {
        "type": "Directional",
        "properties": { "intensity": 1.55 },
        "castShadow": false
    }
    ,"color": [{
      "r": 1.0, "g": 1.0, "b": 1.0
    }]
    ,"position": [{
      "x": ()=>window.camPos[0], "y": ()=>window.camPos[1], "z": ()=>window.camPos[2]
    }]
  });

  this.loader.addAnimation([{

    "object":{
      "name":"sceneSkull/obj_gridSphere.obj"
    }
    ,"image": ["sceneSkull/tex_hypnopenta.png"]
   ,"position":[{
      "x":0,
      "y":0,
      "z":0
    }]
    ,"color":[{
      "r":1.0,
      "g":1.0,
      "b":1.0
    }]
   ,"angle":[{
      "degreesY":()=>90*getSceneTimeFromStart(),
      "degreesX":()=>- 70*getSceneTimeFromStart()
      }]
   ,"scale":[{"uniform3d":15.5}]
  }]);
  this.setScene('skullCat');

  this.loader.addAnimation({
    "image": ["skullCarBackgroundFbo.color.fbo"],
    "perspective":"3d",
    "position": [{
      "x": 0, "y": 0, "z": -8
    }],
    "scale":[{"uniform3d":()=>Sync.get('CatSkullBg:bgScale')}],
    "shader":{"name":"sceneSkull/background.fs",
      "variable": [
        // chainEffectN value = <baseeffect>.<mix amount = .0 (all), .999 (minimum)>
        {"name":"chainEffect0", "value":[()=>Sync.get('CatSkullBg:e0')]},
        {"name":"chainEffect1", "value":[()=>Sync.get('CatSkullBg:e1')]},
        {"name":"chainEffect2", "value":[()=>Sync.get('CatSkullBg:e2')]},
        {"name":"chainEffect3", "value":[()=>Sync.get('CatSkullBg:e3')]},
        {"name":"chainEffect4", "value":[()=>Sync.get('CatSkullBg:e4')]},
        {"name":"chainEffect5", "value":[()=>Sync.get('CatSkullBg:e5')]},
        {"name":"chainEffect6", "value":[()=>Sync.get('CatSkullBg:e6')]},
        {"name":"chainEffect7", "value":[()=>Sync.get('CatSkullBg:e7')]},
        {"name":"chainEffect8", "value":[()=>Sync.get('CatSkullBg:e8')]},
        {"name":"chainEffect9", "value":[()=>Sync.get('CatSkullBg:e9')]},
        // chaineffect base effect numbers:
        // 0: no-operation
        // 1: texcoordinate bias
        {"name":"coordBias","value":[()=>Sync.get('CatSkullBg:coordBiasX'),()=>Sync.get('CatSkullBg:coordBiasY')]},
        // 2: texcoordinate bias 2
        {"name":"coordBias2", "value":[()=>Sync.get('CatSkullBg:coordBias2X'),()=>Sync.get('CatSkullBg:coordBias2Y')]},
        // 3: kaleidoscope
        {"name":"kaleidoscopeXangle","value":[()=>Sync.get('CatSkullBg:kaleidoAngle')]},
        // 4: funky deformation
        // 5: rotozoom
        {"name":"angle", "value":[()=>Sync.get('CatSkullBg:rotoAngle')]},
        {"name":"zoom", "value":[()=>Sync.get('CatSkullBg:rotoZoom')]},
        // 6: tunnel
        // 7: plasma deformation
        {"name":"scale", "value":[()=>Sync.get('CatSkullBg:plasmaScaleX'), ()=>Sync.get('CatSkullBg:plasmaScaleY')]},
        {"name":"speed", "value":[()=>Sync.get('CatSkullBg:Speed')]},
      ]
    }
  });

  this.loader.addAnimation({
    "light": {
        "type": "Directional",
        "properties": { "intensity": 0.55 },
        "castShadow": false
    }
    ,"color": [{
      "r": 1.0, "g": 1.0, "b": 1.0
    }]
    ,"position": [{
      "x": ()=>window.camPos[0], "y": ()=>window.camPos[1], "z": ()=>window.camPos[2]
    }]
  });

  this.loader.addAnimation([{
    "object":{
      "name":"sceneSkull/catskull.gltf",
      "time":10.0,
      "animations": {
        "scream":  {"weight":()=>Sync.get('CatSkull:Scream'), "timescale":1.0, "enabled":true, "loop":false}
      }
    }
   ,"position":[{
      "x":0,
      "y":0,
      "z":0
    }]
   ,"angle":[{
      "degreesY":()=>Sync.get('CatSkull:Rotation'),
      "degreesX":0,
      "degreesZ":()=>Sync.get('CatSkull:Scream')*15
	  }]
   ,"scale":[{"uniform3d":1.33}]
  }]);

};
