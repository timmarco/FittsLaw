/* global FittsInteractivePrivateConstructor */
/* global FittsThumbIndicator */
FittsInteractivePrivateConstructor.prototype.addThumbIndicator = function() {
  const interactive = this.interactive;
  let indicator;

  indicator = new FittsThumbIndicator({
    "where":interactive.rootLayers.unclipped
  })
  .hide();

  return indicator;
};
