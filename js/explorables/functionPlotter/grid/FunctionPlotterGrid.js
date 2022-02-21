/* exported FunctionPlotterGrid */
/* global d3 */
function FunctionPlotterGrid(options) {
  let domain,
    grid,
    range,
    scales,
    where,
    tickEvery;

  grid = this;

  init(options);

  return grid;

  /* INITIALIZE */
  function init(options) {
    _required(options);
    // _default(options);

    grid.xTicks = addXTicks();
    grid.yTicks = addYTicks();


  }

  /* PRIVATE METHODS */
  // function _default(options) {
  //
  //}

  function _required(options) {
    tickEvery = options.tickEvery;
    grid.scales = options.scales;
    where = options.where;
    grid.domain = options.domain;
    grid.range = options.range;
  }

  function addXTicks() {
    let data,
      group,
      lines;

    group = where
      .append("g");

    data = d3.range(domain[0],domain[1] + 1,tickEvery);

    lines = group
      .selectAll("line")
      .data(data)
      .enter()
      .append("line")
      .attr("x1",(d) => { return scales.x(d) ;})
      .attr("x2",(d) =>{  return scales.x(d) ;})
      .attr("y1",scales.y(range[0]))
      .attr("y2",scales.y(range[1]))
      .attr("stroke","#ddd")
      .attr("stroke-width",1)
      .attr("stroke-dasharray","1,0");

    return lines;
  }

  function addYTicks() {
    let data,
      group,
      lines;

    group = where
      .append("g");

    data = d3.range(domain[0],domain[1],tickEvery);

    lines = group
      .selectAll("line")
      .data(data)
      .enter()
      .append("line")
      .attr("x1",scales.x(domain[0]))
      .attr("x2",scales.x(domain[1]))
      .attr("y1",(d) => { return scales.y(d); })
      .attr("y2",(d) => { return scales.y(d); })
      .attr("stroke","#ddd")
      .attr("stroke-width",1)
      .attr("stroke-dasharray","1,0");

    return lines;
  }

}
