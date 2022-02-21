/* global FunctionPlotterGrid */
FunctionPlotterGrid.prototype.transitionIn = function() {

  this.xTicks
    .attr("y2",this.scales.y(this.range[0]))
    .transition()
    .delay((datum,index) => { return 100 * index; })
    .duration(1000)
    .attr("y2",this.scales.y(this.range[1]));

  this.yTicks
    .attr("x2",this.scales.x(this.domain[0]))
    .transition()
    .delay((datum,index) => { return 100 * index; })
    .duration(1000)
    .attr("x2",this.scales.x(this.domain[1]));

};
