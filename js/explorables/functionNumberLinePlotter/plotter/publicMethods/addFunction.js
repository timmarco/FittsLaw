/* global FunctionNumberLinePlotter */
FunctionNumberLinePlotter.prototype.addFunction = function(functionToAdd) {
  let plotter = this;

  plotter.functionToPlot = functionToAdd;

  return plotter;
};
