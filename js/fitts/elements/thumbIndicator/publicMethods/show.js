/* global FittsThumbIndicator */
FittsThumbIndicator.prototype.show = function(duration = 500, delay = 0) {

  this.opacity
    .transition()
    .duration(duration)
    .delay(delay)
    .attr("opacity",1);

  return this;
};
