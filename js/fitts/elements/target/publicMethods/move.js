/* global FittsTarget */
FittsTarget.prototype.move = function(newCoordinates) {
  const target = this;

  target.coordinates = newCoordinates;

  target.indicator
    .attr("x",target.coordinates.x)
    .attr("y",target.coordinates.y);

  return target;
};
