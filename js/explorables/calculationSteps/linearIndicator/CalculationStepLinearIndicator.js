/* exported CalculationStepLinearIndicator */
/* global ExplorableHintedText */
function CalculationStepLinearIndicator(options) {
  let barHeight,
    color,
    fontFamily,
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


    indicator.bar = addBar();
    indicator.barHint = addBarHint();
    indicator.text = addText();

  }

  /* PRIVATE METHODS */
  function _defaults(options) {

    barHeight = options.barHeight ? options.barHeight : 8;
    color = options.color ? options.color : "black";
    height = options.height ? options.height : 5;
    fontSize = options.fontSize ? options.fontSize : "12pt";
    fontFamily = options.fontFamily ? options.fontFamily : "";

    // TODO: THIS IS SLOPPY AND TEMPORARY
    indicator.barHeight = barHeight;


  }

  function _required(options) {

    indicator.scale = options.scale;
    where = options.where;

  }

  function addBar() {
    let bar;

    bar = where
      .append("rect")
      .attr("x",0)
      .attr("y",-height / 2)
      .attr("height",height)
      .attr("fill",color);

    return bar;
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

  function addText() {
    let text;
    
    text = new ExplorableHintedText({
      "where":where,
      "foregroundColor":color,
      "textAnchor":"start",
      "alignmentBaseline":"middle",
      "fontFamily":fontFamily,
      "fontSize":fontSize,
      "fontWeight":"bold"
    })
    .move({
      "x":0,
      "y":0
    });

    return text;
  }

}
