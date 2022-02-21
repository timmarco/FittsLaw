/* global CalculationStepContainer */
/* global CalculationStepDivisionLine */

CalculationStepContainer.prototype.addDivisionLine = function(options) {
  let line;

  line = new CalculationStepDivisionLine(options);

  this.lines
    .push(line);

  this
    .layout();

  return line;
};
