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
window.camPos = [0.0,0.0,0.0];
window.camPosLength = 1.0;
window.biitti = 60/120;
window.pattern = window.biitti*8;

includeFile('multiSceneEffects/PostProcess.js');
includeFile('multiSceneEffects/EffectStarfield.js');
includeFile('multiSceneEffects/EffectExplosion.js');
includeFile('multiSceneEffects/EffectMegaExplosion.js');
includeFile('sceneHand/Hand.js');
includeFile('sceneIntro/Intro.js');
includeFile('sceneSpace/Space.js');
includeFile('sceneSkull/Skull.js');
includeFile('sceneTree/Tree.js');
includeFile('sceneEarthHit/earthHit.js');
includeFile('sceneCatBattle/catBattle.js');
includeFile('sceneCatBattle/crossHair.js');
includeFile('sceneCatBattle/healthBar.js');
includeFile('sceneOutro/outro.js');

Demo.prototype.cameraSetup = function(stopCamAt) {
    this.loader.addAnimation({
        "camera": "cam1"
        ,"position":[{"x":0,"y":0,"z":-5}]
        ,"lookAt":[{"x":0.0,"y":0.0,"z":0.0}]
        ,"up":[{"x":0,"y":1,"z":0}]
        ,"perspective":[{"fov":75,"aspect":16/9,"near":.05,"far":1000}]
        ,"distYawPitch":[-5.0,1,2.0]
        ,"instableTimer":[0.0,0.0,0.0,0.0,0.0]
        ,"runPreFunction": (animation)=>{
            if (stopCamAt !== undefined) {
                if (getSceneTimeFromStart() >= stopCamAt) {
                    return;
                }
            }

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
            window.camPosLength = Math.sqrt(newPoints[0]*newPoints[0]+newPoints[1]*newPoints[1]+newPoints[2]*newPoints[2]);
            animation.position[0].x = newPoints[0];
            animation.position[0].y = newPoints[1];
            animation.position[0].z = newPoints[2];
            animation.lookAt[0].x = Sync.get('Cam:Instability')*.25*Math.sin(2*animation.instableTimer[3])+Sync.get('Cam:TargetX');
            animation.lookAt[0].y = Sync.get('Cam:Instability')*.25*Math.cos(2*animation.instableTimer[4])+Sync.get('Cam:TargetY');
            animation.lookAt[0].z = Sync.get('Cam:TargetZ');
            animation.perspective[0].fov = Sync.get('Cam:FOV');
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
};

Demo.prototype.setScene = function (sceneName) {
    this.loader.setScene(sceneName);

    this.cameraSetup();
};

const settings = new Settings();
settings.demo.renderer.sortObjects = true;
settings.demo.sync.rocketFile = 'sync/ponr.rocket';
settings.demo.sync.beatsPerMinute = 120;
settings.demo.sync.rowsPerBeat = 8;
settings.demo.image.texture.minFilter = 'NearestFilter';
settings.demo.image.texture.magFilter = 'NearestFilter';
//settings.demo.image.texture.wrapS = 'RepeatWrapping';
//settings.demo.image.texture.wrapT = 'RepeatWrapping';
settings.demo.fbo.color.texture.minFilter = 'NearestFilter';
settings.demo.fbo.color.texture.magFilter = 'NearestFilter';
//settings.demo.fbo.color.texture.wrapS = 'RepeatWrapping';
//settings.demo.fbo.color.texture.wrapT = 'RepeatWrapping';

settings.demo.model.shape.spline = { material: { type: 'Basic', transparent: true } };

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
  this.sceneTreeOverlay();
  this.sceneEarthHit();
  this.sceneCatBattle();
  this.sceneCrossHair();
  this.sceneHealthBar();
  this.sceneFireTransition();
  this.sceneOutro();
  this.loader.setScene('main');

  const scenes = [
    {start: start, duration: 8*pattern, name: 'intro'},
    {start: start+8*pattern, duration: 8.75*pattern+1*beat, name: 'space'},
    {start: start+16.75*pattern, duration: 3*pattern, name: 'earthHit', color:[{a:0},{a:1,duration:1*beat}]},
    {start: start+19.75*pattern , duration: 8*pattern, name: 'treeGrow'}, 

    {start: start+19.75*pattern , duration: 8*pattern, name: 'treeOverlay'},
    {start: start+27.75*pattern , duration: 7*pattern, name: 'catBattle'},
    {start: start+27.75*pattern , duration: 7*pattern, name: 'healthBar', prePostProcessing:true},
    {start: start+27.75*pattern , duration: 7*pattern, name: 'crossHair', prePostProcessing:true},
    {start: start+34.75*pattern, duration: 9.8*pattern, name: 'skullCatBg', color:[{a:1},{duration: 9.55*pattern},{a:0,duration:0.25*pattern}]},
    {start: start+34.75*pattern, duration: 9.8*pattern, name: 'skullCat', color:[{a:1},{duration: 9.75*pattern},{a:0,duration:0.25*pattern}]},
    {start: start+43.15*pattern, duration: 8*pattern, name: 'outro', color:[{a:0},{duration:1.5*pattern},{a:1,duration:0.55*pattern},{duration:(8-(2.0+2))*pattern}, {duration:4.0,a:0.75},{a:0}]},
    {start: start+(34.75+8.5)*pattern, duration: 4*pattern, name: 'fireTransition'},
  ];

  scenes.forEach((scene) => {
    this.loader.addAnimation({start: scene.start, duration: scene.duration, scene:{name:scene.name, fbo:{name:scene.name + 'Fbo'}}});
  });

  this.loader.addAnimation({fbo:{name:'screenFbo',action:'begin',storeDepth:false}});
  
  scenes.forEach((scene) => {
    if (!scene.prePostProcessing) {
        this.loader.addAnimation({start: scene.start, duration: scene.duration, color:scene.color, image: scene.name + 'Fbo.color.fbo'});
    }
  });

  this.loader.addAnimation({fbo:{name:'screenFbo',action:'unbind'}});

  this.addPostProcess('screenFbo.color.fbo');

  scenes.forEach((scene) => {
    if (scene.prePostProcessing) {
        this.loader.addAnimation({start: scene.start, duration: scene.duration, color:scene.color, image: scene.name + 'Fbo.color.fbo'});
    }
  });
};
