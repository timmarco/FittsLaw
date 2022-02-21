/* global CalculationStepDivisionLine */
CalculationStepDivisionLine.prototype.update = function(value) {

    this.label
      .layout();

    this.bar
      .update(value);


    return this;
  };
