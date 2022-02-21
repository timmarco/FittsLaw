/* global CalculationStepContainer */
/* global CalculationStepLine */
CalculationStepContainer.prototype.addLine = function(options) {
  let line;

  line = new CalculationStepLine(options);

  this.lines
    .push(line);

  this
    .layout();

  return line;
};
