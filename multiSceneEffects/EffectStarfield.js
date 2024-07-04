Demo.prototype.addEffectStarfield = function () {

  const skyColor = 0.01;
  this.loader.addAnimation({
    object: '_embedded/testUvMap.png',
    shape: { type: 'SKYSPHERE' },
    color: [{ r: skyColor, g: skyColor, b: skyColor }],
  });

  let stars = new Array(10000);
  const size = 500;
  for (let i = 0; i < stars.length; i++) {
    stars[i] = {
      "x1": Math.random() * size*2 - size,
      "y1": Math.random() * size*2 - size,
      "z1": Math.random() * size*2 - size,
      "z2": size,
    };
  }

  this.loader.addAnimation({
    "image": "multiSceneEffects/star.png",
    "perspective": "3d",
    "billboard": true,
    "additive": true,
    "scale":[{"uniform3d":0.25}],
    "instancer": {
      "count": stars.length,
      "runInstanceFunction": (properties) => {

        const i = properties.index;
        const count = properties.count;
        const time = properties.time;
        let object = properties.object;
        let color = properties.color;

        const scale = 3.0;
        object.scale.x = scale;
        object.scale.y = scale;
        object.scale.z = scale;   
        object.position.x = stars[i].x1;
        object.position.y = stars[i].y1;
        stars[i].z1+=Sync.get('Starfield:Speed')*getDeltaTime();
        object.position.z = stars[i].z1;
        if (stars[i].z1 >= size ) {
          stars[i] = {
            "x1": Math.random() * size*2 - size,
            "y1": Math.random() * size*2 - size,
            "z1": -size,
          };
        }
      }
    }
  });
}