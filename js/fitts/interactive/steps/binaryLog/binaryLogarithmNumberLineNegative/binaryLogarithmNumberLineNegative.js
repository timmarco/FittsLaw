/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global fittsColors */
FittsInteractive.prototype.fittsStepBinaryLogarithmNegative = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepBinaryLogarithmNegative",
    "trigger":"fittsStepBinaryLogarithmNegative",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("logarithmNumberLine");

    interactive
      .removeMouseEvents();

    interactive.logarithmNegativeRegion
      .show()
      .transitionIn(2250,1250,true);

    interactive.numberLineHighlightOne
      .show()
      .transitionIn(500,250);

    interactive.caption
      .html("Inputs of less than one will result in <strong>negative values</strong> for  <span style='font-weight:bold; color:"+fittsColors().logarithm+"'>log<sub>2</sub></span>.");

  }

  function transitionOut() {

    interactive.numberLineHighlightOne
      .hide();

    interactive.logarithmNegativeRegion
      .hide();

  }
};
