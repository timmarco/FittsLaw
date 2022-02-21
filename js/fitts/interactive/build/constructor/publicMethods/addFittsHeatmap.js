/* global FittsInteractivePrivateConstructor */
/* global ExplorableImage */
FittsInteractivePrivateConstructor.prototype.addFittsHeatmap = function() {
  let constructorObject,
    heatmap;

  constructorObject = this;

  heatmap = new ExplorableImage({
    "where":constructorObject.interactive.emailZoom,
    "href":"assets/fittsHeatmap.png",
    "width":800,
    "height":500
  })
  .hide();

  return heatmap;
};
