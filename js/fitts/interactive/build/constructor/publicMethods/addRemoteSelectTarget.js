/* global FittsInteractivePrivateConstructor */
/* global FittsCircleTarget */
FittsInteractivePrivateConstructor.prototype.addRemoteSelectTarget = function() {
  const constructorObject = this;

  let target;

  target = new FittsCircleTarget({
    "where":constructorObject.interactive.layers.remote,
    "radius":30,
    "coordinates":{
      "x":400,
      "y":88
    }
  })
  .hide();

  return target;
};
