Demo.prototype.sceneCrossHair = function() {
  this.setScene('crossHair');
  this.loader.addAnimation([{
    "id":"battlecat2",
    "duration":40*window.biitti,
    "object":null
    ,"perspective":"3d"
    ,"position":[{
      "x":-34,
      "y":2.2,
      "z":0
    }]
    ,"color":[{a:0}]
   ,"angle":[{

      "degreesZ":()=>Math.sin(2*getSceneTimeFromStart())
      }]
   ,"scale":[{"uniform3d":6.5}]
  }]);
  this.loader.addAnimation([{
    "parent":"battlecat2",
    "id":"battlecathead2",
    "image":{
      "name":"sceneCatBattle/tex_battlecat_head.png"
    }
    ,"perspective":"3d"
    ,"position":[{
      "x":2.3,
      "y":()=>0.7+.1*Math.sin(3*getSceneTimeFromStart()),
      "z":0
    }]
    ,"color":[{a:0}]
   ,"angle":[{
      "degreesZ":()=>3*Math.sin(3*getSceneTimeFromStart())
      }]
   ,"scale":[{"uniform3d":1.4}]
  }]);

  const aFunc = ()=>(Math.sin(getSceneTimeFromStart()*3)+1)/2;
  this.loader.addAnimation({
    start:14,
    parent:"battlecathead2",
    image:['sceneCatBattle/crosshair.png'],
    perspective:"3d",
    position:[{
      x:0.3,
      y:0.05,
      z:0
    }],
    color:[{r:0,g:0,b:0,a:0},{duration:0.5,a:aFunc},{duration:4.5,a:aFunc},{duration:0.5,a:0}],
    angle:[{
      degreesZ:()=>-3*Math.sin(3*getSceneTimeFromStart())
      }]

  });
};