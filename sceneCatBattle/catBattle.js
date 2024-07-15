
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
      "image":{
        "name":"sceneCatBattle/tex_temp_cat.png"
      }
      ,"perspective":"3d"
      ,"position":[{
        "x":-5,
        "y":0,
        "z":0
      }]
      ,"color":[{"r":0.5,"g":0.5,"b":0.5}]
     ,"angle":[{

        "degreesZ":()=>Math.sin(2*getSceneTimeFromStart())
        }]
     ,"scale":[{"uniform3d":5.0}]
    }]);

    this.loader.addAnimation([{
      "id":"ak47"
     ,"object":{
        "name":"multiSceneEffects/obj_ak.obj"
      }
     ,"position":[{
        "x":5,
        "y":0,
        "z":0
      }]
     ,"angle":[{
        "degreesZ":()=>Math.sin(2*getSceneTimeFromStart())
        }]
     ,"scale":[{"uniform3d":1.0}]
    }]);


    this.loader.addAnimation([{
      "image":{
        "name":"sceneCatBattle/tex_body.png"
      }
      ,"perspective":"3d"
      ,"position":[{
        "x":5,
        "y":-1.8,
        "z":-.05
      }]
      ,"color":[{"r":0.1,"g":0.1,"b":0.1}]
     ,"angle":[{

        "degreesZ":()=>Math.sin(2*getSceneTimeFromStart())
        }]
     ,"scale":[{"uniform3d":2.35}]
    }]);

    this.loader.addAnimation([{
      "parent":"ak47",
      "image":{
        "name":"sceneCatBattle/tex_leftHand.png"
      }
      ,"perspective":"3d"
      ,"position":[{
        "x":0.26,
        "y":-.15,
        "z":.15
      }]
      ,"color":[{"r":0.1,"g":0.1,"b":0.1}]
     ,"scale":[{"uniform3d":2.1}]
    }]);

    this.loader.addAnimation([{
      "parent":"ak47",
      "image":{
        "name":"sceneCatBattle/tex_rightHand.png"
      }
      ,"perspective":"3d"
      ,"position":[{
        "x":-1.5,
        "y":.25,
        "z":.16
      }]
      ,"color":[{"r":0.1,"g":0.1,"b":0.1}]

     ,"scale":[{"uniform3d":2.25}]
    }]);

      this.loader.addAnimation([{
        "parent":"ak47"
       ,"image":{
          "name":"sceneCatBattle/tex_muzzle.png"
        }
        ,"perspective":"3d"
        ,"position":[{
          "x":-4.7,
          "y":.44,
          "z":-.2
        }]
        ,"color":[{"r":0.5,"g":0.5,"b":0.5,"a":()=>Sync.get('CatBattle:Shoot')}]
        ,"angle":[{

          "degreesZ":()=>Math.sin(2*getSceneTimeFromStart())
          }]
        ,"scale":[{"uniform3d":2.0}]
        ,"shader":{"name":"sceneCatBattle/muzzle.fs"}
      }]);
}
  