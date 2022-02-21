/* exported FunctionPlotterLine */
/* global d3 */
/* global ExplorableHintedText */
//TODO: THIS IS GETTING A LITTLE LONG
function FunctionPlotterLine(options) {
  let circleRadius,
    numberOfSamples,
    line,
    sampledPoints,
    stroke,
    strokeWidth,
    strokeDashArray,
    where,
    valueTextColor;

  line = this;

  init(options);

  return line;

  /* INTIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);


    sampledPoints = samplePoints();
    line.lineGenerator = defineLineGenerator();
    line.path = addPath();
    line.valueCircle = addValueCircle();
    line.valueText = addValueText();

    line
      .updatePlot();

  }


  /* PRIVATE METHODS */

  function _defaults(options) {

    circleRadius = options.circleRadius ? options.circleRadius : 0;
    numberOfSamples = options.samples ? options.samples : 100;
    stroke = options.stroke ? options.stroke : "black";
    strokeWidth = options.strokeWidth ? options.strokeWidth : 1;
    strokeDashArray = options.strokeDashArray ? options.strokeDasharray : "1,0";
    valueTextColor = options.textColor ? options.textColor : stroke;

  }

  function _required(options) {

    where = options.where;
    line.functionToPlot = options.function;
    line.domain = options.domain;
    line.scales = options.scales;

  }

  function addPath() {
    let path,
      pathDefinition;

    pathDefinition = line.lineGenerator(sampledPoints);

    path = where
      .append("path")
      .attr("stroke",stroke)
      .attr("fill","none")
      .attr("stroke-width",strokeWidth)
      .attr("stroke-dasharray",strokeDashArray)
      .attr("d",pathDefinition);


    return path;
  }

  function addValueCircle() {
    let circle;

    circle = where
      .append("circle")
      .attr("r",circleRadius)
      .attr("fill",stroke);

    return circle;
  }

  function addValueText() {
    let text;

    text = new ExplorableHintedText({
      "where":where,
      "fontSize":"22pt",
      "foregroundColor":valueTextColor,
      "fontWeight":"bold"
    });

    return text;
  }

  function defineLineGenerator() {
    let generator;

    generator = d3.line()
      .x((d) => { return line.scales.x(d.x); })
      .y((d) => { return line.scales.y(d.y); });

    return generator;
  }

  function samplePoints() {
    let sampleStep,
      sampledData;

    sampleStep = (line.domain[1] - line.domain[0]) / numberOfSamples;
    sampledData = [];

    d3.range(line.domain[0],line.domain[1] + sampleStep,sampleStep).forEach((sample) => {
      if(isFinite(line.functionToPlot(sample))) {
        sampledData.push({
          "x":sample,
          "y":line.functionToPlot(sample),
        });
      }
    });

    return sampledData;
  }
}
