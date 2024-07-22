


Demo.prototype.sceneCatBattle = function () {

    this.setScene('catBattle');

    let amountOfBuildings = 64; // 64;
    let catZ = 0.4;
    let akZ = 0.0;
    let buildingZ = 0.2;

    this.loader.addAnimation([{
      "image":{
        "name":"sceneCatBattle/tex_oulu.png"
      }
      ,"perspective":"3d"
      ,"position":[{
        "x":0,
        "y":0,
        "z":-6
      }]
      ,"color": [{
        "r": .195, "g": .195, "b": .195
      }]
     ,"scale":[{"uniform3d":60.0}]
     ,"shader":{"name":"sceneCatBattle/uvscroll.fs"}
    }]);

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

    for(let i=0;i<amountOfBuildings;i++)
    {
      
      let randomNumber = Math.floor(Math.random()*3+1).toString();
      this.loader.addAnimation([{
        "start": i*window.biitti, "duration": 4*window.biitti,
        "image":{
         "name":"sceneCatBattle/tex_building_"+randomNumber+".png"
        }
        ,"perspective":"3d"
        ,"position":[{
          "x":30,
          "y":3,
          "z":-5
        },
        {"duration":4*window.biitti,
          "x":-16
        }]
        ,"color":[{"r":0.225+Math.random()*.125,"g":0.225+Math.random()*.225,"b":0.125+Math.random()*.225}]
       ,"angle":[{
          "degreesZ":()=>5*Math.sin(i+2*getSceneTimeFromStart())
          }]
       ,"scale":[{"uniform3d":12.0}]
      }]);  

      this.addEffectExplosion(
      "multiSceneEffects/tex_whiteQuad.png", // texture
      null,                   // model
      (i+4)*window.biitti,2,  // startTime, duration
       45, 100,              // maxDist, amount
      -16,0,2,                // posX, posY, posZ
      5,11,0,                  // startDim       
      .3,.1,0,                // dimX, dimY, dimZ
       15,0,0,                 // xOffset, yOffset, zOffset
      "SubtractiveBlending",
      "scene");

      this.addEffectExplosion(
        "multiSceneEffects/tex_explosionGeneric.png", // texture
        null,                   // model
        (i+4)*window.biitti,2,  // startTime, duration
         35, 100,              // maxDist, amount
        -16,0,2,                // posX, posY, posZ
        3,11,0,                  // startDim       
        .3,.1,0,                // dimX, dimY, dimZ
         15,0,0,                 // xOffset, yOffset, zOffset
        "AdditiveBlending",
        "scene");
    }


  


    this.loader.addAnimation([{
      "id":"ak47"
     ,"object":{
        "name":"multiSceneEffects/obj_ak.obj"
      }
     ,"position":[{
        "x":()=>Sync.get('CatBattle:Shoot')*.2+5,
        "y":0,
        "z":0
      }]
     ,"angle":[{
        "degreesZ":()=>Sync.get('CatBattle:Shoot')*(Math.random()*2-1)+Math.sin(2*getSceneTimeFromStart())
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
        "z":-.1
      }]
      ,"color":[{"r":0.0,"g":0.0,"b":0.0}]
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
        "z":.1
      }]
      ,"color":[{"r":0.0,"g":0.0,"b":0.0}]
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
        "z":.1
      }]
      ,"color":[{"r":0.0,"g":0.0,"b":0.0}]

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
          "z":-.1
        }]
        ,"color":[{"r":0.5,"g":0.5,"b":0.5,"a":()=>Sync.get('CatBattle:Shoot')}]
        ,"angle":[{

          "degreesZ":()=>Math.sin(2*getSceneTimeFromStart())
          }]
        ,"scale":[{"uniform3d":2.0}]
        ,"shader":{"name":"sceneCatBattle/muzzle.fs"}
      }]);


      this.loader.addAnimation([{
        "image":{
          "name":"sceneCatBattle/tex_temp_cat.png"
        }
        ,"perspective":"3d"
        ,"position":[{
          "x":-30,
          "y":2,
          "z":0
        }]
        ,"color":[{"r":0.125,"g":0.125,"b":0.125}]
       ,"angle":[{
  
          "degreesZ":()=>Math.sin(2*getSceneTimeFromStart())
          }]
       ,"scale":[{"uniform3d":25.0}]
      }]);
}
  