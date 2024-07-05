Demo.prototype.sceneFistingHand = function () {
  this.setScene('fistingHand');
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
      "z":-10
    }]
   ,"angle":[{
      "degreesY":0,
      "degreesX":90,
      "degreesZ":0
	  }]
   ,"scale":[{"uniform3d":2.03}]
  }]);

  this.loader.addAnimation({
    "light": {
        "type": "Point",
        "properties": { "intensity": 15.0 },
        "castShadow": true
    }
    ,"color": [{
      "r": 1.0,
      "g": 1.0,
      "b": 1.0
    }]
    ,"position": [{
      "x": 5,
      "y": 5,
      "z": 0
    }]
  });

  this.loader.addAnimation({
    "light": {
        "type": "Point",
        "properties": { "intensity": 25.0 },
        "castShadow": false
    }
    ,"color": [{
      "r": 1.0,
      "g": 1.0,
      "b": 1.0
    }]
    ,"position": [{
      "x": -5,
      "y": 0,
      "z": 0
    }]
  });
}
