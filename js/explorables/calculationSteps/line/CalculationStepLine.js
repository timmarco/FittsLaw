/* exported CalculationStepLine */
/* global explorableGroup */
/* global ExplorableHintedText */
/* global CalculationStepLinearIndicator */
/* global d3 */

function CalculationStepLine(options) {
  // TODO: CLEAN ALL OF THIS CODE
  // TODO: GET RID OF CONSTANT COLUMN POSITIONS

  const leftColumnPosition = 100;
  const middleColumnPosition = 100;

  let barHeight,
    color,
    domain,
    fontFamily,
    fontSize,
    labelText,
    line,
    scale,
    where;

  line = this;

  init(options);

  return line;

  /* INTIIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);

    scale = defineScale();

    line.group = addGroup();
    line.columns = addColumns();

    line.label = addLabel()
      .update(labelText);

    line.bar = addBar();

  }

  /* PRIVATE METHODS */
  function _defaults(options) {

    barHeight = options.barHeight ? options.barHeight : 10;
    color = options.color ? options.color : "black";
    fontSize = options.fontSize ? options.fontSize : "15pt";
    fontFamily = options.fontFamily ? options.fontFamily : "";
    labelText = options.label ? options.label +" =" : "=";
    domain = options.domain ? options.domain : [0,1];
    line.lineHeight = options.lineHeight ? options.lineHeight : 25;

  }

  function _required(options) {

    where = options.where;

  }

  function addBar() {
    let bar;

    bar = new CalculationStepLinearIndicator({
      "where":line.columns.middle,
      "color":color,
      "scale":scale,
      "fontSize":fontSize,
      "fontFamily":fontFamily,
      "height":barHeight
    });

    return bar;
  }

  function addColumns() {
    let groupObject;

    groupObject = {};

    groupObject.left = explorableGroup({
      "where":line.group,
    }).attr("transform","translate("+leftColumnPosition+",0)");


    groupObject.middle = explorableGroup({
      "where":line.group,
    }).attr("transform","translate("+middleColumnPosition+",0)");


    return groupObject;
  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    })
    .attr("transform","translate(0,50)");

    return group;
  }


  function addLabel() {
    let label;

    // TODO: DOES COLUMNS REALLY NEED TO BE PUBLIC?
    label = new ExplorableHintedText({
      "where":line.columns.left,
      "textAnchor":"end",
      "foregroundColor":color,
      "fontFamily":fontFamily,
      "fontWeight":"normal",
      "fontSize":fontSize
    })
    .move({
      "x":-5,
      "y":0
    });

    return label;
  }


  function defineScale() {
    let scale;

    //TODO: DONT HARD CODE DOMAIN AND RANGE
    scale = d3.scaleLinear()
      .domain(domain)
      .range([0,100]);

    return scale;
  }

}
