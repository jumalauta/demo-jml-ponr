
Demo.prototype.sceneCatBattle = function () {
    this.setScene('catBattle');
      
    this.loader.addAnimation({
      "light": {
          "type": "Directional",
          "properties": { "intensity": 2.25 },
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
        "name":"multiSceneEffects/obj_ak.obj"
      }
     ,"position":[{
        "x":5,
        "y":0,
        "z":0
      }]
     ,"angle":[{
        "degreesY":()=>Math.sin(Math.sin(2*getSceneTimeFromStart())),
        "degreesX":0,
        "degreesZ":()=>Math.sin(2*getSceneTimeFromStart())
        }]
     ,"scale":[{"uniform3d":1.0}]
    }]);
  
    this.loader.addAnimation([{
        "image":{
          "name":"sceneCatBattle/tex_temp_cat.png"
        }
        ,"perspective":"3d"
        ,"position":[{
          "x":-5,
          "y":0,
          "z":0
        }]
       ,"angle":[{
          "degreesY":()=>Math.sin(Math.sin(2*getSceneTimeFromStart())),
          "degreesX":0,
          "degreesZ":()=>Math.sin(2*getSceneTimeFromStart())
          }]
       ,"scale":[{"uniform3d":5.0}]
      }]);
}
  