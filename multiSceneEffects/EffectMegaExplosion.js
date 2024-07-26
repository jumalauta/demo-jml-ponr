Demo.prototype.addEffectMegaExplosion = function (startTime, duration,attack,x,y,z, size) {

  let ranX = 0.0;
  let ranY = 0.0;
    this.loader.addAnimation([{
        "start": startTime, "duration": duration,
        "id":"nuke",
        "prevTime":0.0,
        "object":null
        ,"perspective":"3d"
        ,"position":[{
          "x":()=>x+ranX*.015,
          "y":()=>y+ranY*.015,
          "z":()=>z
        }]
        ,"color":[{"r":1.0,"g":1.0,"b":1.0}]
       ,"scale":[{"uniform3d":1.0}
        ,{"duration":duration,"uniform3d":1.2}]
        ,"runFunction":(animation)=>{
          if(animation.prevTime+.01 <= getSceneTimeFromStart())
          {
            ranX = Math.random()-.5;
            ranY = Math.random()-.5;
          }
          animation.prevTime = getSceneTimeFromStart();
        }
      }]);

      this.loader.addAnimation([{
        "parent":"nuke",
        "start": startTime, "duration": duration
        ,"image":{
          "name":"multiSceneEffects/tex_whiteQuad.png"
        }        
        ,"position":[{
          "x":0,
          "y":0,
          "z":0
        }]
        ,"color":[{"r":0.0,"g":0.0,"b":0.0}]
       ,"scale":[{"uniform3d":25.5}]
      }]);

      this.loader.addAnimation([{
        "parent":"nuke"
        ,"start": startTime, "duration": duration
        ,"image":{
          "name":"multiSceneEffects/tex_nuke.png"
        }        
        ,"position":[{
          "x":0,
          "y":-.25,
          "z":0
        }
          ,{"duration":duration,"y":0.15}]
        ,"color":[{"r":1.0,"g":1.0,"b":1.0,"a":1.0}
          ,{"duration":attack,"a":1.0}]
       ,"scale":[{"uniform3d":2.5}]
       ,"shader":{"name":"sceneCatBattle/muzzle.fs"
        ,"variable": [
          {"name":"strength","value":[0.05]}]
        }
      }]);

      this.loader.addAnimation([{
        "parent":"nuke"
        ,"start": startTime, "duration": duration
        ,"additive":true
        ,"image":{
          "name":"multiSceneEffects/tex_nuke.png"
        }        
        ,"position":[{
          "x":.35,
          "y":-.55,
          "z":0
        }
          ,{"duration":duration,"y":0.0}]
        ,"color":[{"r":1.0,"g":1.0,"b":1.0,"a":.0}
          ,{"duration":attack,"a":1.0}]
       ,"scale":[{"uniform3d":1.5}]
       ,"shader":{"name":"sceneCatBattle/muzzle.fs"
        ,"variable": [
          {"name":"strength","value":[0.05]}]
        }
      }]);

      this.loader.addAnimation([{
        "parent":"nuke"
        ,"start": startTime, "duration": duration
        ,"additive":true
        ,"image":{
          "name":"multiSceneEffects/tex_nuke.png"
        }        
        ,"position":[{
          "x":-.35,
          "y":-.55,
          "z":0
        }
          ,{"duration":duration,"y":0.0}]
        ,"color":[{"r":1.0,"g":1.0,"b":1.0,"a":.0}
          ,{"duration":attack,"a":1.0}]
       ,"scale":[{"uniform3d":1.5}]
       ,"shader":{"name":"sceneCatBattle/muzzle.fs"
        ,"variable": [
          {"name":"strength","value":[0.05]}]
        }
      }]);

      this.addEffectExplosion(
        "multiSceneEffects/tex_whiteQuad.png", // texture
        null,                   // model
        startTime,25,  // startTime, duration
        35, 100, 1.0,             // maxDist, amount
        -14,0,2,                // posX, posY, posZ
        5,1,1,                  // startDim       
        0,0,0,                // dimX, dimY, dimZ
        0,15,0,                 // xOffset, yOffset, zOffset
        "SubtractiveBlending",
        "scene");

        this.addEffectExplosion(
          "multiSceneEffects/tex_explosionGeneric.png", // texture
          null,                   // model
          startTime,5,           // startTime, duration
          25, 100, 3.0,              // maxDist, amount
          -14,3,2,                // posX, posY, posZ
          5,1,1,                  // startDim       
          0,0,0,                // dimX, dimY, dimZ
          0,15,0,                 // xOffset, yOffset, zOffset
          "AdditiveBlending",
          "scene");
          this.addEffectExplosion(
            "multiSceneEffects/tex_whiteQuad.png", // texture
            null,                   // model
            startTime,6,  // startTime, duration
            35, 100, 1.0,             // maxDist, amount
            -14,0,2,                // posX, posY, posZ
            5,1,1,                  // startDim       
            0,0,0,                // dimX, dimY, dimZ
            0,15,0,                 // xOffset, yOffset, zOffset
            "SubtractiveBlending",
            "scene");



}