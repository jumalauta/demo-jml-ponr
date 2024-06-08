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
  const smokeCount = 5;
  const distance = 3;
  for(let i = 0; i < smokeCount; i++) {
    const x1 = Math.sin(i * Math.PI * 2 / smokeCount) * distance;
    const y1 = Math.cos(i * Math.PI * 2 / smokeCount) * distance;
    const x2 = Math.sin(i * Math.PI * 2 / smokeCount) * (distance + 1);
    const y2 = Math.cos(i * Math.PI * 2 / smokeCount) * (distance + 1);
    const directionX = x2 - x1;
    const directionY = y2 - y1;

    this.addEffectSmoke({start:{x:0,y:-0.5,z:1}, direction:{x:directionX,y:directionY,z:0}, duration:3, distance:1, scale:0.5});
  }
}

Demo.prototype.sceneSpace = function () {
  this.loader.setScene('space');

  this.addEffectStarfield();
  this.addEffectPlanetSmoke();

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
  this.sceneSpace();
  this.sceneSkullCat();

  this.loader.setScene('main');
  this.loader.addAnimation({"start": start, "duration": 10, "scene":{"name":"intro"}});
  this.loader.addAnimation({"start": start, "duration": 30, "scene":{"name":"space"/*, "fbo":{"name":"skullSpaceFbo"}*/}});
  this.loader.addAnimation({"start": start+30, "duration": 30, "scene":{"name":"skullCat"/*, "fbo":{"name":"skullCatFbo"}*/}});
};
