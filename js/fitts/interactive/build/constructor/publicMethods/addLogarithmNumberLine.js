/* global FittsInteractivePrivateConstructor */
/* global FunctionNumberLinePlotter */
FittsInteractivePrivateConstructor.prototype.addLogarithmNumberLine = function() {
  let constructorObject,
    plot;

  constructorObject = this;

  plot = new FunctionNumberLinePlotter({
      "where":constructorObject.interactive.layers.logarithmNumberLine
  })
  .addFunction((x) => { return Math.log2(x); })
  .addInputAxis({})
  .addInputLabel({
    "string":"Input",
    "fontFamily":"Oswald",
    "fontSize":"18pt",
    "backgroundColor":"#eee"
  })
  .addOutputAxis({})
  .addOutputLabel({
    "string":"Output",
    "fontFamily":"Oswald",
    "fontSize":"18pt",
    "backgroundColor":"#eee"
  })
  .addGrid({
    "lineInterval":0.25,
  });

  return plot;
};
