/* global FittsInteractivePrivateConstructor */
/* global FittsCursor */
FittsInteractivePrivateConstructor.prototype.addCursor = function() {
  let constructorObject,
    cursor;

  constructorObject = this;

  cursor = new FittsCursor({
    "where":constructorObject.interactive.rootLayers.unclipped,
    "coordinates":{
      "x":687,
      "y":325
    }
  })
  .hide();

  return cursor;
};
