/* global FittsInteractivePrivateConstructor */
/* global explorableLine */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addWidthLine = function() {
  let constructorObject,
    line;

  constructorObject = this;

  line = explorableLine({
    "where":constructorObject.interactive.rootLayers.unclipped,
    "stroke":fittsColors().width,
    "strokeWidth":5
  });

  return line;
};
