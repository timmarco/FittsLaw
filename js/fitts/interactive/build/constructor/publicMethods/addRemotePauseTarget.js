/* global FittsInteractivePrivateConstructor */
/* global FittsCircleTarget */
FittsInteractivePrivateConstructor.prototype.addRemotePauseTarget = function() {
  const constructorObject = this;

  let target;

  target = new FittsCircleTarget({
    "where":constructorObject.interactive.layers.remote,
    "radius":30,
    "coordinates":{
      "x":400,
      "y":200
    }
  })
  .hide();

  return target;
};
