const bpm = 120;
const beat = 60/bpm;

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
      "Aatekorjaamo",
      "Mehu"
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
     ,"scale":[{"uniform3d":38.0}]
     ,"shader":{"name":"sceneCatBattle/uvscroll.fs",
      "variable": [
        {"name":"timeScale","value":[.05]},
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
        {"name":"kolor","value":[.15]}
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
        "y":-5,
        "z":-6
      }]
     ,"scale":[{"uniform3d":40.0}]
     ,"shader":{"name":"sceneCatBattle/uvscroll.fs",
      "variable": [
        {"name":"timeScale","value":[.2]},
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
      let randomNumber = Math.floor(Utils.random()*5+1).toString();
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
       ,"scale":[{"uniform3d":13.0}]
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

      const greetMaterial = {transparent:false,castShadow:false,receiveShadow:false};
      
      this.loader.addAnimation([{
        "parent":"building"+i,
        "id":"greetzParent"+i,
        "object":null,
        "perspective":"3d",
        "material":greetMaterial,
        "position":[{"z":.012,"y":-.1+(i%2)*.35}]
      }]);
      
      this.loader.addAnimation([{
        "parent":"greetzParent"+i,
        "text":{"string":greets[i%greets.length] ,"name":"multiSceneEffects/font.ttf"},
        "perspective":"3d",
        "material":greetMaterial,
        "color":[{"r":0,"g":0,"b":0}],
        "position":[{"x":.02,"y":-.03}],
        "scale":[{"uniform3d":2.0}]
      }]);

      
      if(greets2[i%greets.length] != null)
      {
        this.loader.addAnimation([{
          "parent":"greetzParent"+i,
          "text":{"string":greets2[i%greets.length] ,"name":"multiSceneEffects/font.ttf"},
          "perspective":"3d",
          "material":greetMaterial,
          "color":[{"r":0,"g":0,"b":0}],
          "position":[{"x":.03,"y":-.28}],
          "scale":[{"uniform3d":2.0}]
        }]);
      }

      this.loader.addAnimation([{
        "parent":"greetzParent"+i,
        "text":{"string":greets[i%greets.length] ,"name":"multiSceneEffects/font.ttf"},
        "perspective":"3d",
        "material":greetMaterial,
        "color":[{"r":.85,"g":.85,"b":.85}],
        "scale":[{"uniform3d":2.0}]
      }]);
      
      if(greets2[i%greets.length] != null)
      {
        this.loader.addAnimation([{
          "parent":"greetzParent"+i,
          "text":{"string":greets2[i%greets.length] ,"name":"multiSceneEffects/font.ttf"},
          "perspective":"3d",
          "material":greetMaterial,
          "position":[{"y":-.25}],
          "color":[{"r":.85,"g":.85,"b":.85}],
          "scale":[{"uniform3d":2.0}]
        }]);
      }
      

      if(i<=normalBuildings-4)
      {
        this.addEffectExplosion(
        "multiSceneEffects/tex_whiteQuad.png", // texture
        null,                   // model
        (i+4)*window.biitti,1,  // startTime, duration
        35, 100, 2.0,             // maxDist, amount
        -14,0,2,                // posX, posY, posZ
        6,15,0,                  // startDim       
        .3,.1,0,                // dimX, dimY, dimZ
        15,0,0,                 // xOffset, yOffset, zOffset
        "SubtractiveBlending",
        "scene");

        this.addEffectExplosion(
          "multiSceneEffects/tex_explosionGeneric.png", // texture
          null,                   // model
          (i+4)*window.biitti,1,  // startTime, duration
          5, 100, 3.0,              // maxDist, amount
          -14,0,2,                // posX, posY, posZ
          6,15,0,                  // startDim       
          .3,.1,0,                // dimX, dimY, dimZ
          3,0,0,                 // xOffset, yOffset, zOffset
          "AdditiveBlending",
          "scene");
      }
    }

    this.loader.addAnimation([{
      "id":"ak47ejector"
     ,"object":{
        "name":null
      }
     ,"position":[{
        "x":()=>5,
        "y":()=>.2*Math.sin(2.5*getSceneTimeFromStart()),
        "z":-0.05
      }]
     ,"angle":[{
        "degreesZ":()=>Sync.get('CatBattle:Shoot')*(Math.random()*2-1)+Math.sin(2*getSceneTimeFromStart())
        }]
    }]);

    this.loader.addAnimation([{
      "id":"ak47"
     ,"object":{
        "name":"multiSceneEffects/obj_ak.obj"
      }
     ,"position":[{
        "x":()=>Sync.get('CatBattle:Shoot')*.2+5,
        "y":()=>.2*Math.sin(2.5*getSceneTimeFromStart()),
        "z":0
      }]
      ,"color":[{
        "r":1.0,
        "g":1.0,
        "b":1.0
      }]
     ,"angle":[{
        "degreesZ":()=>Sync.get('CatBattle:Shoot')*(Math.random()*2-1)+Math.sin(2*getSceneTimeFromStart())
        }]
     ,"scale":[{"uniform3d":1.0}]
    }]);

    window.ak47ShellRow = 0;
    for (let i = 0; i < 30; i++) {
      const sync = new Sync();
      const settings = new Settings();
      const duration = beat*3;
      const rotSpeedVar = Math.random()*180-90;
      const col = 0.6;
      this.loader.addAnimation({
        start: 0, duration: 20,
        time: 0,
        image: 'sceneCatBattle/ak47shell.png',
        i:i,
        parent: 'ak47ejector',
        perspective: '3d',
        position: [{x: -0.7+(Math.random()*0.2-0.1), y: 0.5+(Math.random()*0.2-0.1), z: -.05},{duration:duration, x: 0.0+(Math.random()*2.0-1.0), y: 2.0+(Math.random()*1.0-0.5), z: -.05}],
        scale:[{uniform3d:1.3},{duration:duration, uniform3d:1.15+(Math.random()*0.1-0.05)}],
        color:[{a:0.0,r:col,g:col,b:col},{duration:duration/2,a:1.0},{duration:duration/2, a:0.0}],
        angle:[{degreesZ:rotSpeedVar},{duration:duration, degreesZ:-180*(1+Math.random())+rotSpeedVar}],
        runFunction: (animation) => {
          const row = Math.floor(sync.getRow());
          if (window.ak47ShellRow > row) {
            window.ak47ShellRow = row-1;
          }

          if (animation.shellRow !== undefined) { 
            animation.time = (sync.getRow() - animation.shellRow)/beat/settings.demo.sync.rowsPerBeat;
            if (animation.time < 0.0 || animation.time >= duration*2) {
              animation.shellRow = undefined;
              animation.color[0].a = 0.0;
              animation.time = 0;  
            }
          } else {
            const shoot = Sync.get('CatBattle:Shoot');
            if (shoot >= 1.0 && row > window.ak47ShellRow) {
              const now = getSceneTimeFromStart();
              window.ak47ShellRow = row;
              animation.color[0].a = 1.0;
              animation.shellRow = sync.getRow();
              animation.time = 0;
            }
          }
        }
      });
    }

    this.loader.addAnimation([{
      "id":"dabomb"
     ,"duration":40*window.biitti
     ,"object":null
     ,"position":[{
        "x":()=>Sync.get('CatBattle:BombX'),
        "y":()=>Sync.get('CatBattle:BombY'),
        "z":()=>Sync.get('CatBattle:BombZ')
      }]
      ,"color":[{
        "r":1.0,
        "g":1.0,
        "b":1.0
      }]
     ,"angle":[{
        "degreesZ":()=>Sync.get('CatBattle:BombRot'),
        "degreesY":-45
        }]
     ,"scale":[{"uniform3d":1.0}]
    }]);

    this.loader.addAnimation([{
      "parent":"dabomb"
     ,"object":{
        "name":"sceneCatBattle/obj_dabomb.obj"
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
        "degreesY":()=>180*getSceneTimeFromStart(),
        }]
     ,"scale":[{"uniform3d":1.0}]
    }]);

    this.loader.addAnimation([{
      "image":{
        "name":"sceneCatBattle/tex_tank.png"
      }
      ,"perspective":"3d"
      ,"position":[{
        "x":9,
        "y":()=>.2*Math.sin(2.5*getSceneTimeFromStart())-5,
        "z":-.1
      }]
      ,"color":[{"r":0.0,"g":0.0,"b":0.0}]
     ,"angle":[{
        "degreesZ":()=>Math.sin(2*getSceneTimeFromStart())
        }]
     ,"scale":[{"uniform3d":7.9}]
    }]);

    this.loader.addAnimation([{
      "image":{
        "name":"sceneCatBattle/tex_body.png"
      }
      ,"perspective":"3d"
      ,"position":[{
        "x":5,
        "y":()=>.2*Math.sin(2.5*getSceneTimeFromStart())-1.8,
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
        ,"shader":{"name":"sceneCatBattle/muzzle.fs"
          ,"variable": [
            {"name":"strength","value":[1.0]}]
          }
      }]);


      this.loader.addAnimation([{
        "id":"battlecat",
        "duration":40*window.biitti,
        "object":null
        ,"perspective":"3d"
        ,"position":[{
          "x":-34,
          "y":2.2,
          "z":0
        }]
        ,"color":[{"r":0.5,"g":0.5,"b":0.5}]
       ,"angle":[{
  
          "degreesZ":()=>Math.sin(2*getSceneTimeFromStart())
          }]
       ,"scale":[{"uniform3d":6.5}]
      }]);

      this.loader.addAnimation([{
        "id":"battlecatleg2",
        "parent":"battlecat",
        "object":null
        ,"perspective":"3d"
        ,"position":[{
          "x":1.2,
          "y":0.2,
          "z":0
        }]
        ,"color":[{"r":0.5,"g":0.5,"b":0.5}]
       ,"angle":[{
          "degreesZ":()=>5+15*Math.sin(-3.5*getSceneTimeFromStart())
          }]
       ,"scale":[{"uniform3d":1.0}]
      }]);

      this.loader.addAnimation([{
        "parent":"battlecatleg2",
        "image":{
          "name":"sceneCatBattle/tex_battlecat_leg1.png"
        }
        ,"perspective":"3d"
        ,"position":[{
          "x":0,
          "y":-1.5,
          "z":0
        }]
        ,"color":[{"r":0.5,"g":0.5,"b":0.5}]
       ,"scale":[{"y":1.5}]
      }]);

      this.loader.addAnimation([{
        "parent":"battlecat",
        "image":{
          "name":"sceneCatBattle/tex_battlecat_torso.png"
        }
        ,"perspective":"3d"
        ,"position":[{
          "x":0,
          "y":0,
          "z":0
        }]
        ,"color":[{"r":0.5,"g":0.5,"b":0.5}]
       ,"angle":[{
          "degreesZ":()=>2*Math.sin(2*getSceneTimeFromStart())
          }]
       ,"scale":[{"uniform3d":1.0}]
      }]);
      this.loader.addAnimation([{
        "parent":"battlecat",
        "image":{
          "name":"sceneCatBattle/tex_battlecat_head.png"
        }
        ,"perspective":"3d"
        ,"position":[{
          "x":2.3,
          "y":()=>0.7+.1*Math.sin(3*getSceneTimeFromStart()),
          "z":0
        }]
        ,"color":[{"r":0.5,"g":0.5,"b":0.5}]
       ,"angle":[{
          "degreesZ":()=>3*Math.sin(3*getSceneTimeFromStart())
          }]
       ,"scale":[{"uniform3d":1.4}]
      }]);

      this.loader.addAnimation([{
        "id":"battlecatleg1",
        "parent":"battlecat",
        "object":null
        ,"perspective":"3d"
        ,"position":[{
          "x":0.8,
          "y":0.2,
          "z":0
        }]
        ,"color":[{"r":0.5,"g":0.5,"b":0.5}]
       ,"angle":[{
          "degreesZ":()=>5+15*Math.sin(3.5*getSceneTimeFromStart())
          }]
       ,"scale":[{"uniform3d":1.0}]
      }]);

      this.loader.addAnimation([{
        "parent":"battlecatleg1",
        "image":{
          "name":"sceneCatBattle/tex_battlecat_leg1.png"
        }
        ,"perspective":"3d"
        ,"position":[{
          "x":0,
          "y":-1.5,
          "z":0
        }]
        ,"color":[{"r":0.5,"g":0.5,"b":0.5}]
       ,"scale":[{"uniform3d":1.0}]
      }]);

      this.addEffectMegaExplosion(40*window.biitti,16*window.biitti,8*window.biitti,0,0,0,1.0);
}

