/* global FittsExampleTargets */
FittsExampleTargets.prototype.pulse = function() {
  let parent = this;

  parent.pulsing = true;

  repeatAnimation();

  function repeatAnimation() {

    if(parent.pulsing) {
      parent.group
        .transition()
        .duration(1000)
        .attr("opacity",1)
        .transition()
        .duration(625)
        .attr("opacity",0)
        .on('end',repeatAnimation);
    }
  }
};
