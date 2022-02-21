/* global FittsInteractiveIndicator */
/* global d3 */
FittsInteractiveIndicator.prototype.show = function() {

  let height = this.div
    .node()
    .getBoundingClientRect()
    .height;


  this.foreignObject
    .transition()
    .duration(750)
    .attr("y",-height * 2)
    .ease(d3.easeExpOut)
    .attr("opacity",1);

  return this;
};
