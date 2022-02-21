/* global ExplorableImage */
ExplorableImage.prototype.show = function(duration = 0, opacity = 1) {

  this.image
    .transition()
    .duration(duration)
    .attr("opacity",opacity);

  return this;
};
