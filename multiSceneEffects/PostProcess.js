Demo.prototype.createPostProcess = function (initialInputImage, finalOutputFbo, shaderDefinitions) {
  let inputImage = initialInputImage;
  let outputFbo = undefined;
  for(let i = 0; i < shaderDefinitions.length; i++) {
    if (i > 0) {
      inputImage = `${outputFbo}.color.fbo`;
    }
    outputFbo = `${finalOutputFbo}_${`00${i}`.slice(-3)}`;
    if (i === shaderDefinitions.length - 1) {
      outputFbo = finalOutputFbo;
    }

    this.loader.addAnimation({fbo:{name:outputFbo,action:'begin',storeDepth:false}});
    this.loader.addAnimation({
      image: [inputImage, ...shaderDefinitions[i].additionalImages || []],
      shader: shaderDefinitions[i].shader,
    });
    this.loader.addAnimation({fbo:{name:outputFbo,action:'unbind'}});
  }
}

Demo.prototype.addPostProcess = function (image, bypass) {
  if (bypass) {
    this.loader.addAnimation({
      image: image,
    });
    return;
  }

  this.createPostProcess(
    image,
    'glowFbo',
    [
    {shader: {name: 'multiSceneEffects/colorClamp.fs'}},
    {shader: {name: 'multiSceneEffects/glow.fs', "variable": [
      {"name":"direction","value":[()=>[1.,0.]]},
      {"name":"samples","value":[()=>20]},
      {"name":"spread","value":[()=>1/1920*3]},
      {"name":"intensity","value":[()=>0.09]}
    ]}},
    {shader: {name: 'multiSceneEffects/glow.fs', "variable": [
      {"name":"direction","value":[()=>[0.,1.]]},
      {"name":"samples","value":[()=>20]},
      {"name":"spread","value":[()=>1/1080*3]},
      {"name":"intensity","value":[()=>0.09]}
    ]}},
  ]);
  
  this.loader.addAnimation({fbo:{name:'finalGlowFbo',action:'begin',storeDepth:false}});
  this.loader.addAnimation({
    image: image,
  });
  this.loader.addAnimation({
    image: 'glowFbo.color.fbo',
    color:[{"a":0.5}]
  });
  this.loader.addAnimation({fbo:{name:'finalGlowFbo',action:'unbind'}});

  this.createPostProcess(
    'finalGlowFbo.color.fbo',
    'finalFbo',
    [
    {shader: {name: 'multiSceneEffects/postProcess.fs'}},
    //FIXME: lut texture needs to be changed (and needs perhaps bigger resolution to have less of a 'posterized' feel?)
    //{additionalImages: ["multiSceneEffects/2dlut.png"], shader: {name: 'multiSceneEffects/lut.fs'}},
  ]);

  this.loader.addAnimation({
    image: 'finalFbo.color.fbo',
  });
}

/*
"shader":{"name":"sceneSkull/kaleidoscope.fs",
  "variable": [
    {"name":"kaleidoscopeXangle","value":[()=>((Math.sin(getSceneTimeFromStart())+1)/2.0)*10.0+1.0]},
    {"name":"coordBias","value":[()=>getSceneTimeFromStart()*0.1,()=>0.0]},
  ]
}
*/
