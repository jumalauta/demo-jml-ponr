Demo.prototype.sceneOutro = function () {
    this.setScene('outro');
    this.addSkysphere();
    this.addEffectStarfield(0, 8*window.pattern, 5000, "multiSceneEffects/star.png", 500, 1.7);

    this.loader.addAnimation({
        "light": {
            "type": "Point",
            "properties": { "intensity":724.55 },
            "castShadow": true
        }
        ,"color": [{
          "r": 1.0, "g": 1.0, "b": 1.0
        }]
        ,"position": [{
          "x": ()=>window.camPos[0]-11, "y": ()=>window.camPos[1]+6, "z": ()=>window.camPos[2]+6
        }]
      });

    this.loader.addAnimation([{
        "id":"heart"
       ,"object":{
          "name":"sceneOutro/obj_outroHeart.obj"
        }
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
          "degreesY":()=>15*getSceneTimeFromStart()
          }]
       ,"scale":[{"uniform3d":0.5}]
       ,shader:{
        // heart beat
        vertexShaderPrefix:`
          uniform float time;
          uniform float beater;
        `,
        vertexShaderSuffix:`
          float amp = 4.;
          float t = clamp(sin(time * 3.28 + 0.5) * amp, -amp/2., 0.);
          vec3 pos = position;
          float size = 0.2;
          pos.y = pos.y + (sin(beater + pos.x + pos.z) * size)*(abs(beater)/(amp/2.));
          pos.x = pos.x + (sin(beater + pos.y + pos.z) * size)*(abs(beater)/(amp/2.));
          pos.z = pos.z + (sin(beater + pos.x + pos.y) * size)*(abs(beater)/(amp/2.));
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        `,
        variable: [
          {"name":"beater", "value":[()=>Sync.get('Outro:HeartBeat')]}
        ]
      }  
      }]);

      this.loader.addAnimation([{
        "parent":"heart"
       ,"object":{
          "name":"sceneOutro/obj_outroAk.obj"
        }
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

       ,"scale":[{"uniform3d":1.0}]
      }]);

      this.loader.addAnimation([{
        "parent":"heart"
       ,"object":{
          "name":"sceneOutro/obj_outroFarjan.obj"
        }
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

       ,"scale":[{"uniform3d":1.0}]
      }]);

      this.loader.addAnimation([{
        "parent":"heart",
        "id":"textPos",
        "object":null,
        "position":[{"x":.0,"y":.3, "z":-1.1}]

      }]);

      this.loader.addAnimation([{
        "parent":"textPos",
        "text":{"string":"JUMALAUTA" ,"name":"multiSceneEffects/font.ttf",
        "parameters": {depth:1.6,bevelEnabled:true,bevelThickness:0.05,bevelSize:0.05,bevelSegments:6}
        },
        "perspective":"3d",
        "color":[{"r":.955,"g":.955,"b":.955}],
        "position":[{"x":.0,"y":0}],
        "scale":[{"uniform3d":()=>12.5+.5*Math.sin(getSceneTimeFromStart())}],
        "angle":[{
          "degreesY":180,
          "degreesZ":()=>12+Sync.get('Outro:HeartBeat')
          }]
      }]);
 

      this.loader.addAnimation([{

        "text":{"string":"CTO" ,"name":"multiSceneEffects/font.ttf"
        },
        "transparent":"true",
        "perspective":"2d",
        "billboard":true,
        "color":[{"r":.955,"g":.955,"b":.955,"a":0},
        {"duration":8,"a":0.0},
        {"duration":4,"a":1.0}
        ],
        "position":[{"x":-.2,"y":-.2}],
        "scale":[{"uniform2d":()=>2.45+.1*Math.sin(getSceneTimeFromStart())}],
      }]);

      this.loader.addAnimation([{

        "text":{"string":"HALUTTU MAKSULLINEN" ,"name":"multiSceneEffects/font.ttf"
        },
        "transparent":"true",
        "perspective":"2d",
        "billboard":true,
        "color":[{"r":.955,"g":.955,"b":.955,"a":0},
          {"duration":9,"a":0.0},
          {"duration":4,"a":1.0}
          ],
        "position":[{"x":-.2,"y":-.3}],
        "scale":[{"uniform2d":()=>2.0+.1*Math.sin(getSceneTimeFromStart())}],
      }]);

      this.loader.addAnimation([{
        "text":{"string":"ENGINE" ,"name":"multiSceneEffects/font.ttf"
        },
        "transparent":"true",
        "perspective":"2d",
        "billboard":true,
        "color":[{"r":.955,"g":.955,"b":.955,"a":0},
          {"duration":10,"a":0.0},
          {"duration":4,"a":1.0}
          ],
        "position":[{"x":-.2,"y":-.38}],
        "scale":[{"uniform2d":()=>2.0+.1*Math.sin(getSceneTimeFromStart())}],
      }]);

      this.loader.addAnimation([{

        "text":{"string":"CCO" ,"name":"multiSceneEffects/font.ttf"
        },
        "perspective":"2d",
        "transparent":"true",
        "color":[{"r":.955,"g":.955,"b":.955,"a":0},
          {"duration":8.5,"a":0.0},
          {"duration":4,"a":1.0}
          ],
        "position":[{"x":.2,"y":-.2}],
        "scale":[{"uniform2d":()=>2.45+.1*Math.sin(getSceneTimeFromStart())}],
      }]);

      this.loader.addAnimation([{

        "text":{"string":"ANTEEKSI HENKILÖ" ,"name":"multiSceneEffects/font.ttf"
        },
        "perspective":"2d",
        "billboard":true,
        "transparent":"true",
        "color":[{"r":.955,"g":.955,"b":.955,"a":0},
          {"duration":9.5,"a":0.0},
          {"duration":4,"a":1.0}
          ],
        "position":[{"x":.2,"y":-.3}],
        "scale":[{"uniform2d":()=>2.0+.1*Math.sin(getSceneTimeFromStart())}],
      }]);

      

}  