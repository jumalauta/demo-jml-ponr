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

Demo.prototype.sceneSpace = function () {
  this.loader.setScene('space');

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
    
        color.a = 0.6 + 0.4*percent;    
      }
    }
  });
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
