Demo.prototype.addEffectExplosion = function (particleTexture, particleModel, startTime, duration, maxDist, amount, posX, posY, posZ, xStartDim, yStartDim, zStartDim, xDim = 0.1, yDim =0.1, zDim = 0.0, xOffset, yOffset, zOffset, blendingMode = "CustomBlending", parentId = "scene") {

  let particles = new Array(amount);
  for (let i = 0; i < particles.length; i++) {

    let xDir = Math.random()*xDim;
    let yDir = Math.random()*yDim;
    let zDir = Math.random()*zDim;
    let  vectorLength = Math.sqrt(xDir*xDir+yDir*yDir+zDir*zDir);
    xDir = (xDir/vectorLength) * (Math.random() * maxDist * 2 - maxDist);
    yDir = (yDir/vectorLength) * (Math.random() * maxDist * 2 - maxDist);
    zDir = (zDir/vectorLength) * (Math.random() * maxDist * 2 - maxDist);

    particles[i] = {
      "x1": xOffset + posX+Math.random() * xStartDim - xStartDim*.5,
      "y1": yOffset + posY+Math.random() * yStartDim - yStartDim*.5,
      "z1": zOffset + posZ+Math.random() * zStartDim - zStartDim*.5,
      "x2": xOffset + posX+xDir,
      "y2": yOffset + posY+yDir,
      "z2": zOffset + posZ+zDir
    };
  }


  let explosionAnimation = {
    "parent": (parentId==="scene") ? undefined:parentId,
    "start": startTime, "duration": duration,
    "image": particleTexture,
    "perspective": "3d",
    "billboard": true,
    "scale":[{"uniform3d":1.0}],
    "material":{
      "blending": blendingMode,
      "transparent":true,
      "depthWrite":blendingMode == false
    },
    "instancer": {
      "count": particles.length,
      "runInstanceFunction": (properties) => {

        const i = properties.index;
        const count = properties.count;
        const time = properties.time;
        let object = properties.object;
        let color = properties.color;

        const scale = 0.00001;
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
    }

  this.loader.addAnimation(explosionAnimation);
}
