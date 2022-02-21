/* exported CalculationStepLinearDivisionIndicator */
/* global explorableGroup */
/* global ExplorableHintedText */
function CalculationStepLinearDivisionIndicator(options) {
  let colors,
    fontSize,
    height,
    indicator,
    where;

  indicator = this;

  init(options);

  return indicator;

  /* INITIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);

    indicator.barGroup = addBarGroup();
    indicator.barHint = addBarHint();

    indicator.numerator = addNumerator();
    indicator.denominator = addDenominator();

    indicator.text = addText();
    indicator.denominatorPathGenerator = denominatorPathGenerator;
    indicator.numeratorPathGenerator = numeratorPathGenerator;


  }


  /* PRIVATE METHODS */
  function _defaults(options) {

    height = options.height ? options.height : 10;
    fontSize = options.fontSize ? options.fontSize : "12pt";

  }

  function _required(options) {

    where = options.where;
    indicator.scale = options.scale;
    colors = options.colors;

  }

  function addBarGroup() {
    let group;

    group = explorableGroup({
      "where":where
    });

    return group;
  }

  function addBarHint() {
    let hint;

    hint = where
      .append("rect")
      .attr("x",0)
      .attr("y",-height / 2)
      .attr("width",indicator.scale.range()[1])
      .attr("height",height)
      .attr("fill","none")
      .attr("stroke","#aaa")
      .attr("stroke-width",1);

    return hint;
  }

  function addDenominator() {
    let shape;

    // TODO: THIS CAN BE FURTHER SIMPLIFIED INTO A TRIANGLE MAKER!
    shape = where
      .append("path")
      .attr("d",denominatorPathGenerator(indicator.scale.range()[1]))
      .attr("fill",colors.denominator);

    return shape;
  }

  function addNumerator() {
    let shape;

    shape = where
      .append("path")
      .attr("d",numeratorPathGenerator(indicator.scale.range()[1]))
      .attr("fill",colors.numerator);

    return shape;
  }

  function addText() {
    let text;

    text = new ExplorableHintedText({
      "where":where,
      "fontSize":fontSize,
      "fontWeight":"bold",
      "foregroundColor":colors.bar,
      "coordinates":{
        "x":indicator.scale.range()[1],
        "y":0
      }
    })
    .update("0");

    return text;
  }

  function denominatorPathGenerator(value) {
    let path,
      points;

    points = makePoints(value);

    path = "M "+points.bottomLeft+" " + points.topRight +" " + points.bottomRight + " Z";

    return path;
  }

  function numeratorPathGenerator(value) {
    let path,
      points;

    points = makePoints(value);

    path = "M "+points.topLeft+" " + points.topRight +" " + points.bottomLeft + " Z";

    return path;
  }


  function makePoints(maxWidth) {
    let points;

    points = {};
    points.topLeft = "0," + (-height / 2);
    points.bottomLeft = "0," + (height / 2);
    points.topRight = maxWidth + "," + (-height / 2);
    points.bottomRight = maxWidth + "," + (height / 2);

    return points;
  }


}
