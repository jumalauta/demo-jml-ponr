
Demo.prototype.sceneIntro = function () {
  this.setScene('intro');
  this.addEffectStarfield();

  this.loader.addAnimation([{
    "duration":12.1,
    "image":{
      "name":"sceneIntro/tex_bigstar.png"
    }
    ,"billboard": true
    ,"perspective":"3d"
    ,"position":[{
      "x":-55,
      "y":5,
      "z":0
    }]
    ,"color":[{"r":1.0,"g":1.0,"b":1.0,"a":1.0}
      ,{"duration":10,"a":1.0}
      ,{"duration":2,"a":0.0}
    ]
    
   ,"scale":[{"uniform3d":55.1}]

  }]);

  this.loader.addAnimation([{
    "object":{
      "name":"sceneHand/fist.gltf",
      "time":()=>Sync.get('Fist:Anim'),
      "animations": {
        "fist":  {"weight":1.0, "timescale":1.0, "enabled":true, "loop":false}
      }
    }
    ,"position":[{
      "x":()=>Sync.get('Fist:PosX'),
      "y":()=>Sync.get('Fist:PosY'),
      "z":()=>Sync.get('Fist:PosZ')
    }]
    ,"color": [{
      "r": 0.35,
      "g": 0.35,
      "b": 0.35
    }]
   ,"angle":[{
      "degreesY":()=>Sync.get('Fist:AngleY'),
      "degreesX":()=>Sync.get('Fist:AngleX'),
      "degreesZ":()=>Sync.get('Fist:AngleZ'),
	  }]
   ,"scale":[{"uniform3d":0.53}]
  }]);

  this.loader.addAnimation([{
    "object":{
      "name":"sceneIntro/obj_blackPlanetRing.obj"
    }
   ,"position":[{
      "x":-45,
      "y":-18,
      "z":0
    }]
   ,"scale":[{"uniform3d":15.0}]
  }]);

  this.loader.addAnimation([{
    "object":{
      "name":"sceneIntro/obj_blackPlanet.obj"
    }
   ,"position":[{
      "x":-45,
      "y":-18,
      "z":0
    }]
   ,"scale":[{"x":14.95,"y":14.5,"z":14.95}]
  }]);

  this.loader.addAnimation({
    "light": {
        "type": "Point",
        "properties": { "intensity": 55.0 },
        "castShadow": true
    }
    ,"color": [{
      "r": 1.0,
      "g": 1.0,
      "b": 1.0
    }]
    ,"position": [{
      "x": 0,
      "y": 1,
      "z": 5
    }]
  });




}
