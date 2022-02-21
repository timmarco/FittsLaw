/* global CalculationStepContainer */
/* global CalculationStepNumberLinePlot */
CalculationStepContainer.prototype.addFunctionNumberLinePlot = function(options) {
  let plot;

  plot = new CalculationStepNumberLinePlot(options);

  this.lines
    .push(plot);

  this
    .layout();

  return plot;
};
