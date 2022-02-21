/* global FittsInteractivePrivateConstructor */
/* global ExplorableTooltip */
FittsInteractivePrivateConstructor.prototype.addTooltip = function() {
  // TODO: CONSTRUCTOR OBJECTS AS CONSTANTS, NOT VARIABLES!;
  let constructorObject,
    tooltip;

  constructorObject = this;

  tooltip = new ExplorableTooltip({
    "where":constructorObject.interactive.rootLayers.tooltip
  })
  .update("")
  .move({"x":50,"y":50});

  return tooltip;
};
