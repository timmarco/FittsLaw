/* exported CalculationStepDivisionLine */
/* global CalculationStepLinearDivisionIndicator */
/* global EquationDisplay */
/* global d3 */
/* global explorableGroup */
function CalculationStepDivisionLine(options) {
  let colors,
    domain,
    fontSize,
    divisionLine,
    where;

  divisionLine = this;

  init(options);

  return divisionLine;

  /* INTIIALIZE */
  function init(options) {

    _required();
    _defaults(options);

    divisionLine.group = addGroup();
    divisionLine.columns = addColumns();
    divisionLine.scale = defineScale();
    divisionLine.label = addLabel();
    divisionLine.bar = addBar();


  }


  /* PRIVATE METHODS */
  function _defaults(options) {

    colors = options.colors ? options.colors : {"numerator":"black","denominator":"black","bar":"black"};
    fontSize = options.fontSize ? options.fontSize : "12pt";

  }

  function _required() {

    domain = options.domain;
    where = options.where;

  }

  function addBar() {
    let bar;

    bar = new CalculationStepLinearDivisionIndicator({
      "scale":divisionLine.scale,
      "where":divisionLine.columns.middle,
      "colors":colors
    });

    return bar;
  }

  function addColumns() {
    let columnGroup;

    columnGroup = {};

    //TODO: DONT HARDCODE THE TRANSLATE VALUES HERE!
    columnGroup.left = explorableGroup({
      "where":divisionLine.group
    })
    .attr("transform","translate(0,25)");
    columnGroup.middle = explorableGroup({
      "where":divisionLine.group
    })
    .attr("transform","translate(100,25)");

    return columnGroup;
  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    });

    return group;
  }

  function addLabel() {
    let equation;

    equation = new EquationDisplay({
      "where":divisionLine.columns.left,
      "coordinates":{
        "x":90,
        "y":0
      }
    });

    return equation;
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
