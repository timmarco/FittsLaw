/* global CalculationStepContainer */
/* global CalculationStepPlot */
CalculationStepContainer.prototype.addFunctionPlot = function(options) {
  let plot;

  plot = new CalculationStepPlot(options);

  this.lines
    .push(plot);

  this
    .layout();

  return plot;

};
