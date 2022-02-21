/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global binaryLogarithmMouseOut */
/* global binaryLogarithmMouseMove */
/* global binaryLogarithmMouseOver */
/* global fittsColors */
FittsInteractive.prototype.fittsStepBinaryLogarithm = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepBinaryLogarithm",
    "trigger":"fittsStepBinaryLogarithm",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("logarithm");

    interactive
      .removeMouseEvents();

    interactive.logarithmicPlot
      .transitionIn(2000);

    interactive.hotspot
      .on('mouseover',binaryLogarithmMouseOver(interactive))
      .on('mouseout',binaryLogarithmMouseOut(interactive))
      .on('mousemove',binaryLogarithmMouseMove(interactive));

    interactive.caption
      .html("The <span style='font-weight:bold; color:"+fittsColors().logarithm+"'>binary logarithm</span> is a specific <em>mathematical function</em>.");

    interactive.indicator
      .update("<strong>Interactive</strong>: Move your mouse around the function to see how the <strong>input</strong> affects the <strong>output</strong>.")
      .show()
      .emphasize();

    interactive.cursor
      .hide();

  }

  function transitionOut() {

    interactive.indicator
      .hide();

  }
};
