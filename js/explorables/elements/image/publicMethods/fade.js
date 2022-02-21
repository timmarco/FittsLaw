/* global ExplorableImage */
ExplorableImage.prototype.fade = function(duration = 0,opacity = 0) {

  this.image
    .transition()
    .duration(duration)
    .attr("opacity",opacity);

  return this;
};
