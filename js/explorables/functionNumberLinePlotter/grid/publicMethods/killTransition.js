/* global FunctionNumberLineGrid */
FunctionNumberLineGrid.prototype.killTransition = function() {
  let grid = this;

  //TODO: THAT ATTR X2 LINE IS UGLY! CLEAN IT UP!
  grid.gridLines
    .transition()
    .duration(0)
    .attr("x2",(datum) => { return grid.scale(grid.functionToPlot(datum));})
    .attr("y2",grid.outputY);

  return grid;
};
