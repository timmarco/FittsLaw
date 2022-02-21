/* global FittsInteractivePrivateConstructor */
/* global FittsInteractiveIndicator */
FittsInteractivePrivateConstructor.prototype.addInteractiveIndicator = function() {
  let indicator;

  indicator = new FittsInteractiveIndicator({
    "where":this.interactive.rootNode
  });

  return indicator;
};
