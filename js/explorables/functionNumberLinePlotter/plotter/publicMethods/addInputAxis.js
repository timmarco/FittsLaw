/* global FunctionNumberLinePlotter */
/* global FunctionNumberLineAxis */
FunctionNumberLinePlotter.prototype.addInputAxis = function(axisOptions) {
  const plotter = this;

  axisOptions.parent = plotter;
  axisOptions.axisLocation = "top";

  plotter.inputAxis = new FunctionNumberLineAxis(axisOptions);

  return plotter;
};
