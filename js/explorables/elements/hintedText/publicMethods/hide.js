/* global ExplorableHintedText */
ExplorableHintedText.prototype.hide = function(duration) {

  this.foreground
    .transition()
    .duration(duration)
    .attr("opacity",0);

  this.background
    .transition()
    .duration(duration)
    .attr("opacity",0);

  return this;
};
