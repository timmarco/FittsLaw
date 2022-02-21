/* global FittsInteractiveIndicator */
FittsInteractiveIndicator.prototype.emphasize = function() {
  const indicator = this;

  loop();

  function loop() {
    indicator.div
      .transition()
      .duration(1000)
      .style("opacity",1);
  }

  return this;
};
