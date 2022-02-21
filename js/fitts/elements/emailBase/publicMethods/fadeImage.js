/* global FittsEmailBase */
FittsEmailBase.prototype.fadeImage = function(opacity,duration) {

  this.appImage.image
    .transition()
    .duration(duration)
    .attr("opacity",opacity);

  return this;
};
