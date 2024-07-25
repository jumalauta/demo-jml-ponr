Demo.prototype.sceneHealthBar = function() {
  this.loader.setScene('healthBar');

  const color = [{"a":0.0},{"duration":8},{"duration":1,"a":1.0},{"duration":7},{"duration":1,"a":0.0}];
  const tColor = [{"a":0.0,"r":1,"g":1,"b":1},{"duration":8},{"duration":1,"a":1.0},{"duration":7},{"duration":1,"a":0.0}];
  const tColorShadow = [{"a":0.0,"r":0,"g":0,"b":0},{"duration":8},{"duration":1,"a":1.0},{"duration":7},{"duration":1,"a":0.0}];

  this.loader.addAnimation([{
    "image":{
      "name":"_embedded/defaultWhite.png"
    }
    ,"position":[{
      "x":-0.0,
      "y":0.35,
    }]
   ,"scale":[{"y":0.03, "x":0.8}]
    ,"color":Utils.deepCopyJson(color)
   ,"shader":{"name":"sceneCatBattle/healthBar.fs",
    "variable": [
      {"name":"invert","value":[()=>0]},
      {"name":"greenPercent","value":[()=>Sync.get('CatBattle:healthRightG')]},
      {"name":"yellowPercent","value":[()=>Sync.get('CatBattle:healthRightY')]},
      {"name":"redPercent","value":[()=>Sync.get('CatBattle:healthRightR')]},
    ]
   }
   ,"runFunction":(animation)=>{
    const maxHealth = 666;
    const health = maxHealth*Sync.get('CatBattle:healthRightG');
    window.healthBarTimer = health.toFixed(0);
   }
  }]);

  const textY = 0.322;
  const textX = -0.0;
  const textScale = 0.9;
  Array.from("0123456789").forEach((c) => {
    this.loader.addAnimation({
      "text":{
        "string":""+c,
        "name":"multiSceneEffects/font.ttf",
      }
      ,"position":[{
        "x":textX-0.02,
        "y":textY,
      }]
      ,"color": Utils.deepCopyJson(tColor)
      ,"scale":[{"uniform3d":textScale}]
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
        "x":textX-0.01,
        "y":textY,
      }]
      ,"color": Utils.deepCopyJson(tColor)
      ,"scale":[{"uniform3d":textScale}]
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
    this.loader.addAnimation({
      "text":{
        "string":""+c,
        "name":"multiSceneEffects/font.ttf",
      }
      ,"position":[{
        "x":textX-0.00,
        "y":textY,
      }]
      ,"color": Utils.deepCopyJson(tColor)
      ,"scale":[{"uniform3d":textScale}]
      ,"runPreFunction":(animation)=>{
        const char = window.healthBarTimer.charAt(2);
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


  const boss = ['MEGA PUSSY', 'DESTROYER OF WORLDS, BANE OF HUMANITY, HARBINGER OF ARMEOWGEDDON, EATER OF NOMS'];

  for(let i=0;i<boss.length;i++)
  {
    this.loader.addAnimation({
      "text":{
        "string":boss[i],
        "name":"multiSceneEffects/font.ttf",
      }
      ,"position":[{
        "x":textX-0.009,
        "y":textY+0.091-i*.045,
      }]
      ,"scale":[{"uniform3d":i==0 ? 1.5 : 1.0}]
      ,"color":Utils.deepCopyJson(tColorShadow)
    });
    this.loader.addAnimation({
      "text":{
        "string":boss[i],
        "name":"multiSceneEffects/font.ttf",
      }
      ,"position":[{
        "x":textX-0.01,
        "y":textY+0.095-i*.045,
      }]
      ,"scale":[{"uniform3d":i==0 ? 1.5 : 1.0}]
      ,"color":Utils.deepCopyJson(tColor)
    });
  }
}
