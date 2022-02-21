/* global EquationDivisionTerm */
EquationDivisionTerm.prototype.highlightDenominator = function(newColor) {

  this.denominatorText
    .changeForegroundColor(newColor)
    .makeBold();

  return this;
};
