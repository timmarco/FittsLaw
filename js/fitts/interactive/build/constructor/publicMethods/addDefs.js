/* global FittsInteractivePrivateConstructor */
FittsInteractivePrivateConstructor.prototype.addDefs = function() {
  let constructorObject,
    defs;

  constructorObject = this;

  defs = constructorObject.interactive.svg
    .append("defs");

  return defs;
};
