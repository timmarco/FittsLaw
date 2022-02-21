/* global ExplorableHintedText */
ExplorableHintedText.prototype.scaleIn = function(duration,delay) {

  this.innerGroup
    .transition()
    .duration(0)
    .attr("transform","scale(0)")
    .transition()
    .duration(duration)
    .delay(delay)
    .attr("transform","scale(1)");

  return this;
};
