/* global FittsInteractiveIndicator */
FittsInteractiveIndicator.prototype.deEmphasize = function() {

  this.div
    .transition()
    .duration(0)
    .style("color","black")
    .style("opacity",0.5);

  return this;
};
