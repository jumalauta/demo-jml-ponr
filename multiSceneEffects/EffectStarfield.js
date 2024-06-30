Demo.prototype.addEffectStarfield = function () {
  let stars = new Array(10000);
  const min = -100;
  const max  = 200;
  for (let i = 0; i < stars.length; i++) {
    stars[i] = {
      "x1": Math.random() * max + min,
      "y1": Math.random() * max + min,
      "z1": i/stars.length * min,
    };
    stars[i].z2 = stars[i].z1 - min;
    stars[i].startTime = 0;
  }

  this.loader.addAnimation({
    "image": "multiSceneEffects/star.png",
    "perspective": "3d",
    "billboard": true,
    "additive": true,
    "instancer": {
      "count": stars.length,
      "runInstanceFunction": (properties) => {
        const i = properties.index;
        const count = properties.count;
        const time = properties.time;
        let object = properties.object;
        let color = properties.color;

        const scale = 0.5;
        object.scale.x = scale;
        object.scale.y = scale;
    
        object.position.x = stars[i].x1;
        object.position.y = stars[i].y1;
        const percent = (time-stars[i].startTime)/5.;
        object.position.z = Utils.mix(stars[i].z1, stars[i].z2, percent);
        if (object.position.z > 0 || time < stars[i].startTime) {
          stars[i] = {
            "x1": Math.random() * max + min,
            "y1": Math.random() * max + min,
            "z1": i/stars.length * min,
          };
          stars[i].z2 = stars[i].z1 - min;
          stars[i].startTime = time; 
        }
    
        color.a = 0.5 + 0.5*percent;    
      }
    }
  });
}