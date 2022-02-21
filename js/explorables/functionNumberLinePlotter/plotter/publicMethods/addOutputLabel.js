/* global FunctionNumberLinePlotter */
/* global FunctionNumberLineAxisLabel */
FunctionNumberLinePlotter.prototype.addOutputLabel = function(labelOptions) {
  const plotter = this;

  labelOptions.parent = plotter;
  labelOptions.location = "bottom";

  plotter.inputLabel = new FunctionNumberLineAxisLabel(labelOptions);

  return plotter;

};
