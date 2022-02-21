/* global FunctionNumberLinePlotter */
/* global FunctionNumberLineAxisLabel */
FunctionNumberLinePlotter.prototype.addInputLabel = function(labelOptions) {
  const plotter = this;

  labelOptions.parent = plotter;
  labelOptions.location = "top";

  plotter.inputLabel = new FunctionNumberLineAxisLabel(labelOptions);

  return plotter;
};
