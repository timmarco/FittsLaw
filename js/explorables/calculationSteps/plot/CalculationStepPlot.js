/* exported CalculationStepPlot */
/* global explorableGroup */
/* global ExplorableHintedText */
/* global functionPlotter */
function CalculationStepPlot(options) {

  //TODO: DONT HARDCODE THESE VALUES
  const leftColumnPosition = 100;
  const middleColumnPosition = 100;

  let columns,
    color,
    stepPlot,
    domain,
    range,
    height,
    width,
    where,
    functionToPlot,
    lineTextColor;

  stepPlot = {};

  init(options);

  return stepPlot;

  /* INITIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);

    stepPlot.group = addGroup();
    stepPlot.columns = addColumns();
    stepPlot.plot = addPlot();
    stepPlot.label = addLabel();

  }



  /* PRIVATE METHODS */
  function _required(options) {

    where = options.where;

  }

  function _defaults() {

    width = options.width ? options.width : 100;
    height = options.height ? options.height : 70;
    domain = options.domain ? options.domain : [0,10];
    range = options.range ? options.range : [0,10];
    color = options.color ? options.color : "black";
    lineTextColor = options.lineTextColor ? options.lineTextColor : "black";
    functionToPlot = options.function ? options.function : (x) => { return x; };

  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    });

    return group;
  }

  function addColumns() {
    let groupObject;

    groupObject = {};

    groupObject.left = explorableGroup({
      "where":stepPlot.group,
    }).attr("transform","translate("+leftColumnPosition+",0)");


    groupObject.middle = explorableGroup({
      "where":stepPlot.group,
    }).attr("transform","translate("+middleColumnPosition+",0)");


    return groupObject;
  }

  function addLabel() {
    let label;

    label = new ExplorableHintedText({
      "where":columns.left,
      "textAnchor":"end",
      "foregroundColor":lineTextColor,
      "fontWeight":"bold",
      "fontSize":"10pt"
    })
    .move({
      "x":-5,
      "y":height / 2
    })
    .update("ID =");

    return label;
  }

  function addPlot() {
    let plot;

    plot = functionPlotter({
      "where":columns.middle,
      "width":width,
      "height":height,
      "domain":domain,
      "range":range,
      "hideGrid":true,
      "margins":{
        "left":0,
        "top":0,
        "right":0,
        "bottom":10
      },
      "circleRadius":2,
      "axisTicks":{
        "x":0,
        "y":0
      }
    })
    .addLine({
      "function":functionToPlot,
      "stroke":color,
      "textColor":lineTextColor,
      "strokeWidth":3,
    });

    return plot;
  }
}
