/* global FittsInteractivePrivateConstructor */
/* global FittsExampleTargets */
FittsInteractivePrivateConstructor.prototype.addExampleTargets = function() {
  let constructorObject,
    targets;

  constructorObject = this;

  targets = new FittsExampleTargets({
    "where":constructorObject.interactive.emailZoom
  })
  .hide();

  return targets;
};
