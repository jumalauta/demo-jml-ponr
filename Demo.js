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
  this.sceneSkullCat();

  this.loader.setScene('main');
  this.loader.addAnimation({"start": start, "duration": 10, "scene":{"name":"intro"}});
  this.loader.addAnimation({"start": start, "duration": duration, "scene":{"name":"skullCat"/*, "fbo":{"name":"skullCatFbo"}*/}});
};
