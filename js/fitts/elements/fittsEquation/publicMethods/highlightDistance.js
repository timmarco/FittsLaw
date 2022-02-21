/* global FittsEquation */
/* global fittsColors */
FittsEquation.prototype.highlightDistance = function() {

  this.ratio
    .highlightNumerator(fittsColors().distance);

  return this;
};
