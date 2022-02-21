/* global FittsInteractivePrivateConstructor */
/* global explorableGroup */
FittsInteractivePrivateConstructor.prototype.addVisibleLayer = function() {
  let constructorObject,
    visibleLayer;

  constructorObject = this;

  visibleLayer = explorableGroup({
    "where":constructorObject.interactive.rootNode
  });

  return visibleLayer;
};
