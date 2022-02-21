/* global FittsInteractivePrivateConstructor */
/* global FittsEmailBase */
FittsInteractivePrivateConstructor.prototype.addBase = function() {
  let base,
  constructorObject;

  constructorObject = this;

  base = new FittsEmailBase({
    "where":constructorObject.interactive.emailZoom,
  });

  return base;
};
