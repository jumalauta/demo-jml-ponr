let treeChildId = 0;
Demo.prototype.addEffectGrowingTree = function () {
  let initBranches = 10;

  this.loader.addAnimation({
    "id":"nulltree"
   ,"object":null
   ,"position":[{"x":0,"y":-4.0,"z":-5}]
   ,"scale":[{"uniform3d":2.0}]
   ,"angle": [{"degreesY":0,"degreesZ":0,"degreesX":0}]
 });

 this.treeBranch(7,"nulltree", 0.0,1);
}

Demo.prototype.treeBranch = function (branches, parentId, treeTime, branchAmount) {

  if(branches<=0)
    return;

  let spawnPoints =
  [
    0.0, 0.37, 0.0
  ]
    
  for(let i = 0; i<branchAmount;i++)
  {
      treeChildId++;

    this.loader.addAnimation([{
        "start": treeTime+i*2.3+Math.random()*.5, "duration": 30.0-((treeTime+i*.1)-30),
        "id":parentId+treeChildId
       ,"parent":parentId
       ,"object":{
         "name":"sceneTree/obj_tree.obj",
         "time":()=>0.1*getSceneTimeFromStart(),
       }
     ,"position":[{
         "x":spawnPoints[0],
         "y":spawnPoints[1],
         "z":spawnPoints[2],
       }]
     ,"angle":[{
         "degreesY":Math.random()*360-180 ,
         "degreesX":Math.random()*50-25,
         "degreesZ":Math.random()*50-25
       }
       ,
       {"duration":6,
         "degreesY":Math.random()*360-180,
         "degreesX":Math.random()*60-30 ,
         "degreesZ":Math.random()*60-30
       }]
     ,"scale":[{"uniform3d":0.0}
        ,{"duration":5,
          "uniform3d":branches*.2*(Math.random()+.5)}]
    }]);

    this.treeBranch(branches-1,parentId+treeChildId, treeTime+2,Math.floor(Math.random() * 1)+2);
  }
}

Demo.prototype.sceneTreeGrow = function () {
  this.loader.setScene('treeGrow');
  this.addEffectStarfield();
  this.addEffectGrowingTree();
  this.loader.addAnimation({
    "light": {
        "type": "Point",
        "properties": { "intensity": 125.0 },
        "castShadow": true
    }
    ,"color": [{
      "r": 1.0, "g": 1.0, "b": 1.0
    }]
    ,"position": [{
      "x": 0, "y": 0, "z": 0
    }]
  });
}
