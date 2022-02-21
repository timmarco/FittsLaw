/* global FittsEquation */

FittsEquation.prototype.updateDistance = function(newValue) {

  this.ratio.numeratorText
    .update(newValue)
    .embiggen(1.5);

  return this;
};
