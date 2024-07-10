
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
        "degreesY":()=>-getSceneTimeFromStart()*10,
        "degreesX":0,
        "degreesZ":0
        }]
     ,"scale":[{"uniform3d":1.0}]
    }]);
 
    // cloud shadow
    this.loader.addAnimation({
      object: "sceneEarthHit/clouds.png",
      shape: { type: 'SPHERE', radius: 2.0 },
      angle: [{degreesY:()=>3}],
      shader:{
        name:"sceneEarthHit/clouds.fs",
        variable:
        [
          {name:"dark","value":[()=>0.25]},
          {name:"cloudCoverage","value":[()=>0.85]}
        ]
      }
    });
    // cloud
    this.loader.addAnimation({
      object: "sceneEarthHit/clouds.png",
      shape: { type: 'SPHERE', radius: 2.03 },
      shader:{
        name:"sceneEarthHit/clouds.fs",
        variable:
        [
          {name:"dark","value":[()=>0.45]},
          {name:"cloudCoverage","value":[()=>0.85]}
        ]
      }
    });
}
  