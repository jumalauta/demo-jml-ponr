/*
intro
    Kielletty/seis käsimerkki, liikenteen hälyä, epämääräisesti näkyviä autoja taustalla
    Käsi menee nyrkkiin

transitio
    tärinää, tausta feidaa

nyrkki
    nyrkki lentää avaruudessa ja tuhoaa planeettoja järjestyksessä (myös pluton lol)
    laskeutuu maapallolle meteoriittityyliin (ks se joku conspiracyn intro)

transitio
    nyrkistä kasvaa kukka

ak-47
    kukasta kasvaa monta ak-47:aa

transitio jotenkin ak-47 -> ihmisen käsi (ehkä sama nyrkki hihan kanssa?)

silhuettiskene
    ak-47 jonkun kädessä ampuu kohti tuntematonta
    tuntematon on jättiläiskissa
    jättiläiskissa tuhoaa kaupunkia
    kissaan osuu ydinohjus

pääkallokissa
    kiljuva kissapääkallo
    kaleidoskooppisekoilu
end
    sydän missä lukee jumalauta ja sydämessä mp5 kuten amorin nuoli
*/

Demo.prototype.sceneIntro = function () {
  this.loader.setScene('intro');
};

Demo.prototype.addEffectStarfield = function () {
  let stars = new Array(10000);
  const min = -100;
  const max  = 200;
  for (let i = 0; i < stars.length; i++) {
    stars[i] = {
      "x1": Math.random() * max + min,
      "y1": Math.random() * max + min,
      "z1": i/stars.length * min,
    };
    stars[i].z2 = stars[i].z1 - min;
    stars[i].startTime = 0;
  }

  this.loader.addAnimation({
    "image": "star.png",
    "perspective": "3d",
    "billboard": true,
    "additive": true,
    "instancer": {
      "count": stars.length,
      "runInstanceFunction": (properties) => {
        const i = properties.index;
        const count = properties.count;
        const time = properties.time;
        let object = properties.object;
        let color = properties.color;

        const scale = 0.5;
        object.scale.x = scale;
        object.scale.y = scale;
    
        object.position.x = stars[i].x1;
        object.position.y = stars[i].y1;
        const percent = (time-stars[i].startTime)/5.;
        object.position.z = Utils.mix(stars[i].z1, stars[i].z2, percent);
        if (object.position.z > 0 || time < stars[i].startTime) {
          stars[i] = {
            "x1": Math.random() * max + min,
            "y1": Math.random() * max + min,
            "z1": i/stars.length * min,
          };
          stars[i].z2 = stars[i].z1 - min;
          stars[i].startTime = time; 
        }
    
        color.a = 0.5 + 0.5*percent;    
      }
    }
  });
}

Demo.prototype.addEffectSmoke = function (settings) {
  let smokes = new Array(200);

  this.loader.addAnimation({
    "image": "smoke.png",
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

Demo.prototype.addEffectPlanetExplosion = function () {

  let pieceDirections=
  [
    -1, 1, -1,
     1, 1, -1,
     1, 1, 1,
    -1, 1, 1,
    -1, -1, -1,
     1, -1, -1,
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
            "name":"obj_planet_piece_" + (i+1) + ".obj",
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

Demo.prototype.scenefistingHand = function () {
  this.loader.setScene('fistingHand');
  this.loader.addAnimation([{
    "object":{
      "name":"fist.gltf",
      "time":()=>0.1*getSceneTimeFromStart(),
      "animations": {
        "fist":  {"weight":1.0, "timescale":1.0, "enabled":true, "loop":false}
      }
    }
   ,"position":[{
      "x":0,
      "y":0,
      "z":-10
    }]
   ,"angle":[{
      "degreesY":0,
      "degreesX":90,
      "degreesZ":0
	  }]
   ,"scale":[{"uniform3d":2.03}]
  }]);

  this.loader.addAnimation({
    "light": {
        "type": "Point",
        "properties": { "intensity": 15.0 },
        "castShadow": true
    }
    ,"color": [{
      "r": 1.0,
      "g": 1.0,
      "b": 1.0
    }]
    ,"position": [{
      "x": 5,
      "y": 5,
      "z": 0
    }]
  });

  this.loader.addAnimation({
    "light": {
        "type": "Point",
        "properties": { "intensity": 25.0 },
        "castShadow": false
    }
    ,"color": [{
      "r": 1.0,
      "g": 1.0,
      "b": 1.0
    }]
    ,"position": [{
      "x": -5,
      "y": 0,
      "z": 0
    }]
  });
}

Demo.prototype.sceneSpace = function () {
  this.loader.setScene('space');
  this.addEffectStarfield();
  this.addEffectPlanetSmoke();
  this.addEffectPlanetExplosion();
}

Demo.prototype.sceneSkullCat = function () {
  this.loader.setScene('skullCat');
  this.loader.addAnimation({
    //"start": start, "duration": duration,
    "image": ["temp.png"], //FIXME with actual content
    "shader":{"name":"kaleidoscope.fs",
      "variable": [
        {"name":"kaleidoscopeXangle","value":[()=>((Math.sin(getSceneTimeFromStart())+1)/2.0)*10.0+1.0]},
        {"name":"coordBias","value":[()=>getSceneTimeFromStart()*0.1,()=>0.0]},
      ]
    }
  });
};


Demo.prototype.init = function () {
  const start = 0;
  const duration = 120;
  const settings = new Settings();
  //settings.demo.sync.rocketFile = 'sync/auto.rocket';
  settings.demo.sync.beatsPerMinute = 120;
  settings.demo.sync.rowsPerBeat = 8;

  this.sceneIntro();
  this.scenefistingHand();
  this.sceneSpace();
  this.sceneSkullCat();
  

  this.loader.setScene('main');
  this.loader.addAnimation({"start": start, "duration": 10, "scene":{"name":"intro"}});
  this.loader.addAnimation({"start": start+20, "duration": 30, "scene":{"name":"fistingHand"/*, "fbo":{"name":"skullSpaceFbo"}*/}});
  this.loader.addAnimation({"start": start, "duration": 30, "scene":{"name":"space"/*, "fbo":{"name":"skullSpaceFbo"}*/}});
  this.loader.addAnimation({"start": start+30, "duration": 30, "scene":{"name":"skullCat"/*, "fbo":{"name":"skullCatFbo"}*/}});
};
