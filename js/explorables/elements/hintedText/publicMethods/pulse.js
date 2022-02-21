/* global ExplorableHintedText */
ExplorableHintedText.prototype.pulse = function(pulseDurationIn,pulseDurationOut) {
  let text = this;

  repeatAnimation();

  function repeatAnimation() {
    text.innerGroup
      .transition()
      .duration(pulseDurationIn)
      .attr("transform","scale(1.25)")
      .transition()
      .duration(pulseDurationOut)
      .attr("transform","scale(1)")
      .on('end',repeatAnimation);
  }

  return text;
};
