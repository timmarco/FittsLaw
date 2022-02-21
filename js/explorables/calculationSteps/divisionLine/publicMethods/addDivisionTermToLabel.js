/* global CalculationStepDivisionLine */
/* global EquationDivisionTerm */
CalculationStepDivisionLine.prototype.addDivisionTermToLabel = function(termOptions) {
  let divisionLine = this,
    term;

  term = new EquationDivisionTerm({
    "where":divisionLine.label.innerGroup,
    "coordinates":{
      "x":0,
      "y":0
    },
    "anchorHorizontal":"end"
  })
  .denominator({
    "string":termOptions.labels.denominator,
    "fontSize":divisionLine.fontSize,
    "fontWeight":"bold",
    "color":termOptions.colors.denominator
  })
  .numerator({
    "string":termOptions.labels.numerator,
    "fontSize":divisionLine.fontSize,
    "fontWeight":"bold",
    "color":termOptions.colors.numerator
  })
  .layout();

  divisionLine.label
    .addTerm(term);

  return divisionLine;
};
