Demo.prototype.sceneHealthBar = function() {
  this.setScene('healthBar');

  const color = [{"a":0.0},{"duration":8},{"duration":1,"a":1.0},{"duration":11},{"duration":1,"a":0.0}];
  const tColor = [{"a":0.0,"r":1,"g":1,"b":1},{"duration":8},{"duration":1,"a":1.0},{"duration":11},{"duration":1,"a":0.0}];

  this.loader.addAnimation([{
    "image":{
      "name":"_embedded/defaultWhite.png"
    }
    ,"position":[{
      "x":-0.28,
      "y":0.4,
    }]
   ,"scale":[{"y":0.1, "x":0.4}]
    ,"color":Utils.deepCopyJson(color)
   ,"shader":{"name":"sceneCatBattle/healthBar.fs",
    "variable": [
      {"name":"invert","value":[()=>1]},
      {"name":"greenPercent","value":[()=>Sync.get('CatBattle:healthRightG')]},
      {"name":"yellowPercent","value":[()=>Sync.get('CatBattle:healthRightY')]},
      {"name":"redPercent","value":[()=>Sync.get('CatBattle:healthRightR')]},
    ]
   }
  }]);

  this.loader.addAnimation([{
    "image":{
      "name":"_embedded/defaultWhite.png"
    }
    ,"position":[{
      "x":0.28,
      "y":0.4,
    }]
    ,"color":Utils.deepCopyJson(color)
   ,"scale":[{"y":0.1, "x":0.4}]
   ,"shader":{"name":"sceneCatBattle/healthBar.fs",
      "variable": [
      {"name":"invert","value":[()=>0]},
      {"name":"greenPercent","value":[()=>0.8]},
      {"name":"yellowPercent","value":[()=>0.0]},
      {"name":"redPercent","value":[()=>0.2]},
    ]
  }
   ,"runFunction":(animation)=>{
    const time = (60-getSceneTimeFromStart()).toFixed(0);
    if (window.healthBarTimer !== time) {
      window.healthBarTimer = time;
    }
   }
  }]);

  Array.from("0123456789").forEach((c) => {
    this.loader.addAnimation({
      "text":{
        "string":""+c,
        "name":"multiSceneEffects/font.ttf",
      }
      ,"position":[{
        "x":-0.03,
        "y":0.46,
      }]
      ,"color": Utils.deepCopyJson(tColor)
      ,"scale":[{"uniform3d":6.0}]
      ,"runPreFunction":(animation)=>{
        const char = window.healthBarTimer.charAt(0);
        if (char === animation.text.string) {
          animation.color[2].a = 1.0;
          animation.color[3].a = 1.0;
        } else {
          animation.color[2].a = 0.0;
          animation.color[3].a = 0.0;
        }
      }
    });
    this.loader.addAnimation({
      "text":{
        "string":""+c,
        "name":"multiSceneEffects/font.ttf",
      }
      ,"position":[{
        "x":0.03,
        "y":0.46,
      }]
      ,"color":Utils.deepCopyJson(tColor)
      ,"scale":[{"uniform3d":6.0}]
      ,"runPreFunction":(animation)=>{
        const char = window.healthBarTimer.charAt(1);
        if (char === animation.text.string) {
          animation.color[2].a = 1.0;
          animation.color[3].a = 1.0;
        } else {
          animation.color[2].a = 0.0;
          animation.color[3].a = 0.0;
        }
      }
    });
  });


  this.loader.addAnimation({
    "text":{
      "string":"MEGA PUSSY",
      "name":"multiSceneEffects/font.ttf",
    }
    ,"position":[{
      "x":-0.475,
      "y":0.37,
    }]
    ,"scale":[{"uniform3d":2.0}]
    ,"color":Utils.deepCopyJson(tColor)
  });

  this.loader.addAnimation({
    "text":{
      "string":"JUMALAUTA",
      "name":"multiSceneEffects/font.ttf",
    }
    ,"position":[{
      "x":0.48,
      "y":0.37,
    }]
    ,"scale":[{"uniform3d":2.0}]
    ,"color":Utils.deepCopyJson(tColor)
  });
}
