/* global FittsCursor */
FittsCursor.prototype.killLaptopAnimation = function() {

  this.imageGroup
    .transition()
    .duration(0)
    .attr("transform","translate(0,0)");

  return this;
};
