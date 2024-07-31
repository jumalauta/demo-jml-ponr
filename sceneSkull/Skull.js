let skullEffectParentId = 0;

Demo.prototype.addSkullBgEffect = function (startTime, duration, effectType, image, rgb = [1.0,1.0,1.0])
{
   switch(effectType) {

    case "tunnel":    
      this.loader.addAnimation({
        "start":startTime, "duration":duration,
        "image": [image],
        "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
        "scale":[{"uniform2d":5.0}],
        "color":[{"r":rgb[0],"g":rgb[1],"b":rgb[2]}],
        shader: {
          name: 'sceneSkull/tunnel.fs',
          variable: [
            {"name":"timeScale", "value":[1.0]},
            {"name":"roto", "value":[0.0]},
            {"name":"insanity", "value":[0.02]},
          ]
        }
      });
      break;

      case "spinTunnel":    
      this.loader.addAnimation({
        "start":startTime, "duration":duration,
        "image": [image],
        "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
        "scale":[{"uniform2d":5.0}],
        "color":[{"r":rgb[0],"g":rgb[1],"b":rgb[2]}],
        shader: {
          name: 'sceneSkull/tunnel.fs',
          variable: [
            {"name":"timeScale", "value":[1.0]},
            {"name":"roto", "value":[2.0]},
            {"name":"insanity", "value":[0.0]},
          ]
        }
      });
      break;

      case "psychoTunnel":    
      this.loader.addAnimation({
        "start":startTime, "duration":duration,
        "image": [image],
        "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
        "scale":[{"uniform2d":5.0}],
        "color":[{"r":rgb[0],"g":rgb[1],"b":rgb[2]}],
        shader: {
          name: 'sceneSkull/tunnel.fs',
          variable: [
            {"name":"timeScale", "value":[1.0]},
            {"name":"roto", "value":[-2.0]},
            {"name":"insanity", "value":[1]},
          ]
        }
      });
      break;

      case "rotator":    
        this.loader.addAnimation({
          "start":startTime, "duration":duration,
          "image": [image],
          "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
          "scale":[{"uniform2d":3.0}],
          "color":[{"r":rgb[0],"g":rgb[1],"b":rgb[2]}],
          "angle":[{
            "degreesZ":()=>-getSceneTimeFromStart()*180
          }]
        });
      break;

      case "doubleRotator":    
      this.loader.addAnimation({
        "start":startTime, "duration":duration,
        "image": [image],
        "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
        "scale":[{"uniform2d":3.0}],
        "color":[{"r":rgb[0],"g":rgb[1],"b":rgb[2]}],
        "angle":[{
          "degreesZ":()=>-getSceneTimeFromStart()*180
        }]
      });

      this.loader.addAnimation({
        "start":startTime, "duration":duration,
        "image": [image],
        "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
        "scale":[{"uniform2d":3.0}],
        "color":[{"r":1-rgb[0],"g":1-rgb[1],"b":1-rgb[2]}],
        "angle":[{
          "degreesZ":()=>getSceneTimeFromStart()*180
        }]
      });
      break;

      case "grid":
        this.loader.addAnimation([{
          "start":startTime, "duration":duration,
            "object":{
              "name":"sceneSkull/obj_gridSphere.obj"
            }
            ,"image": ["sceneSkull/tex_hypnopenta.png"]
           ,"position":[{
              "x":0,
              "y":0,
              "z":0
            }],
            "color":[{"r":rgb[0],"g":rgb[1],"b":rgb[2]}]
           ,"angle":[{
              "degreesY":()=>90*getSceneTimeFromStart(),
              "degreesX":()=>- 70*getSceneTimeFromStart()
              }]
           ,"scale":[{"uniform3d":15.5}]
           ,"material":{transparent:true, blending:'AdditiveBlending'},
          }]);    
      break;

      case "mirrorScroll":    
        this.loader.addAnimation({
          "start":startTime, "duration":duration,
          "image": [image],
          "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
          "scale":[{"uniform2d":5.0}],
          "color":[{"r":rgb[0],"g":rgb[1],"b":rgb[2]}],
          shader: {
            name: 'sceneSkull/mirrorscroll.fs',
            variable: [
              {"name":"mirrorSpeed", "value":[-1.5,-0.5]}
            ]
          }
        });
      break;

      case "mirrorScroll2":     
        this.loader.addAnimation({
          "start":startTime, "duration":duration,
          "image": [image],
          "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
          "scale":[{"uniform2d":5.0}],
          "color":[{"r":rgb[0],"g":rgb[1],"b":rgb[2]}],
          shader: {
            name: 'sceneSkull/mirrorscroll.fs',
            variable: [
              {"name":"mirrorSpeed", "value":[1.0, 1.0]}
            ]
          }
        });
      break;

      case "scroll":
          this.loader.addAnimation({
            "start":startTime, "duration":duration,
            "image": [image],
            "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
            "scale":[{"uniform2d":3.0}],
            "color":[{"r":rgb[0],"g":rgb[1],"b":rgb[2]}],
            shader: {
              name: 'sceneSkull/uvscroll.fs',
              variable: [
                {"name":"direction", "value":[2.0,0.0]}
              ]
            }
          });    
      break;

      case "scrollD2":
          this.loader.addAnimation({
            "start":startTime, "duration":duration,
            "image": [image],
            "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
            "scale":[{"uniform2d":5.0}],
            "color":[{"r":rgb[0],"g":rgb[1],"b":rgb[2]}],
            shader: {
              name: 'sceneSkull/uvscroll.fs',
              variable: [
                {"name":"direction", "value":[0.0,2.0]}
              ]
            }
          });
      break;

      default:
        break;
    }

  }

  /*
    all seeing eye
    kissa
    pentagrammi
    kissakallo itse
    lilith
    bang
  */
    
  Demo.prototype.addSkullEffect = function (startTime, duration, effectType, image, rgb = [1.0,1.0,1.0])
  {
    skullEffectParentId++;

    switch(effectType) {

      case "SingleRotator":    
        this.loader.addAnimation({
          "start":startTime, "duration":duration,
          "image": image,
          "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
          "scale":[{"uniform3d":3.0}],
          "color":[{"r":rgb[0],"g":rgb[1],"b":rgb[2]}],
          "angle":[{
            "degreesZ":()=>getSceneTimeFromStart()*255
          }]
        });
        break;

      case "DoubleRotator":
        this.loader.addAnimation({
          "start":startTime, "duration":duration,
          "image": image,
          "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
          "scale":[{"uniform2d":2.0}],
          "color":[{"r":rgb[0],"g":rgb[1],"b":rgb[2]}],
          "position": [{
            "x":-.3, "y": 0
          }],
          "angle":[{
            "degreesZ":()=>getSceneTimeFromStart()*255
          }]

        });
        this.loader.addAnimation({
          "start":startTime, "duration":duration,
          "image": image,
          "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
          "scale":[{"uniform2d":2.0}],
          "color":[{"r":rgb[0],"g":rgb[1],"b":rgb[2]}],
          "position": [{
            "x":.3, "y": 0
          }],
          "angle":[{
            "degreesZ":()=>-getSceneTimeFromStart()*255
          }]
        });
      break;

      case "Tritator":

        let posRatio = 0.17;
        this.loader.addAnimation({
          "id":"trit" + skullEffectParentId
        ,"object":null
        ,"start":startTime, "duration":duration
        ,"position":[{"x":0 ,"y":0,"z":0}]
        ,"scale":[{"uniform3d":1.0}]
        ,"angle": [{"degreesZ":()=>180*getSceneTimeFromStart()}]
      });

        this.loader.addAnimation({
          "parent":"trit" + skullEffectParentId,
          "start":startTime, "duration":duration,
          "sprite":true,
          "image": image,
          "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
          "scale":[{"uniform3d":1.0}],
          "color":[{"r":rgb[0],"g":rgb[1],"b":rgb[2]}],
          "position":[{"x":1*posRatio ,"y":1*posRatio,"z":0}],
          "angle":[{
            "degreesZ":()=>getSceneTimeFromStart()*25
          }]
        });

        this.loader.addAnimation({
          "parent":"trit" + skullEffectParentId,
          "start":startTime, "duration":duration,
          "sprite":true,
          "image": image,
          "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
          "scale":[{"uniform3d":1.0}],
          "color":[{"r":rgb[0],"g":rgb[1],"b":rgb[2]}],
          "position":[{"x":0.366025*posRatio ,"y":-1.36603*posRatio,"z":0}],
          "angle":[{
            "degreesZ":()=>getSceneTimeFromStart()*25
          }]
        });

        this.loader.addAnimation({
          "parent":"trit" + skullEffectParentId,
          "start":startTime, "duration":duration,
          "sprite":true,
          "image": image,
          "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
          "scale":[{"uniform3d":1.0}],
          "color":[{"r":rgb[0],"g":rgb[1],"b":rgb[2]}],
          "position":[{"x":-1.36603*posRatio ,"y":0.366025*posRatio,"z":0}],
          "angle":[{
            "degreesZ":()=>getSceneTimeFromStart()*25
          }]
        });
    break;

    case "Quadator":
        let posRatioQ = 0.47;
        this.loader.addAnimation({
          "id":"quadr" + skullEffectParentId
        ,"object":null
        ,"start":startTime, "duration":duration
        ,"position":[{"x":0 ,"y":0,"z":0}]
        ,"scale":[{"uniform3d":1.0}]
        ,"angle": [{"degreesZ":()=>180*getSceneTimeFromStart()}]
      });

        this.loader.addAnimation({
          "parent":"quadr" + skullEffectParentId,
          "start":startTime, "duration":duration,
          "sprite":true,
          "image": image,
          "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
          "scale":[{"uniform3d":1.0}],
          "color":[{"r":rgb[0],"g":rgb[1],"b":rgb[2]}],
          "position":[{"x":posRatioQ ,"y":posRatioQ,"z":0}],
        });

        this.loader.addAnimation({
          "parent":"quadr" + skullEffectParentId,
          "start":startTime, "duration":duration,
          "sprite":true,
          "image": image,
          "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
          "scale":[{"uniform3d":1.0}],
          "color":[{"r":rgb[0],"g":rgb[1],"b":rgb[2]}],
          "position":[{"x":posRatioQ ,"y":-posRatioQ,"z":0}],
        });

        this.loader.addAnimation({
          "parent":"quadr",
          "start":startTime, "duration":duration,
          "sprite":true,
          "image": image,
          "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
          "scale":[{"uniform3d":1.0}],
          "color":[{"r":rgb[0],"g":rgb[1],"b":rgb[2]}],
          "position":[{"x":-posRatioQ ,"y":-posRatioQ,"z":0}],
        });

        this.loader.addAnimation({
          "parent":"quadr" + skullEffectParentId,
          "start":startTime, "duration":duration,
          "sprite":true,
          "image": image,
          "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
          "scale":[{"uniform3d":1.0}],
          "color":[{"r":rgb[0],"g":rgb[1],"b":rgb[2]}],
          "position":[{"x":-posRatioQ ,"y":-posRatioQ,"z":0}],
        });
      break;

    default:
      break;
  }
}

