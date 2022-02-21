/* global FittsCircleTarget */
FittsCircleTarget.prototype.pulse = function() {
  const target = this;

  repeatAnimation();

  return target;

  function repeatAnimation() {

    target.group
      .transition()
      .duration(750)
      .attr("opacity",0.75)
      .transition()
      .duration(1125)
      .attr("opacity",0)
      .on('end',repeatAnimation);

  }

};
