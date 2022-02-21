/* global FittsTarget */
FittsTarget.prototype.show = function(duration) {
  this.indicator
    .transition()
    .duration(duration)
    .attr("opacity",0.75);

  return this;
};
