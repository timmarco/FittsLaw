/* global CalculationStepDivisionLine */
/* global EquationDisplayTerm */
CalculationStepDivisionLine.prototype.addTextTermToLabel = function(termOptions) {
  let divisionLine,
    term;

  divisionLine = this;

  term = new EquationDisplayTerm({
    "where":divisionLine.label.innerGroup,
    "coordinates":{
      "x":0,
      "y":0
    },
    "string":termOptions.string
  });

  return divisionLine;
};
