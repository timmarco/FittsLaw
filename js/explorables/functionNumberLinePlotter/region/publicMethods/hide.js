/* global FunctionNumberLineRegion */
FunctionNumberLineRegion.prototype.hide = function(duration = 0) {

  this.group
    .transition()
    .duration(duration)
    .attr("opacity",0);

  return this;
};
