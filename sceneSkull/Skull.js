Demo.prototype.sceneSkullCat = function () {
  this.setScene('skullCat');  
  this.loader.addAnimation({
    //"start": start, "duration": duration,
    "image": ["sceneSkull/temp.png"], //FIXME with actual content
    "shader":{"name":"sceneSkull/kaleidoscope.fs",
      "variable": [
        {"name":"kaleidoscopeXangle","value":[()=>((Math.sin(getSceneTimeFromStart())+1)/2.0)*10.0+1.0]},
        {"name":"coordBias","value":[()=>getSceneTimeFromStart()*0.1,()=>0.0]},
      ]
    }
  });
};
