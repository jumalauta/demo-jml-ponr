Demo.prototype.addEffectExplosion = function (particleTexture, particleModel, startTime, duration, maxDist, amount, particleScale, posX, posY, posZ, xStartDim, yStartDim, zStartDim, xDim = 0.1, yDim =0.1, zDim = 0.0, xOffset, yOffset, zOffset, blendingMode = "CustomBlending", parentId = "scene")
{

  let particles = new Array(amount);
  for (let i = 0; i < particles.length; i++) {

    let xStart = Math.random() * xStartDim - xStartDim*.5;
    let yStart = Math.random() * yStartDim - yStartDim*.5;
    let zStart = Math.random() * zStartDim - zStartDim*.5;
    let xStartDir = (xStart != 0) ? xStart/Math.abs(xStart) : 0;
    let yStartDir = (yStart != 0) ? yStart/Math.abs(yStart) : 0;
    let zStartDir = (zStart != 0) ? zStart/Math.abs(zStart) : 0;
    let xDir = Math.random() * (xDim+xStartDir);
    let yDir = Math.random() * (yDim+yStartDir);
    let zDir = Math.random() * (zDim+zStartDir);
    xStart+=posX;
    yStart+=posY;
    zStart+=posZ;

    let vectorLength = Math.sqrt(xDir*xDir+yDir*yDir+zDir*zDir);

    xDir = vectorLength*xStartDir*maxDist + (xDir/vectorLength) * (Math.random() * maxDist * 2 - maxDist) + xOffset + xStart;
    yDir = vectorLength*yStartDir*maxDist + (yDir/vectorLength) * (Math.random() * maxDist * 2 - maxDist) + yOffset + yStart;
    zDir = vectorLength*zStartDir*maxDist + (zDir/vectorLength) * (Math.random() * maxDist * 2 - maxDist) + zOffset + zStart;

    
    particles[i] = {
      "x1": xStart,
      "y1": yStart,
      "z1": zStart,
      "x2": xDir,
      "y2": yDir,
      "z2": zDir
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

        const scale = particleScale;
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
