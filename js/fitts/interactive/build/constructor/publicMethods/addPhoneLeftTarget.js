/* global FittsInteractivePrivateConstructor */
/* global FittsTarget */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addPhoneLeftTarget = function() {
  const constructor = this;

  let target;

  target = new FittsTarget({
    "where":constructor.interactive.rootLayers.unclipped,
    "colors":fittsColors().target,
    "coordinates":{
      "x":-100,
      "y":63
    },
    "dimensions":{
      "height":264,
      "width":420
    }
  })
  .hide();

  return target;
};
