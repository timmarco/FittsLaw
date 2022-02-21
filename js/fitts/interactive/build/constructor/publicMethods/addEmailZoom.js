/* global FittsInteractivePrivateConstructor */
/* global explorableGroup */
FittsInteractivePrivateConstructor.prototype.addEmailZoom = function() {
  let group;


  group = explorableGroup({
    "where":this.interactive.layers.email
  });

  return group;
};
