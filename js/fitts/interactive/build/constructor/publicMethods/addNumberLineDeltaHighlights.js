/* global FittsInteractivePrivateConstructor */
/* global FunctionNumberLineHighlight */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addNumberLineDeltaHighlights = function() {
  let constructorObject,
    highlights;

  constructorObject = this;

  highlights = [];

  highlights.push(addHighlight(1,"#033D00",0));
  highlights.push(addHighlight(2,"#0F7609",500));

  highlights.push({
    "highlight":new FunctionNumberLineHighlight({
      "parent":constructorObject.interactive.logarithmNumberLinePlot,
      "value":6,
      "color":fittsColors().logarithm,
      "outputTextAnchor":"end",
      "outputFontSize":"16pt",
      "inputFontSize":"16pt",
      "significantDigits":2,
      "fontFamily":"Oswald",
      "backgroundColor":"#eee"
    }),
    "duration":1000,
    "delay":1000,
  });


  highlights.push({
    "highlight":new FunctionNumberLineHighlight({
      "parent":constructorObject.interactive.logarithmNumberLinePlot,
      "value":7,
      "color":"#6BC766",
      "inputFontSize":"16pt",
      "outputTextAnchor":"start",
      "outputFontSize":"16pt",
      "significantDigits":2,
      "fontFamily":"Oswald",
      "backgroundColor":"#eee"
    }),
    "duration":1000,
    "delay":1250,
  });


  highlights.forEach((highlight) => {

    constructorObject.interactive.logarithmNumberLinePlot
      .addHighlightElement(highlight.highlight);

    highlight.highlight
      .hide();

  });

  return highlights;

  function addHighlight(value,color,delay) {
    return {
      "highlight":new FunctionNumberLineHighlight({
        "parent":constructorObject.interactive.logarithmNumberLinePlot,
        "value":value,
        "color":color,
        "inputFontSize":"16pt",
        "outputFontSize":"16pt",
        "fontFamily":"Oswald",
        "backgroundColor":"#eee"
      }),
      "duration":1000,
      "delay":delay
    };
  }
};
