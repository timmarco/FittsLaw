/* global CalculationStepPlot */
CalculationStepPlot.prototype.update = function(value) {

  this.plot
    .highlightValue(value);

  return this;
};
