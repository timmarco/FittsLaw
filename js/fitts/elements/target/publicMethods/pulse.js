/* global FittsTarget */
FittsTarget.prototype.pulse = function(outDuration = 375,inDuration = 750) {
  const target = this;

  repeatAnimation();

  function repeatAnimation() {
    target.indicator
      .transition()
      .duration(outDuration)
      .attr("opacity",0.75)
      .transition()
      .duration(inDuration)
      .attr("opacity",0)
      .on('end',repeatAnimation);
  }

  return target;
};
