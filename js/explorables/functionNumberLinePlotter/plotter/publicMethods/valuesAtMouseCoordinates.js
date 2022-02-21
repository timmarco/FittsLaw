/* global FunctionNumberLinePlotter */
FunctionNumberLinePlotter.prototype.valuesAtMouseCoordinates = function(coordinates) {
  const plotter = this;
  let returnCoordinates;

  returnCoordinates = {};
  returnCoordinates.x = plotter.scale.invert(coordinates.x - plotter.coordinates.x);

  return returnCoordinates;
};
