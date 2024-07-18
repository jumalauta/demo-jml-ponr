
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
const deg2rad = 0.01745329251;
var camPos = window.camPos = [0.0,0.0,0.0];
const biitti = window.biitti = 60/120;

includeFile('multiSceneEffects/PostProcess.js');
includeFile('multiSceneEffects/EffectStarfield.js');
includeFile('multiSceneEffects/EffectExplosion.js');
includeFile('sceneHand/Hand.js');
includeFile('sceneIntro/Intro.js');
includeFile('sceneSpace/Space.js');
includeFile('sceneSkull/Skull.js');
includeFile('sceneTree/Tree.js');
includeFile('sceneEarthHit/earthHit.js');
includeFile('sceneCatBattle/catBattle.js');

Demo.prototype.setScene = function (sceneName) {
    this.loader.setScene(sceneName);

    this.loader.addAnimation({
        "camera": "cam1"
        ,"position":[{"x":0,"y":0,"z":-5}]
        ,"lookAt":[{"x":0.0,"y":0.0,"z":()=>Sync.get('Cam:TargetZ')}]
        ,"up":[{"x":0,"y":1,"z":0}]
        ,"perspective":[{"fov":()=>Sync.get('Cam:FOV'),"aspect":16/9,"near":.05,"far":1000}]
        ,"distYawPitch":[-5.0,1,2.0]
        ,"instableTimer":[0.0,0.0,0.0,0.0,0.0]
        ,"runPreFunction": (animation)=>{
    
            for(let i=0;i<animation.instableTimer.length;i++)
                {
                    animation.instableTimer[i]+=Math.random()*getDeltaTime();
                }
            let distance = .05*Sync.get('Cam:Instability')*Math.sin(2*animation.instableTimer[3])+Sync.get('Cam:Distance');
            let pitch = (Sync.get('Cam:Instability')*5*Math.cos(2*animation.instableTimer[1])+Sync.get('Cam:Yaw'))*deg2rad;
            let roll = (Sync.get('Cam:Instability')*5*Math.sin(2*animation.instableTimer[2])+Sync.get('Cam:Pitch'))*deg2rad;
            let yaw = 0.0;
            let target = [Sync.get('Cam:TargetX'),Sync.get('Cam:TargetY'),Sync.get('Cam:TargetZ')]
            let points = [0,0,distance];
            let cosa = Math.cos(yaw),
                sina = Math.sin(yaw);
            let cosb = Math.cos(pitch),
                sinb = Math.sin(pitch);
            let cosc = Math.cos(roll),
                sinc = Math.sin(roll);
            let Axx = cosa*cosb,
                Axy = cosa*sinb*sinc - sina*cosc,
                Axz = cosa*sinb*cosc + sina*sinc;
            let Ayx = sina*cosb,
                Ayy = sina*sinb*sinc + cosa*cosc,
                Ayz = sina*sinb*cosc - cosa*sinc;
            let Azx = -sinb,
                Azy = cosb*sinc,
                Azz = cosb*cosc;
            let px = points[0];
            let py = points[1];
            let pz = points[2];
            let newPoints = [
                (Axx*px + Axy*py + Axz*pz) + target[0],
                Ayx*px + Ayy*py + Ayz*pz + target[1],
                Azx*px + Azy*py + Azz*pz + target[2]
                ];
            window.camPos = newPoints;
            animation.position[0].x = newPoints[0];
            animation.position[0].y = newPoints[1];
            animation.position[0].z = newPoints[2];
            animation.lookAt[0].x = Sync.get('Cam:Instability')*.25*Math.sin(2*animation.instableTimer[3])+Sync.get('Cam:TargetX');
            animation.lookAt[0].y = Sync.get('Cam:Instability')*.25*Math.cos(2*animation.instableTimer[4])+Sync.get('Cam:TargetY');
          }
    });    

    this.loader.addAnimation({
        "light": {
            "type": "Ambient",
            "properties": { "intensity": 0.35 },
            "castShadow": false
        }
        ,"color": [{
            "r": 1.0, "g": 1.0, "b": 1.0
        }]
    });    
}

const settings = new Settings();
settings.demo.renderer.sortObjects = true;
settings.demo.sync.rocketFile = 'sync/ponr.rocket';
settings.demo.sync.beatsPerMinute = 120;
settings.demo.sync.rowsPerBeat = 8;
settings.demo.image.texture.minFilter = 'LinearFilter';
settings.demo.image.texture.magFilter = 'LinearFilter';
//settings.demo.image.texture.wrapS = 'RepeatWrapping';
//settings.demo.image.texture.wrapT = 'RepeatWrapping';
settings.demo.fbo.color.texture.minFilter = 'LinearFilter';
settings.demo.fbo.color.texture.magFilter = 'LinearFilter';
//settings.demo.fbo.color.texture.wrapS = 'RepeatWrapping';
//settings.demo.fbo.color.texture.wrapT = 'RepeatWrapping';

Demo.prototype.init = function () {
  const start = 0;
  const duration = 120;
  const bpm = 120;
  const beat = 60/bpm;
  const pattern = beat*8;

  this.sceneIntro();
  this.sceneFistingHand();
  this.sceneSpace();
  this.sceneSkullCat();
  this.sceneTreeGrow();
  this.sceneEarthHit();
  this.sceneCatBattle();
  this.loader.setScene('main');

  const scenes = [
    {start: start, duration: 8*pattern, name: 'intro'},
    {start: start+8*pattern, duration: 8*pattern, name: 'space'},
    {start: start+16*pattern, duration: 3*pattern, name: 'earthHit'},
    {start: start+19*pattern , duration: 8*pattern, name: 'treeGrow'},
    {start: start+27*pattern , duration: 7*pattern, name: 'catBattle'},
    {start: start+34*pattern, duration: 16*pattern, name: 'skullCat'},
  ];

  scenes.forEach((scene) => {
    this.loader.addAnimation({start: scene.start, duration: scene.duration, scene:{name:scene.name, fbo:{name:scene.name + 'Fbo'}}});
  });

  this.loader.addAnimation({fbo:{name:'screenFbo',action:'begin',storeDepth:false}});
  
  scenes.forEach((scene) => {
    this.loader.addAnimation({start: scene.start, duration: scene.duration, image: scene.name + 'Fbo.color.fbo'});
  });

  this.loader.addAnimation({fbo:{name:'screenFbo',action:'unbind'}});

  this.addPostProcess('screenFbo.color.fbo');
};
