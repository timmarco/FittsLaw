/* global ExplorableHintedText */
ExplorableHintedText.prototype.changeForegroundColor = function(newColor,duration = 0, delay = 0) {

  this.foreground
    .transition()
    .duration(duration)
    .delay(delay)
    .attr("fill",newColor);

  return this;
};
