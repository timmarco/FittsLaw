/* global FittsInteractivePrivateConstructor */
/* global explorableSvg */
FittsInteractivePrivateConstructor.prototype.addRootNode = function() {
  let constructorObject,
    group;

  constructorObject = this;

  group = explorableGroup({
    "where":constructorObject.interactive.svg
  });

  return group;
};
