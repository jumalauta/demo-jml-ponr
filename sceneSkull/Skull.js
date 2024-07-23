Demo.prototype.sceneSkullCat = function () {
  this.setScene('main');
  this.loader.addAnimation({fbo:{name:'skullCarBackgroundFbo',action:'begin',storeDepth:false}});
  this.loader.addAnimation({
    "image": ["sceneSkull/temp.png"],
    "scale":[{"uniform2d":5.0}]
  });
  this.loader.addAnimation({fbo:{name:'skullCarBackgroundFbo',action:'unbind',storeDepth:false}});

  this.setScene('skullCat');

  this.loader.addAnimation({
    "image": ["skullCarBackgroundFbo.color.fbo"],
    "shader":{"name":"sceneSkull/background.fs",
      "variable": [
        // chaineffect base effect numbers:
        // 0: no-operation
        // 1: texcoordinate bias
        {"name":"coordBias","value":[()=>getSceneTimeFromStart()*0.1,()=>0.0]},
        // 2: texcoordinate bias 2
        {"name":"coordBias2", "value":[()=>getSceneTimeFromStart(), ()=>getSceneTimeFromStart()]},
        // 3: kaleidoscope
        {"name":"kaleidoscopeXangle","value":[()=>((Math.sin(getSceneTimeFromStart())+1)/2.0)*10.0+1.0]},
        // 4: funky deformation
        // 5: rotozoom
        {"name":"angle", "value":[()=>3.14/4.*Math.sin(getSceneTimeFromStart())]},
        {"name":"zoom", "value":[()=>2.56*Math.sin(getSceneTimeFromStart())]},
        // 6: tunnel
        // 7: plasma deformation
        {"name":"scale", "value":[()=>5., ()=>5.]},

        // chainEffectN value = <baseeffect>.<mix amount = .0 (all), .999 (minimum)>
        {"name":"chainEffect0", "value":[()=>3.7]},
        {"name":"chainEffect1", "value":[()=>7.6]},
        {"name":"chainEffect2", "value":[()=>1.3]},
        {"name":"chainEffect3", "value":[()=>4.7]},
        {"name":"chainEffect4", "value":[()=>7.8]},
        {"name":"chainEffect5", "value":[()=>3.0]},
        {"name":"chainEffect6", "value":[()=>3.0]},
        {"name":"chainEffect7", "value":[()=>0]},
        {"name":"chainEffect8", "value":[()=>0]},
        {"name":"chainEffect9", "value":[()=>0]},
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
