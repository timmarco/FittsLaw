/* global FunctionNumberLinePlotter */
FunctionNumberLinePlotter.prototype.lineCoordinatesForValue = function(value) {
  const plotter = this;

  return {
    "x1":plotter.scale(value),
    "x2":plotter.scale(plotter.functionToPlot(value)),
    "y1":plotter.margins.top,
    "y2":plotter.height - plotter.margins.bottom
  };
};
