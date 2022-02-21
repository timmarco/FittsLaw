/* global FittsInteractivePrivateConstructor */
/* global FittsTarget */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addPhoneBottomTarget = function() {
  const constructor = this;

  let target;

  target = new FittsTarget({
    "where":constructor.interactive.rootLayers.unclipped,
    "colors":fittsColors().target,
    "coordinates":{
      "x":323,
      "y":325
    },
    "dimensions":{
      "height":1000,
      "width":154
    }
  })
  .hide();

  return target;
};
