/* exported FunctionNumberLineGrid */
/* global explorableGroup */
/* global d3 */
function FunctionNumberLineGrid(options) {
  let grid,
    lineInterval,
    strokeWidth,
    stroke,
    group,
    where;

  grid = this;

  init(options);

  return grid;

  /* INITIALIZE */
  function init(options) {

    _required(options);
    _defaults(options);

    group = addGroup();
    grid.gridLines = addgridLines();
    grid.hasTransitioned = false;

  }



  /* PRIVATE METHODS */
  function _defaults(options) {

    lineInterval = options.lineInterval ? options.lineInterval : 1;
    stroke = options.stroke ? options.stroke : "rgba(0,0,0,0.25)";
    strokeWidth = options.strokeWidth ? options.strokeWidth : 1;

  }

  function _required(options) {

    grid.hasTransitioned = false;
    grid.parent = options.parent;
    grid.functionToPlot = grid.parent.functionToPlot;
    grid.inputY = grid.parent.inputY;
    grid.outputY = grid.parent.outputY;
    grid.scale = grid.parent.scale;

    where = grid.parent.layers.data;
  }

  function addGroup() {
    let group;

    group = explorableGroup({
      "where":where
    });

    return group;
  }

  function addgridLines() {
    let data,
      finiteData,
      lines;

    data = d3.range(grid.scale.domain()[0],grid.scale.domain()[1] + lineInterval,lineInterval);

    finiteData = data.filter(validateDatum);

    lines = group
      .selectAll("line")
      .data(finiteData)
      .enter()
      .append("line")
      .attr("x1",(datum) => { return grid.scale(datum); })
      .attr("x2",(datum) => { return grid.scale(grid.functionToPlot(datum)); })
      .attr("y1",grid.inputY)
      .attr("y2",grid.outputY)
      .attr("stroke",stroke)
      .attr("stroke-width",strokeWidth);

    return lines;
  }

  function validateDatum(datum) {
    let acceptable,
      functionValue;

    functionValue = grid
      .functionToPlot(datum);

    acceptable = true;

    if(!isFinite(functionValue)) { acceptable = false; }
    if(functionValue < grid.scale.domain()[0]) { acceptable = false; }
    if(functionValue > grid.scale.domain()[1]) { acceptable = false; }

    return acceptable;
  }

}