Demo.prototype.addSkullCatBackground = function () {
  this.setScene('skullCatBg');
  this.loader.addAnimation({fbo:{name:'skullCatBackgroundFbo',action:'begin',storeDepth:false}});

    this.loader.addAnimation({
    "light": {
        "type": "Directional",
        "properties": { "intensity": 1.55 },
        "castShadow": false
    }
    ,"color": [{
      "r": 1.0, "g": 1.0, "b": 1.0
    }]
    ,"position": [{
      "x": ()=>window.camPos[0], "y": ()=>window.camPos[1], "z": ()=>window.camPos[2]
    }]
  });


  /* käsis
      0 tunnel
      1 scroll image
      2 starfield
      3 spiral

      5 grid
      6 spintunnel
      7 mirror scroll
      8 doublespiral

      9  scroll image dir2
      10 psychotunnel
      11 starfield
      12 mirror scroll dir2

      13 grid
      14 scroll image
      15 spintunnel
      16 mirror scroll
  */
  /*
    tunnel
    spinTunnel
    psychoTunnel    
    rotator
    doubleRotator
    grid
    mirrorScroll
    mirrorScroll2
    scroll
    scrollD2
  */

    let red = [255/255, 5/255, 10/255];
    let orange = [255/255, 100/255, 0];
    let green = [25/255, 244/255, 0];
    let yellow = [217/255, 248/255, 4/255];
    let blue = [60/255, 79/255, 230/255];
    let purple = [205/255, 0, 250/255];

// part 1

  this.addSkullBgEffect(0*pattern, .5*pattern, "tunnel", "sceneSkull/tex_bg_penta.png", red);
  this.addSkullBgEffect(.5*pattern, .5*pattern, "scroll", "sceneSkull/tex_bg_allseeing.png", green);
  this.addSkullBgEffect(1.0*pattern, .5*pattern, "mirrorScroll2", "sceneSkull/tex_bg_ankh.png", yellow);
  this.addSkullBgEffect(1.5*pattern, .5*pattern, "rotator", "sceneSkull/tex_bg_spiral.png", purple);
  
  this.addSkullEffect(0.25*pattern, .5*pattern, "SingleRotator", "sceneSkull/tex_hypnopenta.png", orange);
  this.addSkullEffect(0.75*pattern, .5*pattern, "DoubleRotator", "multiSceneEffects/tex_lilith.png", purple);
  this.addEffectStarfield(1.25*pattern, 0.5*pattern, 60, "multiSceneEffects/tex_lilith.png", 100, 3.77);
  this.addSkullEffect(1.75*pattern, .5*pattern, "Tritator", "sceneSkull/tex_hypnopenta.png", orange);

// ---

  this.addSkullBgEffect(2.0*pattern, .5*pattern, "grid", "sceneSkull/tex_bg_allseeing.png", blue);
  this.addSkullBgEffect(2.5*pattern, .5*pattern, "spinTunnel", "sceneSkull/tex_bg_allseeing.png", green);
  this.addSkullBgEffect(3.0*pattern, .5*pattern, "mirrorScroll", "sceneSkull/tex_bg_penta.png", red);
  this.addSkullBgEffect(3.5*pattern, .5*pattern, "doubleRotator", "sceneSkull/tex_bg_spiral.png", orange);

  this.addSkullEffect(2.25*pattern, .5*pattern, "Quadator", "sceneSkull/tex_allseeing.png", red);
  this.addSkullEffect(2.75*pattern, .5*pattern, "DoubleRotator", "sceneSkull/tex_ankh.png", purple);
  this.addSkullEffect(3.25*pattern, .5*pattern, "SingleRotator", "multiSceneEffects/tex_lilith.png", yellow);

    // part 2

  this.addSkullBgEffect(4.0*pattern, .5*pattern, "scrollD2", "sceneSkull/tex_bg_allseeing.png", red);
  this.addSkullBgEffect(4.5*pattern, .5*pattern, "tunnel", "sceneSkull/tex_bg_spiral.png", green);
  this.addSkullBgEffect(5.0*pattern, .5*pattern, "spinTunnel", "sceneSkull/tex_bg_ankh.png", orange);
  this.addSkullBgEffect(5.5*pattern, .5*pattern, "mirrorScroll2", "sceneSkull/tex_bg_penta.png", red);

  this.addSkullEffect(4.25*pattern, .5*pattern, "Tritator", "sceneSkull/tex_ankh.png", yellow);
  this.addSkullEffect(4.75*pattern, .5*pattern, "DoubleRotator", "multiSceneEffects/tex_lilith.png", purple);
  this.addEffectStarfield(5.25*pattern, 0.5*pattern, 60, "multiSceneEffects/tex_pentagram.png", 100, 3.77);
  this.addSkullEffect(5.75*pattern, .5*pattern, "SingleRotator", "sceneSkull/tex_allseeing.png", red);

// ---

  this.addSkullBgEffect(6.0*pattern, .5*pattern, "grid", "sceneSkull/tex_spiral.png", orange);
  this.addSkullBgEffect(6.5*pattern, .5*pattern, "scroll", "sceneSkull/tex_bg_penta.png", yellow);
  this.addSkullBgEffect(7.0*pattern, .5*pattern, "spinTunnel", "sceneSkull/tex_bg_spiral.png", red);
  this.addSkullBgEffect(7.5*pattern, .5*pattern, "mirrorScroll", "sceneSkull/tex_bg_allseeing.png", green);

  this.addSkullEffect(6.25*pattern, .5*pattern, "Quadator", "multiSceneEffects/tex_pentagram.png", red);
  this.addSkullEffect(6.75*pattern, .5*pattern, "DoubleRotator", "sceneSkull/tex_ankh.png", purple);
  this.addSkullEffect(7.25*pattern, 1.5*pattern, "SingleRotator", "sceneSkull/tex_hypnopenta.png", red);




  this.loader.addAnimation({fbo:{name:'skullCatBackgroundFbo',action:'unbind',storeDepth:false}});

  /*


  this.loader.addAnimation({
    "start":0, "duration":.5*window.pattern,
    "image": ["sceneSkull/tex_hypnopenta.png"],
    "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
    "scale":[{"uniform3d":3.0}]
    ,"perspective":"3d"

    ,"angle":[{
      "degreesZ":()=>getSceneTimeFromStart()*155
	  }]
    ,"color": [{
      "r": 1.0, "g": 0.3, "b": 0.05
    }]
  });

// pattern .5



this.loader.addAnimation([{
"start":.5*window.pattern, "duration":.5*window.pattern,
  "object":{
    "name":"sceneSkull/obj_gridSphere.obj"
  }
  ,"image": ["sceneSkull/tex_hypnopenta.png"]
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
    "degreesY":()=>90*getSceneTimeFromStart(),
    "degreesX":()=>- 70*getSceneTimeFromStart()
    }]
 ,"scale":[{"uniform3d":15.5}]
}]);

  // pattern 1


  this.loader.addAnimation({
    "start":1*window.pattern, "duration":.5*window.pattern,
    "image": ["multiSceneEffects/tex_allseeingparticle.png"],
    "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
    "scale":[{"uniform2d":10.0}]
    ,"angle":[{
      "degreesZ":()=>getSceneTimeFromStart()*155
	  }]
    ,"color": [{
      "r": 0.40, "g": 1.00, "b": 0.25
    }]
  });

  // pattern 1.5
  this.addEffectStarfield(1.5*window.pattern,.5*window.pattern, 100, "multiSceneEffects/tex_battlecat.png", 50, 1.1);
  this.loader.addAnimation({
    "start":1.5*window.pattern, "duration":.5*window.pattern,
    "image": ["multiSceneEffects/tex_lilith.png"],
    "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
    "scale":[{"uniform2d":4.0}]
    ,"angle":[{
      "degreesZ":()=>getSceneTimeFromStart()*155
	  }]
    ,"color": [{
      "r": 0.8, "g": 0.0, "b": 0.9
    }]
  });

  // pattern 2

  this.loader.addAnimation({
    "start":2*window.pattern, "duration":.5*window.pattern,
    "image": ["multiSceneEffects/tex_nuke.png"],
    "textureProperties": [{minFilter: 'LinearFilter', magFilter: 'LinearFilter'}],
    "scale":[{"uniform2d":3.0}]
    ,"angle":[{
      "degreesZ":()=>getSceneTimeFromStart()*155
	  }]
    ,"color": [{
      "r": 1.0, "g": 0.66, "b": 0.2
    }]
  });
  */


};

