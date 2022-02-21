/* exported CalculationStepNumberLinePlot */
/* global explorableGroup */
/* global FunctionNumberLinePlotter */
/* global FunctionNumberLineHighlight */
/* global fittsColors */
/* global ExplorableHintedText */
function CalculationStepNumberLinePlot(options) {
  let color,
    fontFamily,
    fontSize,
    functionToPlot,
    labelText,
    linePlot,
    where;

  linePlot = this;

  init(options);

  return linePlot;

  /* INITIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);
    linePlot.group = addGroup();
    linePlot.columns = addColumns();
    linePlot.label = addLabel()
      .update(labelText);

    linePlot.plot = addPlot();
    linePlot.highlight = addHighlight();
    // TODO: ADD THE LABEL HERE!

  }

  /* PRIVATE METHODS */
  function _defaults(options) {

    color = options.color ? options.color : "black";
    fontFamily = options.fontFamily ? options.fontFamily : "";
    fontSize = options.fontSize ? options.fontSize : "15pt";
    labelText = options.labelText ? options.labelText : "";
    linePlot.lineHeight = options.lineHeight ? options.lineHeight : 35;

  }

  function _required(options) {

    where = options.where;
    functionToPlot = options.function;

  }


  function addColumns() {
    let groupObject;

    groupObject = {};

    groupObject.left = explorableGroup({
      "where":linePlot.group,
    }).attr("transform","translate(90,10)");


    groupObject.middle = explorableGroup({
      "where":linePlot.group,
    }).attr("transform","translate(90,0)");


    return groupObject;

  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    });

    return group;
  }

  function addHighlight() {
    let highlight;

    // TODO: PASS ONLY A COLOR, NOT AN EXPLICIT REFERENCE TO FITTS COLORS!
    highlight = new FunctionNumberLineHighlight({
      "parent":linePlot.plot,
      "value":1,
      "color":fittsColors().logarithm,
      "outputTextAnchor":"end",
      "inputFontSize":"0",
      "outputFontSize":"0pt",
      "significantDigits":2
    });
    return highlight;
  }

  function addLabel() {
    let label;

    label = new ExplorableHintedText({
      "where":linePlot.columns.left,
      "textAnchor":"end",
      "alignmentBaseline":"center",
      "foregroundColor":color,
      "fontFamily":fontFamily,
      "fontWeight":"bold",
      "fontSize":fontSize
    })
    .move({
      "x":-5,
      "y":0
    });

    return label;
  }

  function addPlot() {
    let plot;

    plot = new FunctionNumberLinePlotter({
      "where":linePlot.columns.middle,
      "coordinates":{
        "x":0,
        "y":-25
      },
      "width":100,
      "height":50,
      "axisTickCounts":1,
      "color":color,
      "margins":{
        "top":15,
        "bottom":0,
        "left":0,
        "right":0
      }
    })
    .addFunction(functionToPlot)
    .addGrid({});

    return plot;
  }
}
