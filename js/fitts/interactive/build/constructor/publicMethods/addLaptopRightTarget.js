/* global FittsInteractivePrivateConstructor */
/* global FittsTarget */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addLaptopRightTarget = function() {
  const constructor = this;

  let target;

  target = new FittsTarget({
    "where":constructor.interactive.rootLayers.unclipped,
    "colors":fittsColors().target,
    "coordinates":{
      "x":652,
      "y":35
    },
    "dimensions":{
      "height":293,
      "width":2000
    }
  })
  .hide();

  return target;
};
