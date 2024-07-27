
Demo.prototype.addSkysphere = function () {
  const skyColor = 0.20;
  this.loader.addAnimation({
    object: 'multiSceneEffects/tex_milky_way.png',
    shape: { type: 'SKYSPHERE' },
    color: [{ r: skyColor, g: skyColor, b: skyColor }],
    shader:{
      // extend generated material shader
      vertexShaderPrefix:`
        uniform float time;
      `,
      vertexShaderSuffix:`
        vMapUv.x = vMapUv.x - time * 0.002;
      `,
    }
  });
}

Demo.prototype.addEffectStarfield = function (startTime, durationTime, amountOfParticles, texture, areaSize, particleSize) {


  const recalcThreshold = 0.1;

  let stars = new Array(amountOfParticles);
  const size = areaSize;
  for (let i = 0; i < stars.length; i++) {
    let z1 = Math.random()
    stars[i] = {
      "x1": Math.random()*size*2-size,
      "y1": Math.random()*size*2-size,
      "z1": z1,
      "z2": z1+1.0
    };
  }

  this.loader.addAnimation({
    "start":startTime, "duration":durationTime,
    "image": texture,
    "perspective": "3d",
    "billboard": true,
    "additive": true,
    "scale":[{"uniform3d":.1}],
    "instancer": {
      "count": stars.length,
      "runInstanceFunction": (properties) => {

        const i = properties.index;
        const count = properties.count;
        const time = properties.time;
        let object = properties.object;
        let color = properties.color;

        const scale = particleSize;
        object.scale.x = scale;
        object.scale.y = scale;
        object.scale.z = scale;   

        const percent = (getSceneTimeFromStart()*Sync.get('Starfield:Speed')*.001)%1.0;
        object.position.z = (Utils.mix(stars[i].z1, stars[i].z2, percent)%1.0)*size*2-size;;
        object.position.x = stars[i].x1;
        object.position.y = stars[i].y1;
        //object.position.z = stars[i].z1*size*2-size;

        }
      }
    
  });
}