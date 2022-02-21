/* global FittsTarget */
FittsTarget.prototype.hide = function(duration) {

  this.indicator
    .transition()
    .duration(duration)
    .attr("opacity",0);

  return this;
};
