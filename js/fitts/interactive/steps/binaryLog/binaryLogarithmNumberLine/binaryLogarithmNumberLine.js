/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global binaryLogarithmNumberLineMouseOut */
/* global binaryLogarithmNumberLineMouseMove */
/* global binaryLogarithmNumberLineMouseOver */
/* global fittsColors */
FittsInteractive.prototype.fittsStepBinaryLogarithmNumberLine = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepBinaryLogarithmNumberLine",
    "trigger":"fittsStepBinaryLogarithmNumberLine",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {
    interactive
      .showLayer("logarithmNumberLine");

    interactive
      .removeMouseEvents();

    interactive
      .tooltip
      .hide(125);

    interactive.logarithmNumberLinePlot
      .transitionIn(500);

    //TODO: SHOULD NOT HAVE TO CALL SHOW _AND_ TRANSITIONIN FOR LINE HIGHLIGHTS
    interactive.numberLineInteractiveHighlight
      .show()
      .transitionIn(1000,1000);


    interactive.caption
      .html("You can visualize <span style='font-weight:bold; color:"+fittsColors().logarithm+"'>log<sub>2</sub></span> as two number lines.");

    interactive.indicator
      .update("<strong>Interactive</strong>: Try moving your cursor around on the chart  to see how the <strong>Input Value</strong> changes the <strong>Output Value</strong>.")
      .show()
      .emphasize();

    interactive.hotspot
      .on('mouseover',binaryLogarithmNumberLineMouseOver(interactive))
      .on('mouseout',binaryLogarithmNumberLineMouseOut(interactive))
      .on('mousemove',binaryLogarithmNumberLineMouseMove(interactive));


  }

  function transitionOut() {

    interactive.numberLineInteractiveHighlight
      .hide();

    interactive.logarithmNumberLinePlot.grid
      .killTransition();

    interactive.logarithmNumberLinePlot.inputAxis
      .killTransition();

    interactive.logarithmNumberLinePlot.outputAxis
      .killTransition();

    interactive.indicator
      .hide();

  }
};
