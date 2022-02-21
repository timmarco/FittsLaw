/* global FunctionNumberLinePlotter */
/* global FunctionNumberLineAxis */
FunctionNumberLinePlotter.prototype.addOutputAxis = function(axisOptions) {
  const plotter = this;

  axisOptions.parent = plotter;
  axisOptions.axisLocation = "bottom";

  plotter.outputAxis = new FunctionNumberLineAxis(axisOptions);

  return plotter;

};
