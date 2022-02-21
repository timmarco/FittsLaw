/* global FittsInteractivePrivateConstructor */
/* global explorableGroup */

FittsInteractivePrivateConstructor.prototype.addLayers = function(layersToAdd) {
  let constructorObject,
    layers;

  constructorObject = this;

  layers = {};

  layersToAdd.forEach((layerName) => {
    layers[layerName] = explorableGroup({
      "where":constructorObject.interactive.visibleLayer
    })
    // .attr("opacity",0)
    .attr("id",layerName);
  });

  return layers;
};
