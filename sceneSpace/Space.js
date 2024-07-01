
Demo.prototype.addEffectSmoke = function (settings) {
  let smokes = new Array(200);

  this.loader.addAnimation({
    "image": "sceneSpace/smoke.png",
    "perspective": "3d",
    "layer": 100,
    "billboard": true,
    "additive": true,
    "instancer": {
      "count": smokes.length,
      "runInstanceFunction": (properties) => {
        const i = properties.index;
        const count = properties.count;
        const time = properties.time;
        let object = properties.object;
        let color = properties.color;

        let smoke = smokes[i];

        if (smoke === undefined || time + 5 < smoke.startTime || time > smoke.startTime + smoke.duration) {
          smokes[i] = {
            x1: settings.start.x,
            y1: settings.start.y,
            z1: settings.start.z,
            direction: {
              x: settings.direction.x + Math.random() * 0.2 - 0.1, y: settings.direction.y + Math.random() * 0.2 - 0.1, z: settings.direction.z + Math.random() * 0.2 - 0.1
            },
            startTime: time + Math.random() * (settings.duration * 2),
            duration: settings.duration + Math.random() * 0.1,
            distance: settings.distance + Math.random() * 0.1,
            scale: settings.scale + Math.random() * 0.2,
          };
          smoke = smokes[i];
        }

        const percent = (time-smoke.startTime)/smoke.duration;
        if (percent < 0) {
          color.a = 0;
          return;
        }

        const dynamicity = Math.sin(time+percent+i)*(0.1+0.1*percent)*percent;

        object.position.x = smoke.x1 + (smoke.direction.x * percent) * smoke.distance * percent + dynamicity*(1-smoke.direction.x);
        object.position.y = smoke.y1 + (smoke.direction.y * percent) * smoke.distance * percent + dynamicity*(1-smoke.direction.y);
        object.position.z = smoke.z1 + (smoke.direction.z * percent) * smoke.distance * percent + dynamicity*(1-smoke.direction.z);
    
        color.a = 0.05*(1-percent);

        const scale = 0.1 + percent * smoke.scale;
        object.scale.x = scale;
        object.scale.y = scale;
      }
    }
  });
}

Demo.prototype.addEffectPlanetSmoke = function () {
  const smokeCount = 8;
  const distance = 1;
  for(let i = 0; i < smokeCount; i++) {
    const x1 = Math.sin(i * Math.PI * 2 / smokeCount) * distance;
    const y1 = Math.cos(i * Math.PI * 2 / smokeCount) * distance;
    const x2 = Math.sin(i * Math.PI * 2 / smokeCount) * (distance + 1);
    const y2 = Math.cos(i * Math.PI * 2 / smokeCount) * (distance + 1);
    const directionX = x2 - x1;
    const directionY = y2 - y1;

    this.addEffectSmoke({start:{x:0,y:0,z:-10}, direction:{x:directionX,y:directionY,z:0}, duration:9, distance:35, scale:6.5});
  }
}

Demo.prototype.addEffectPlanetExplosion = function (start) {

  let pieceDirections =
  [
    -1, 1,-1,
     1, 1,-1,
     1, 1, 1,
    -1, 1, 1,
    -1,-1,-1,
     1,-1,-1,
     1,-1, 1,
    -1,-1, 1,
  ];

  let amountOfPlanetLayers = 4;

  for(let i2 = 0; i2 < amountOfPlanetLayers; i2++)
    {
    
      this.loader.addAnimation({
         "id":"null"+i2
        ,"object":null
        ,"position":[{"x":0,"y":0,"z":-10}]
        ,"scale":[{"uniform3d":1.5}]
        ,"angle": [{"degreesY":i2*45,"degreesZ":i2*45,"degreesX":i2*45}]
      });

    for(let i=0;i<8;i++)
      {
        this.loader.addAnimation([{
           "parent":"null"+i2
          ,"object":{
            "name":"sceneSpace/obj_planet_piece_" + (i+1) + ".obj",
            "time":()=>0.1*getSceneTimeFromStart(),
          }
        ,"position":[{
            "x":0,
            "y":0,
            "z":0
          },
          {"duration":40,

            "x":(Math.random()*pieceDirections[i*3]+pieceDirections[i*3]*(3+amountOfPlanetLayers-i2))*2.0,
            "y":(Math.random()*pieceDirections[i*3+1]+pieceDirections[i*3+1]*(3+amountOfPlanetLayers-i2))*2.0,
            "z":(Math.random()*pieceDirections[i*3+2]+pieceDirections[i*3+2]*(3+amountOfPlanetLayers-i2))*2.0,

          }]
        ,"angle":[{
            "degreesY":0,
            "degreesX":0,
            "degreesZ":0
          },
          {"duration":40,
            "degreesX":-90+180*Math.random(),
            "degreesY":-90+180*Math.random(),
            "degreesZ":-90+180*Math.random(),
          }]
        ,"scale":[{"uniform3d":2.50-.75*i2}]
        }]);
      }
    }

    this.loader.addAnimation({
      "light": {
          "type": "Point",
          "properties": { "intensity": 125.0 },
          "castShadow": true
      }
      ,"color": [{
        "r": 1.0, "g": 1.0, "b": 1.0
      }]
      ,"position": [{
        "x": 0, "y": 0, "z": 0
      }]
    });
}


Demo.prototype.sceneSpace = function () {
  this.loader.setScene('space');
  this.addEffectStarfield(Sync.get('Starfield:Speed'));
  //this.addEffectPlanetSmoke();
  //this.addEffectPlanetExplosion();
}
