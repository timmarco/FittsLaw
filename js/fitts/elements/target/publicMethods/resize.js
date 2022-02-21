/* global FittsTarget */
FittsTarget.prototype.resize = function(newDimensions) {
  const target = this;

  target.dimensions = newDimensions;

  target.indicator
    .attr("height",target.dimensions.height)
    .attr("width",target.dimensions.width);

  return target;
};
