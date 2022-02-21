/* global FittsThumbIndicator */
FittsThumbIndicator.prototype.hide = function(duration = 500, delay = 0) {

  this.opacity
    .transition()
    .duration(duration)
    .delay(delay)
    .attr("opacity",0);

  return this;
};
