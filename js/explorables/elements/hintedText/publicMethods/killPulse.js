/* global ExplorableHintedText */
ExplorableHintedText.prototype.killPulse = function() {

  this.innerGroup
    .transition()
    .duration(0)
    .attr("transform","scale(1)");

  return this;
};
