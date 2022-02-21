/* global ExplorableHintedText */
ExplorableHintedText.prototype.show = function(duration) {

  this.foreground
    .transition()
    .duration(duration)
    .attr("opacity",1);

  this.background
    .transition()
    .duration(duration)
    .attr("opacity",1);

  return this;
};
