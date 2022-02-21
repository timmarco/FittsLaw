/* global FittsThumbIndicator */
FittsThumbIndicator.prototype.move = function(coordinates,duration = 500, delay = 0) {

  this.circle
    .transition()
    .duration(duration)
    .delay(delay)
    .attr("cx",coordinates.x)
    .attr("cy",coordinates.y);

  return this;
};