Demo.prototype.addSkullCatForeground = function () {
  this.loader.setScene('main');
  this.loader.addAnimation({fbo:{name:'skullCatForegroundFbo',action:'begin',storeDepth:false}});
  this.cameraSetup();


  this.loader.addAnimation({
    "light": {
        "type": "Directional",
        "properties": { "intensity": 0.55 },
        "castShadow": false
    }
    ,"color": [{
      "r": 1.0, "g": 1.0, "b": 1.0
    }]
    ,"position": [{
      "x": ()=>window.camPos[0], "y": ()=>window.camPos[1], "z": ()=>window.camPos[2]
    }]
  });

  this.loader.addAnimation([{
    "object":{
      "name":"sceneSkull/catskull.gltf",
      "time":10.0,
      "animations": {
        "scream":  {"weight":()=>Sync.get('CatSkull:Scream'), "timescale":1.0, "enabled":true, "loop":false}
      }
    }
   ,"position":[{
      "x":0,
      "y":0,
      "z":0
    }]
   ,"angle":[{
      "degreesY":()=>Sync.get('CatSkull:Rotation'),
      "degreesX":0,
      "degreesZ":()=>Sync.get('CatSkull:Scream')*15
	  }]
   ,"scale":[{"uniform3d":1.33}]
  }]);
  this.loader.addAnimation({fbo:{name:'skullCatForegroundFbo',action:'unbind',storeDepth:false}});
};

