/* global FunctionNumberLineRegion */
FunctionNumberLineRegion.prototype.show = function(duration = 0) {

  this.group
    .transition()
    .duration(duration)
    .attr("opacity",1);

  return this;
};
