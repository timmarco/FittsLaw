/* global FittsInteractivePrivateConstructor */
/* global FunctionNumberLineHighlight */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addNumberHighlightOne = function() {
  const constructorObject = this;
  let highlight;


  highlight = new FunctionNumberLineHighlight({
    "parent":constructorObject.interactive.logarithmNumberLinePlot,
    "value":1,
    "color":fittsColors().logarithm,
    "inputFontSize":"16pt",
    "outputFontSize":"16pt",
    "fontFamily":"Oswald",
    "backgroundColor":"#eee"
  })
  .hide();

  constructorObject.interactive.logarithmNumberLinePlot
    .addHighlightElement(highlight);


  return highlight;
};
