/* global FittsEquation */
FittsEquation.prototype.updateIndexOfDifficulty = function(value) {

  this.indexOfDifficulty.text
    .embiggen(1.5)
    .update(value);

  this.equation
    .layout();

  return this;
};
