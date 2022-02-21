/* global FittsInteractivePrivateConstructor */
/* global FunctionPlotter */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addLogarithm = function() {
  let constructorObject,
    plot;

  constructorObject = this;

  plot = new FunctionPlotter({
    "where":constructorObject.interactive.layers.logarithm,
    "width":600,
    "height":400,
    "domain":[0,10],
    "range":[0,10],
    "hideGrid":true,
    "x":100,
    "fontFamily":"Oswald"
  })
  .addLine({
    "function":(x) => { return Math.log2(x); },
    "stroke":fittsColors().logarithm,
    "strokeWidth":5,
  })
  .xAxisTitle({
    "string":"Input",
    "fontSize":"18pt",
    "backgroundColor":"#eee"
  })
  .yAxisTitle({
    "string":"Output",
    "fontSize":"18pt",
    "backgroundColor":"#eee"
  })
  .plotTitle({
    "string":"The Binary Logarithm",
    "backgroundColor":"#eee"
  });

  return plot;
};
