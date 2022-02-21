/* global FunctionPlotter */
FunctionPlotter.prototype.valuesAtMouseCoordinates = function(coordinates) {
  const plotter = this;
  let returnCoordinates;

  returnCoordinates = {};
  returnCoordinates.x = this.scales.x.invert(coordinates.x - plotter.margins.left - plotter.coordinates.x);
  returnCoordinates.y = this.scales.y.invert(coordinates.y - plotter.margins.bottom - plotter.coordinates.y);

  return returnCoordinates;
};
