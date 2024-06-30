/*
intro / 0-1
    Monoliitti avaruudessa. Rotatoi ja paljastuu kädeksi

intro / 2-5
    Käsi menee nyrkkiin

transitio / 6-7
    tärinää, nyrkki lentää kohti kameraa

nyrkki / 8-11
    nyrkki lentää avaruudessa

nyrkki / 12-15
    tuhoaa planeettoja järjestyksessä (myös pluton lol)
nyrkki / 16-17
    laskeutuu maapallolle meteoriittityyliin (ks se joku conspiracyn intro)

nyrkki impacträjähdys / 17-18
    
nyrkistä kasvaa kukka / 19-23

ak-47 / 23-26
    kukasta kasvaa monta ak-47:aa
    jotain ak-47 meininkiä ja joku transitio lopussa

silhuettiskene / 27-31
    ak-47 jonkun kädessä ampuu kohti tuntematonta
    tuntematon on jättiläiskissa
    jättiläiskissa tuhoaa kaupunkia

silhuettiskene / 31-32
    kissaan ammutaan ydinohjus

pääkallokissa / 33-40
    kiljuva kissapääkallo
    kaleidoskooppisekoilu
end
    sydän missä lukee jumalauta ja sydämessä mp5 kuten amorin nuoli
*/

includeFile('sceneHand/Hand.js');
includeFile('sceneIntro/Intro.js');
includeFile('sceneSpace/Space.js');
includeFile('sceneSkull/Skull.js');
includeFile('sceneTree/Tree.js');

let bpm = 120;
let beat = 60/bpm;
let pattern = bpm*8;

Demo.prototype.init = function () {
  const start = 0;
  const duration = 120;
  const settings = new Settings();
  //settings.demo.sync.rocketFile = 'sync/auto.rocket';
  settings.demo.sync.beatsPerMinute = 120;
  settings.demo.sync.rowsPerBeat = 8;

  this.sceneIntro();
  this.sceneFistingHand();
  this.sceneSpace();
  this.sceneSkullCat();
  this.sceneTreeGrow();

  this.loader.setScene('main');
  this.loader.addAnimation({"start": start, "duration": 10, "scene":{"name":"intro"}});
  this.loader.addAnimation({"start": start+20, "duration": 30, "scene":{"name":"fistingHand"/*, "fbo":{"name":"fistingHandFbo"}*/}});
  this.loader.addAnimation({"start": start, "duration": 30, "scene":{"name":"space"/*, "fbo":{"name":"SpaceFbo"}*/}});
  this.loader.addAnimation({"start": start+30, "duration": 30, "scene":{"name":"skullCat"/*, "fbo":{"name":"skullCatFbo"}*/}});
  this.loader.addAnimation({"start": start+75.5 , "duration": 30, "scene":{"name":"treeGrow"/*, "fbo":{"name":"treeGrowFbo"}*/}});
};
