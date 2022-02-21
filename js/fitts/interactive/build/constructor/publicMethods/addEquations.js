/* global FittsInteractivePrivateConstructor */
/* global FittsEquation */
FittsInteractivePrivateConstructor.prototype.addEquations = function() {
  let constructorObject,
    equations;

  constructorObject = this;

  equations = {};

  equations.initial = new FittsEquation({
    "where":"#fittsEquation"
  });

  equations.indexOfDifficulty = new FittsEquation({
    "where":"#fittsEquationIndexOfDifficulty"
  }).highlightIndexOfDifficulty()
  .layout();

  equations.distance = new FittsEquation({
    "where":"#fittsEquationDistance"
  }).updateDistance("Distance")
  .highlightDistance()
  .layout();

  equations.width = new FittsEquation({
    "where":"#fittsEquationWidth"
  }).updateWidth("Width")
  .highlightWidth()
  .layout();

  equations.ratio = new FittsEquation({
    "where":"#fittsEquationRatio"
  }).highlightWidth()
  .highlightDistance()
  .layout();

  equations.logarithn = new FittsEquation({
    "where":"#fittsEquationLogarithm"
  }).highlightLogarithm()
  .layout();

  equations.plusOne = new FittsEquation({
    "where":"#fittsEquationPlusOne"
  }).highlightLogarithm()
    .highlightPlusOne()
    .layout();

  equations.fullEquation = new FittsEquation({
    "where":"#fittsFullEquation"
  }).highlightIndexOfDifficulty()
  .highlightLogarithm()
  .layout();


  return equations;
};
