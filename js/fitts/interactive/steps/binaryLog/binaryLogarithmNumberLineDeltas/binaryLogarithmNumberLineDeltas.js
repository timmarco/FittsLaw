/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global fittsColors */
FittsInteractive.prototype.fittsStepBinaryLogarithmNumberLineDeltas = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepBinaryLogarithmNumberLineDeltas",
    "trigger":"fittsStepBinaryLogarithmNumberLineDeltas",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("logarithmNumberLine");

    interactive
      .removeMouseEvents();

    // TODO: WHY ARE REGION AND LINE NOT WORKING PROPERLY?
    interactive.numberLineDeltaHighlights.forEach((highlightObject) => {
      highlightObject.highlight
        .show()
        .transitionIn(highlightObject.duration,highlightObject.delay);
    });

    interactive.caption
      .html("<span style='font-weight:bold; color:"+fittsColors().logarithm+"'>Log<sub>2</sub></span> is a <strong>non-linear</strong> function. Small changes to the input near zero will have a large effect on the output. Small changes to larger inputs will have a much smaller effect on the output.");

    interactive.cursor
      .hide();
  }

  function transitionOut() {

    interactive.numberLineDeltaHighlights.forEach((highlightObject) => {
      highlightObject.highlight
        .hide();
    });

  }
};
