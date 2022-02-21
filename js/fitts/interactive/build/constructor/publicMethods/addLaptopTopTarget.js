/* global FittsInteractivePrivateConstructor */
/* global FittsTarget */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addLaptopTopTarget = function() {
  const constructor = this;

  let target;

  target = new FittsTarget({
    "where":constructor.interactive.rootLayers.unclipped,
    "colors":fittsColors().target,
    "coordinates":{
      "x":180,
      "y":-465
    },
    "dimensions":{
      "height":500,
      "width":472
    }
  })
  .hide();

  return target;
};
