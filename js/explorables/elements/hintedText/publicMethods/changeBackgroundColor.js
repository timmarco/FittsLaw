/* global ExplorableHintedText */
ExplorableHintedText.prototype.changeBackgroundColor = function(newColor,duration = 0, delay = 0) {

  this.background
    .transition()
    .duration(duration)
    .delay(delay)
    .attr("stroke",newColor);

  return this;
};
