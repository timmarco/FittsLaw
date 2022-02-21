/* global FittsInteractivePrivateConstructor */
/* global FunctionNumberLineHighlight */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addNumberLineInteractiveHighlight = function() {
  const constructorObject = this;
  let highlight;

  highlight = new FunctionNumberLineHighlight({
    "parent":constructorObject.interactive.logarithmNumberLinePlot,
    "value":1,
    "color":fittsColors().logarithm,
    "inputFontSize":"18pt",
    "outputFontSize":"18pt",
    "fontFamily":"Oswald",
    "backgroundColor":"#eee"
  })
  .hide();

  constructorObject.interactive.logarithmNumberLinePlot
    .addHighlightElement(highlight);

  return highlight;
};
