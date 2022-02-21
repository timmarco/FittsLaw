/* global FittsEquation */
/* global fittsColors */
FittsEquation.prototype.highlightWidth = function() {

  this.ratio
    .highlightDenominator(fittsColors().width);

  return this;
};
