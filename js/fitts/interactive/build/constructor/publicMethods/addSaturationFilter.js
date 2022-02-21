/* global FittsInteractivePrivateConstructor */
FittsInteractivePrivateConstructor.prototype.addSaturationFilter = function() {
  let constructorObject,
    filter,
    saturationMatrix;

  constructorObject = this;

  filter = constructorObject.interactive.defs
    .append("filter")
    .attr("id","saturation");

  saturationMatrix = filter
    .append("feColorMatrix")
    .attr("in","SourceGraphic")
    .attr("type","saturate")
    .attr("values",0);

  return saturationMatrix;
};
