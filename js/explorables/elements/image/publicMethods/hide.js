/* global ExplorableImage */
ExplorableImage.prototype.hide = function(duration = 0) {

  this.image
    .transition()
    .duration(duration)
    .attr("opacity",0);

  return this;
};
