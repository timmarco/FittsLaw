/* global EquationDivisionTerm */
EquationDivisionTerm.prototype.highlightNumerator = function(newColor) {

  this.numeratorText
    .changeForegroundColor(newColor)
    .makeBold();

  return this;
};
