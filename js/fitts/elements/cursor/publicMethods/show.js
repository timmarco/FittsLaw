/* global FittsCursor */
FittsCursor.prototype.show = function(duration = 0) {

  this.circle
    .transition()
    .duration(duration)
    .attr("opacity",1);

  this.text
    .show(duration);

  this.image.image
    .transition()
    .duration(duration)
    .attr("opacity",1);

  return this;
};
