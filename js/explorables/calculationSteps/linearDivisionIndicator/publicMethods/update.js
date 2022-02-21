/* global CalculationStepLinearDivisionIndicator */
CalculationStepLinearDivisionIndicator.prototype.update = function(value) {

  let indicator = this;

  indicator.numerator
    .attr("d",indicator.numeratorPathGenerator(indicator.scale(value)));

  indicator.denominator
    .attr("d",indicator.denominatorPathGenerator(indicator.scale(value)));

  indicator.text
    .move({
      "x":indicator.scale(value) + 20,
      "y":0
    })
    .update(value);

  return indicator;
};
