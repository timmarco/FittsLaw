/* global CalculationStepLinearIndicator */
CalculationStepLinearIndicator.prototype.update = function(value) {

  this.bar
    .attr("width",this.scale(value));

  this.text
    .update(value)
    .move({
      "x":this.scale(value) + 10,
      "y":0
  });

  return this;
};
