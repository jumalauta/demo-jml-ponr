Demo.prototype.sceneOutro = function () {
    this.setScene('outro');
    this.addSkysphere();
    this.addEffectStarfield(0, 8*window.pattern, 5000, "multiSceneEffects/star.png", 500, 1.7);

    this.loader.addAnimation({
        "light": {
            "type": "Point",
            "properties": { "intensity":724.55 },
            "castShadow": true
        }
        ,"color": [{
          "r": 1.0, "g": 1.0, "b": 1.0
        }]
        ,"position": [{
          "x": ()=>window.camPos[0]-11, "y": ()=>window.camPos[1]+6, "z": ()=>window.camPos[2]+6
        }]
      });

    this.loader.addAnimation([{
        "id":"heart"
       ,"object":{
          "name":"sceneOutro/obj_outroHeart.obj"
        }
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
          "degreesY":()=>15*getSceneTimeFromStart()
          }]
       ,"scale":[{"uniform3d":0.5}]
      }]);

      this.loader.addAnimation([{
        "parent":"heart"
       ,"object":{
          "name":"sceneOutro/obj_outroAk.obj"
        }
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

       ,"scale":[{"uniform3d":1.0}]
      }]);

      this.loader.addAnimation([{
        "parent":"heart"
       ,"object":{
          "name":"sceneOutro/obj_outroFarjan.obj"
        }
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

       ,"scale":[{"uniform3d":1.0}]
      }]);
}  