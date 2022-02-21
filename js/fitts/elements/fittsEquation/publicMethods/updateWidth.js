/* global FittsEquation */

FittsEquation.prototype.updateWidth = function(newValue) {

  this.ratio.denominatorText
    .update(newValue)
    .embiggen(1.5);

  return this;
};
