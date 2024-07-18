Demo.prototype.addEffectExplosion = function (particleTexture, startTime, duration, maxDist, posX, posY, posZ, xDim = 0.1, yDim =0.1, zDim = 0.0, blendingMode = "CustomBlending" ) {

  let particles = new Array(100);
  for (let i = 0; i < particles.length; i++) {

    let xDir = Math.random()*xDim;
    let yDir = Math.random()*yDim;
    let zDir = Math.random()*zDim;
    let  vectorLength = Math.sqrt(xDir+yDir+zDir);
    xDir = (xDir/vectorLength) * (Math.random() * maxDist * 2 - maxDist);
    yDir = (yDir/vectorLength) * (Math.random() * maxDist * 2 - maxDist);
    zDir = (zDir/vectorLength) * (Math.random() * maxDist * 2 - maxDist);

    particles[i] = {
      "x1": posX+Math.random() * xDim - zDim*.5,
      "y1": posY+Math.random() * yDim - zDim*.5,
      "z1": posZ+Math.random() * zDim - zDim*.5,
      "x2": posX+xDir,
      "y2": posY+yDir,
      "z2": posZ+zDir
    };
  }

  this.loader.addAnimation({
    "start": startTime, "duration": duration,
    "image": particleTexture,
    "perspective": "3d",
    "billboard": true,
    "additive": false,
    "scale":[{"uniform3d":1.0}],
    "material":{
      "blending": blendingMode,
      "transparent:":true,
    },
    "instancer": {
      "count": particles.length,
      "runInstanceFunction": (properties) => {

        const i = properties.index;
        const count = properties.count;
        const time = properties.time;
        let object = properties.object;
        let color = properties.color;

        const scale = 1.0;
        object.scale.x = scale;
        object.scale.y = scale;
        object.scale.z = scale;   

        const percent = (getSceneTimeFromStart()-startTime)/duration;
        object.position.x = Utils.mix(particles[i].x1, particles[i].x2, Math.log((percent*7.0+1.0))/3);
        object.position.y = Utils.mix(particles[i].y1, particles[i].y2, Math.log((percent*7.0+1.0))/3);
        object.position.z = Utils.mix(particles[i].z1, particles[i].z2, Math.log((percent*7.0+1.0))/3);
        color.a = 1.0-percent*percent;
        color.r = color.a;
        color.g = color.a;
        color.b = color.a;
        }
      }
  });
}
