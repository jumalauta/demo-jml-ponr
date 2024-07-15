Demo.prototype.sceneSkullCat = function () {
  this.setScene('skullCat');  
  this.loader.addAnimation({
    //"start": start, "duration": duration,
    "image": ["sceneSkull/temp.png"], //FIXME with actual content
    "shader":{"name":"sceneSkull/kaleidoscope.fs",
      "variable": [
        {"name":"kaleidoscopeXangle","value":[()=>((Math.sin(getSceneTimeFromStart())+1)/2.0)*10.0+1.0]},
        {"name":"coordBias","value":[()=>getSceneTimeFromStart()*0.1,()=>0.0]},
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
