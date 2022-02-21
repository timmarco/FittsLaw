/* global CalculationStepLine */
CalculationStepLine.prototype.update = function(value) {

  this.bar
    .update(value);

  return this;
};
