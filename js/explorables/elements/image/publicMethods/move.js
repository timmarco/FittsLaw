/* global ExplorableImage */
ExplorableImage.prototype.move = function(options) {

  this.image
    .transition()
    .delay(1500)
    .duration(options.duration)
    .attr("x",options.x)
    .attr("y",options.y);

  return this;
};
