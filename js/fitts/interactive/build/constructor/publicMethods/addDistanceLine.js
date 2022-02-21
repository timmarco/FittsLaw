/* global FittsInteractivePrivateConstructor */
/* global explorableLine */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addDistanceLine = function() {
  let constructorObject,
    line;

  constructorObject = this;

  line = explorableLine({
    "where":constructorObject.interactive.rootLayers.unclipped,
    "stroke":fittsColors().distance,
    "strokeWidth":5
  });

  return line;
};
