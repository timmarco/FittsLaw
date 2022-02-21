/* global FittsInteractivePrivateConstructor */
/* global ExplorableImage */
FittsInteractivePrivateConstructor.prototype.addRatioHeatmap = function() {
  let constructorObject,
    heatmap;

  constructorObject = this;

  heatmap = new ExplorableImage({
    "where":constructorObject.interactive.emailZoom,
    "href":"assets/ratioHeatmap.png"
  })
  .hide();

  return heatmap;
};
