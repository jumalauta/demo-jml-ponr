
Demo.prototype.sceneIntro = function () {
  this.setScene('intro');
  this.addEffectStarfield();

  this.loader.addAnimation([{
    "object":{
      "name":"sceneHand/fist.gltf",
      "time":()=>0.1*getSceneTimeFromStart(),
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
      "degreesZ":()=>Sync.get('Fist:AngleZ'),
	  }]
   ,"scale":[{"uniform3d":0.53}]
  }]);

  this.loader.addAnimation({
    "light": {
        "type": "Point",
        "properties": { "intensity": 55.0 },
        "castShadow": true
    }
    ,"color": [{
      "r": 1.0,
      "g": 1.0,
      "b": 1.0
    }]
    ,"position": [{
      "x": 0,
      "y": 1,
      "z": 5
    }]
  });

}
