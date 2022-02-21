/* global FittsInteractiveIndicator */
FittsInteractiveIndicator.prototype.hide = function() {

  this.foreignObject
    .transition()
    .duration(250)
    .attr("y",0)
    .attr("opacity",0);

  return this;
};
