/* global CalculationStepNumberLinePlot */
CalculationStepNumberLinePlot.prototype.update = function(value) {

  this.plot
    .update(value);

  this.highlight
    .update(value);

  return this;
};
