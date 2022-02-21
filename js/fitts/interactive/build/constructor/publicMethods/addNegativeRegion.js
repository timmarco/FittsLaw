/* global FittsInteractivePrivateConstructor */
/* global FunctionNumberLineRegion */
FittsInteractivePrivateConstructor.prototype.addNegativeRegion = function() {
  let constructorObject,
    region;

  constructorObject = this;

  region = new FunctionNumberLineRegion({
    "parent":constructorObject.interactive.logarithmNumberLinePlot,
    "values":[
      0.25,
      1
    ],
    "color":"rgba(255,0,0,0.5)"
  })
  .hide();

  constructorObject.interactive.logarithmNumberLinePlot
    .addHighlightElement(region);

  return region;
};
