/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global ratioCalculationDisplay */
/* global fittsRatioMouseOver */
/* global fittsRatioMouseOut */
/* global fittsRatioMouseMove */
/* global fittsColors */

FittsInteractive.prototype.fittsStepRatio = function() {
  const interactive = this;

  let ratioCalculation;

  return new ExplorableScrollStep({
    "name":"fittsStepRatio",
    "trigger":"fittsStepRatio",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {
    let fittsResults;

    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.cursor
      .reset();

    fittsResults = interactive.calculations
      .calculateFittsLaw(interactive.target,interactive.cursor);

    ratioCalculation = ratioCalculationDisplay(interactive);

    ratioCalculation
      .update({
        "distance":fittsResults.distance.toFixed(0),
        "width":fittsResults.width.toFixed(0),
        "ratio":(fittsResults.distance.toFixed(0) / fittsResults.width.toFixed(0)).toFixed(2)
      });

    interactive.caption
      .html("The <span style='font-weight:bold;color:"+fittsColors().ratio+"'>Ratio</span> between the <span style='font-weight:bold;color:"+fittsColors().distance+"'>Distance</span> and the <span style='font-weight:bold;color:"+fittsColors().width+"'>Width</span> determines the results of Fitts' Equation.");

    interactive.indicator
      .update("<strong>Interactive</strong>: Try moving your cursor around on the image to see how the <strong>Ratio</strong> changes based on the Initial Position.")
      .show()
      .emphasize();

    interactive.hotspot
      .on('mouseover',fittsRatioMouseOver(interactive))
      .on('mouseout',fittsRatioMouseOut(interactive))
      .on('mousemove',fittsRatioMouseMove(interactive,ratioCalculation));

    interactive.cursor
      .show()
      .hideText()
      .showCircle();

    interactive.widthLine
      .show()
      .attr("stroke-width",5);

    interactive.base
      .desaturated();

    interactive.distanceLine
      .show()
      .attr("stroke-dasharray","1,0")
      .attr("stroke-width",5);

  }

  function transitionOut() {

    interactive.distanceLine
      .hide();

    interactive.widthLine
      .hide();

    interactive.tooltip
      .hide();

    interactive.cursor
      .hideCircle();

    interactive.indicator
      .hide();

  }

};
