Demo.prototype.sceneCatBattle = function () {

    this.setScene('catBattle');

    let amountOfBuildings = 45; // 64;
    let normalBuildings = 40;
    let catZ = 0.4;
    let akZ = 0.0;
    let buildingZ = 0.2;

    let greets = [
      "MFX",
      "Matt Current",
      "Dekadence",
      "Unique",
      "U+1F35E",
      "cr!sp",
      "Adapt",
      "Byterapers",
      "Brain",
      "Gorbat",
      "Ivory",
      "Magnetismin",
      "RBBS",
      "SFLG",
      "Hackers",
      "Aatekorjaamo"
    ]

    let greets2 = [
      null,
      "Current",
      null,
      null,
      null,
      null,
      null,
      null,
      "Control",
      "Soft",
      "Labs",
      "Tietokonekerho",
      null,
      null,
      null,
      null
    ]

    
    this.loader.addAnimation([{
      "image":{
        "name":"sceneCatBattle/tex_citybg.png"
      }
      ,"perspective":"3d"
      ,"position":[{
        "x":2,
        "y":24,
        "z":-8
      }]
     ,"scale":[{"uniform3d":30.0}]
     ,"shader":{"name":"sceneCatBattle/uvscroll.fs",
      "variable": [
        {"name":"timeScale","value":[.1]},
        {"name":"fakeTime","value":[()=>Sync.get('CatBattle:FakeTime')]},
        {"name":"kolor","value":[.9]}
      ]
    }
    }]);

    this.loader.addAnimation([{
      "image":{
        "name":"sceneCatBattle/tex_citybg.png"
      }
      ,"perspective":"3d"
      ,"position":[{
        "x":2,
        "y":12,
        "z":-7
      }]
     ,"scale":[{"uniform3d":35.0}]
     ,"shader":{"name":"sceneCatBattle/uvscroll.fs",
      "variable": [
        {"name":"timeScale","value":[.1]},
        {"name":"kolor","value":[.05]}
      ]
    }
    }]);

    this.loader.addAnimation([{
      "image":{
        "name":"sceneCatBattle/tex_citybg.png"
      }
      ,"perspective":"3d"
      ,"position":[{
        "x":0,
        "y":-1,
        "z":-6
      }]
     ,"scale":[{"uniform3d":40.0}]
     ,"shader":{"name":"sceneCatBattle/uvscroll.fs",
      "variable": [
        {"name":"timeScale","value":[.14]},
        {"name":"kolor","value":[0.0]}
      ]
    }
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

    let animStopTime = window.biitti*40;
    window.stopNow = false;

    this.loader.addAnimation([{
      "runFunction":()=>{ if(getSceneTimeFromStart()>animStopTime) 
        {
          window.stopNow = true;
        }
        else
        {
          window.stopNow = false;
        }
      }
    }]);

    for(let i=0;i<amountOfBuildings;i++)
    {
      let randomNumber = Math.floor(Math.random()*3+1).toString();
      this.loader.addAnimation([{
        "id":"building"+i,
        "start": i > 4 ? (i-4)*window.biitti : 0, "duration": i<=normalBuildings?4*window.biitti:32*window.biitti,
        "image":{
         "name":"sceneCatBattle/tex_building_"+randomNumber+".png"
        }
        ,"perspective":"3d"
        ,"AnimStop":0.0
        ,"position":[{
          "x":i>4 ? 30 : 30-11.5*i,
          "y":3,
          "z":-5
        },
        {"duration":4*window.biitti,
          "x":i>4 ? -16 : -16-11.5*i
        }]
        ,"color":[{"r":0.5+Math.random()*.5,"g":0.5+Math.random()*.5,"b":0.5+Math.random()*.5}]
       ,"angle":[{
          "degreesZ":()=>5*Math.sin(i+2*getSceneTimeFromStart())
          }]
       ,"scale":[{"uniform3d":12.0}]
       ,"runPreFunction":(animation) => {
        if(window.stopNow == true) 
        {
          animation.time = getSceneTimeFromStart()-animation.start;
        }
        else
        {
          animation.time = undefined;
        }
       }
      }]);  

      this.loader.addAnimation([{
        "parent":"building"+i,
        "text":{"string":greets[i%greets.length] ,"name":"multiSceneEffects/font.ttf"},
        "perspective":"3d",
        "color":[{"r":0,"g":0,"b":0}],
        "position":[{"x":.01,"y":-.02}],
        "scale":[{"uniform3d":2.0}]
      }]);
      
      if(greets2[i%greets.length] != null)
      {
        this.loader.addAnimation([{
          "parent":"building"+i,
          "text":{"string":greets2[i%greets.length] ,"name":"multiSceneEffects/font.ttf"},
          "perspective":"3d",
          "color":[{"r":0,"g":0,"b":0}],
          "position":[{"x":.01,"y":-.27}],
          "scale":[{"uniform3d":2.0}]
        }]);
      }

      this.loader.addAnimation([{
        "parent":"building"+i,
        "text":{"string":greets[i%greets.length] ,"name":"multiSceneEffects/font.ttf"},
        "perspective":"3d",
        "color":[{"r":.5,"g":.5,"b":.5}],
        "scale":[{"uniform3d":2.0}]
      }]);
      
      if(greets2[i%greets.length] != null)
      {
        this.loader.addAnimation([{
          "parent":"building"+i,
          "text":{"string":greets2[i%greets.length] ,"name":"multiSceneEffects/font.ttf"},
          "perspective":"3d",
          "position":[{"y":-.25}],
          "color":[{"r":.5,"g":.5,"b":.5}],
          "scale":[{"uniform3d":2.0}]
        }]);
      }
      
      if(i<=normalBuildings-4)
      {
        this.addEffectExplosion(
        "multiSceneEffects/tex_whiteQuad.png", // texture
        null,                   // model
        (i+4)*window.biitti,2,  // startTime, duration
        45, 100, 1.0,             // maxDist, amount
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
          35, 100, 1.0,              // maxDist, amount
          -16,0,2,                // posX, posY, posZ
          3,11,0,                  // startDim       
          .3,.1,0,                // dimX, dimY, dimZ
          15,0,0,                 // xOffset, yOffset, zOffset
          "AdditiveBlending",
          "scene");
      }
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
        ,"additive":true
        ,"perspective":"3d"
        ,"position":[{
          "x":-4.7,
          "y":.44,
          "z":-.1
        }]
        ,"color":[{"r":1,"g":1,"b":1,"a":()=>Sync.get('CatBattle:Shoot')}]
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
        ,"color":[{"r":0.5,"g":0.5,"b":0.5}]
       ,"angle":[{
  
          "degreesZ":()=>Math.sin(2*getSceneTimeFromStart())
          }]
       ,"scale":[{"uniform3d":25.0}]
      }]);
}
  