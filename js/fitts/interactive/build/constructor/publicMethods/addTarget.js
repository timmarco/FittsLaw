/* global FittsInteractivePrivateConstructor */
/* global FittsTarget */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addTarget = function() {
  let constructorObject,
    target;

  constructorObject = this;

  target = new FittsTarget({
    "where":constructorObject.interactive.emailZoom,
    "colors":fittsColors().target,
    "coordinates":{
      "x":625,
      "y":110
    },
    "dimensions":{
      "height":30,
      "width":125
    }
  })
  .hide();

  return target;
};
