/* global FittsEquation */
/* global fittsColors */
FittsEquation.prototype.highlightIndexOfDifficulty = function() {

  this.indexOfDifficulty
    .changeColor(fittsColors().indexOfDifficulty,500)
    .makeBold();

  return this;
};
