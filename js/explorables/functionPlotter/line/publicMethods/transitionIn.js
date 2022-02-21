/* global FunctionPlotterLine */
/* global d3 */
FunctionPlotterLine.prototype.transitionIn = function(duration) {
  const line = this;

  this.path
    .transition()
    .duration(duration)
    .attrTween("stroke-dasharray",tweenDash);

  function tweenDash() {
    let length,
      interpolator;

    length = line.path
      .node()
      .getTotalLength();

    interpolator = d3
      .interpolateString("0," + length, length + "," + length);

    return (timeStep) => {
      return interpolator(timeStep);
    };
  }
};
