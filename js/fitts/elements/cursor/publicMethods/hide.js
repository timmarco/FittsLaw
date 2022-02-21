/* global FittsCursor */
FittsCursor.prototype.hide = function(duration) {

  this.imageGroup
    .transition()
    .attr("transform","translate(0,0)");

  this.circle
    .transition()
    .duration(duration)
    .attr("opacity",0);

  this.text
    .hide(duration);

  this.image.image
    .transition()
    .duration(duration)
    .attr("opacity",0);

  return this;
};
