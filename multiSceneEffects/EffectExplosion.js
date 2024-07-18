Demo.prototype.addEffectExplosion = function (startTime, duration, maxDist, xDim = 0.0, yDim =0.0, zDim = 0.0, ) {

  let particles = new Array(100);
  for (let i = 0; i < particles.length; i++) {

    let xDir = Math.random();
    let yDir = Math.random();
    let zDir = Math.random();
    let  vectorLength = Math.sqrt(xDir+yDir+zDir);
    xDir = (xDir/vectorLength) * Math.random() * maxDist * 2 - maxDist;
    yDir = (yDir/vectorLength) * Math.random() * maxDist * 2 - maxDist;
    zDir = (zDir/vectorLength) * Math.random() * maxDist * 2 - maxDist;

    particles[i] = {
      "x1": Math.random() * xDim - zDim*.5,
      "y1": Math.random() * yDim - zDim*.5,
      "z1": Math.random() * zDim - zDim*.5,
      "x2": xDir,
      "y2": yDir,
      "z2": zDir      
    };
  }

  this.loader.addAnimation({
    "start": startTime, "duration": duration,
    "image": "multiSceneEffects/star.png",
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

        const scale = 1.0;
        object.scale.x = scale;
        object.scale.y = scale;
        object.scale.z = scale;   

        const percent = ((getSceneTimeFromStart()-startTime));
        object.position.x = Utils.mix(particles[i].x1, particles[i].x2, percent);
        object.position.y = Utils.mix(particles[i].y1, particles[i].y2, percent);
        object.position.z = Utils.mix(particles[i].z1, particles[i].z2, percent);
        //object.position.z = stars[i].z1*size*2-size;

        }
      }
    
  });
}
