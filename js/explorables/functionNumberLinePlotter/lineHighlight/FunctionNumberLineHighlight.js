/* exported FunctionNumberLineHighlight */
/* global ExplorableHintedText */
function FunctionNumberLineHighlight(options) {
  let backgroundColor,
    color,
    fontFamily,
    highlight,
    inputFontSize,
    outputFontSize,
    outputTextAnchor,
    outputValue,
    significantDigits,
    strokeWidth;

  highlight = this;

  init(options);

  return highlight;

  /* INITIALZE */
  function init(options) {

    _required(options);
    _defaults(options);

    highlight.line = addLine();
    highlight.inputText = addInputText();
    highlight.outputText = addOutputText();

  }


  /* PRIVATE METHODS */
  function _defaults(options) {

    color = options.color ? options.color : "black";
    backgroundColor = options.backgroundColor ? options.backgroundColor : "white";
    fontFamily = options.fontFamily ? options.fontFamily : "";
    inputFontSize = options.inputFontSize ? options.inputFontSize : "14pt";
    outputTextAnchor = options.outputTextAnchor ? options.outputTextAnchor : "middle";
    outputFontSize = options.outputFontSize ? options.outputFontSize : "14pt";
    strokeWidth = options.strokeWidth ? options.strokeWidth : 3;
    significantDigits = options.significantDigits ? options.significantDigits : 0;
    outputValue = highlight.parent.functionToPlot(highlight.value).toFixed(significantDigits);
  }

  function _required(options) {

    highlight.parent = options.parent;
    highlight.value = options.value;
    highlight.hasTransitioned = false;

  }

  function addLine() {
    let line;

    //TODO MOVE COORDINATES TO DEFINE COORDINATES
    highlight.coordinates = highlight.parent
      .lineCoordinatesForValue(highlight.value);

    line = highlight.parent.layers.highlights
      .append("line")
      .attr("x1",highlight.coordinates.x1)
      .attr("x2",highlight.coordinates.x2)
      .attr("y1",highlight.coordinates.y1)
      .attr("y2",highlight.coordinates.y2)
      .attr("stroke",color)
      .attr("stroke-width",strokeWidth);

    return line;
  }

  function addInputText() {
    let text;

    text = new ExplorableHintedText({
      "where":highlight.parent.layers.highlights,
      "coordinates":{
        "x":highlight.coordinates.x1,
        "y":highlight.parent.inputY
      },
      "fontWeight":"bold",
      "backgroundColor":backgroundColor,
      "foregroundColor":color,
      "fontSize":inputFontSize,
      "fontFamily":fontFamily
    })
    .update(highlight.value);

    return text;
  }

  function addOutputText() {
    let text;

    text = new ExplorableHintedText({
      "where":highlight.parent.layers.highlights,
      "coordinates":{
        "x":highlight.parent.scale(outputValue),
        "y":highlight.parent.outputY
      },
      "fontWeight":"bold",
      "backgroundColor":backgroundColor,
      "foregroundColor":color,
      "textAnchor":outputTextAnchor,
      "fontSize":outputFontSize,
      "fontFamily":fontFamily
    })
    .update(outputValue);

    return text;
  }




}
