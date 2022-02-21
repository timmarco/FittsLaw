/* global FittsEquation */
/* global fittsColors */
FittsEquation.prototype.highlightLogarithm = function() {

  this.closeParenthesis
    .changeColor(fittsColors().logarithm)
    .makeBold();

  this.logarithm
    .changeColor(fittsColors().logarithm)
    .makeBold();

  this.openParenthesis
    .changeColor(fittsColors().logarithm)
    .makeBold();

  return this;

};