Demo.prototype.addSkullCatPostProcess = function () {
  this.loader.setScene('main');
  this.loader.addAnimation({fbo:{name:'skullCatPostProcessFbo',action:'begin',storeDepth:false}});
  this.cameraSetup();
  this.loader.addAnimation({
    "image": ["skullCatBackgroundFbo.color.fbo"],
    "perspective":"3d",
    "position": [{
      "x": 0, "y": 0, "z": -8
    }],
    "textureProperties": [{wrapS: 'RepeatWrapping', wrapT: 'RepeatWrapping'}],
    "scale":[{"uniform3d":()=>Sync.get('CatSkullBg:bgScale')}],
    "shader":{"name":"sceneSkull/background.fs",
      "variable": [
        // chainEffectN value = <baseeffect>.<mix amount = .0 (all), .999 (minimum)>
        {"name":"chainEffect0", "value":[()=>Sync.get('CatSkullBg:e0')]},
        {"name":"chainEffect1", "value":[()=>Sync.get('CatSkullBg:e1')]},
        {"name":"chainEffect2", "value":[()=>Sync.get('CatSkullBg:e2')]},
        {"name":"chainEffect3", "value":[()=>Sync.get('CatSkullBg:e3')]},
        {"name":"chainEffect4", "value":[()=>Sync.get('CatSkullBg:e4')]},
        {"name":"chainEffect5", "value":[()=>Sync.get('CatSkullBg:e5')]},
        {"name":"chainEffect6", "value":[()=>Sync.get('CatSkullBg:e6')]},
        {"name":"chainEffect7", "value":[()=>Sync.get('CatSkullBg:e7')]},
        {"name":"chainEffect8", "value":[()=>Sync.get('CatSkullBg:e8')]},
        {"name":"chainEffect9", "value":[()=>Sync.get('CatSkullBg:e9')]},
        // chaineffect base effect numbers:
        // 0: no-operation
        // 1: texcoordinate bias
        {"name":"coordBias","value":[()=>Sync.get('CatSkullBg:coordBiasX'),()=>Sync.get('CatSkullBg:coordBiasY')]},
        // 2: texcoordinate bias 2
        {"name":"coordBias2", "value":[()=>Sync.get('CatSkullBg:coordBias2X'),()=>Sync.get('CatSkullBg:coordBias2Y')]},
        // 3: kaleidoscope
        {"name":"kaleidoscopeXangle","value":[()=>Sync.get('CatSkullBg:kaleidoAngle')]},
        // 4: funky deformation
        // 5: rotozoom
        {"name":"angle", "value":[()=>Sync.get('CatSkullBg:rotoAngle')]},
        {"name":"zoom", "value":[()=>Sync.get('CatSkullBg:rotoZoom')]},
        // 6: tunnel
        // 7: plasma deformation
        {"name":"scale", "value":[()=>Sync.get('CatSkullBg:plasmaScaleX'), ()=>Sync.get('CatSkullBg:plasmaScaleY')]},
        {"name":"speed", "value":[()=>Sync.get('CatSkullBg:Speed')]},
        // 8: mirror scroll
        {"name":"mirrorSpeed", "value":[()=>Sync.get('CatSkullBg:mirrorSpeedX'), ()=>Sync.get('CatSkullBg:mirrorSpeedY')]},
      ]
    }
  });

  this.loader.addAnimation({
    "image": ["skullCatForegroundFbo.color.fbo"],
  });

  this.loader.addAnimation({fbo:{name:'skullCatPostProcessFbo',action:'unbind',storeDepth:false}});
};

Demo.prototype.sceneSkullCat = function () {
  this.addSkullCatBackground();
  this.addSkullCatForeground();
  this.addSkullCatPostProcess();

  this.setScene('skullCat');

  this.loader.addAnimation({
    "image": ["skullCatPostProcessFbo.color.fbo"],
    shader: {
      name: 'sceneSkull/colorcycle.fs',
      variable: [
        {"name":"shiftHue", "value":[()=>Sync.get('CatSkullCycle:Hue')]},
        {"name":"shiftSaturation", "value":[()=>Sync.get('CatSkullCycle:Saturation')]},
        {"name":"shiftValue", "value":[()=>Sync.get('CatSkullCycle:Shift')]},
        {"name":"centerize","value":[()=>Sync.get('CatSkullCycle:Centerize')]}
    //    {"name":"shiftHue", "value":[()=>Math.sin(getSceneTimeFromStart()*2.0)]},
    //    {"name":"shiftSaturation", "value":[()=>Math.sin(getSceneTimeFromStart()*0.1)]},
    //    {"name":"shiftValue", "value":[()=>Math.sin(getSceneTimeFromStart()*10.0)]}
      ]
    }
  });

}
