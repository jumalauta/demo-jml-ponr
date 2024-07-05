
Demo.prototype.sceneEarthHit = function () {
    this.setScene('earthHit');
    this.addEffectStarfield();
  
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
        "x": -5, "y": 5, "z": 0
      }]
    });
  
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
        "degreesY":0,
        "degreesX":0,
        "degreesZ":()=>getSceneTimeFromStart()
        }]
     ,"scale":[{"uniform3d":1.0}]
    }]);
  
}
  