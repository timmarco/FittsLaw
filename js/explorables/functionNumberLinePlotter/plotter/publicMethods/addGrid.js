/* global FunctionNumberLinePlotter */
/* global FunctionNumberLineGrid */
FunctionNumberLinePlotter.prototype.addGrid = function(gridOptions) {
  let plotter = this;

  gridOptions.parent = plotter;
  plotter.grid = new FunctionNumberLineGrid(gridOptions);

  return plotter;
};
