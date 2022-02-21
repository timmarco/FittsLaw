/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global widthCalculationDisplay */
/* global fittsWidthMouseOut */
/* global fittsWidthMouseMove */
/* global fittsWidthMouseOver */
/* global fittsColors */

FittsInteractive.prototype.fittsStepWidth = function() {
  const interactive = this;

  return new ExplorableScrollStep({
    "name":"fittsStepWidth",
    "trigger":"fittsStepWidth",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {
    let fittsResults,
      widthCalculation;

    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.distanceLine
      .show(250)
      .attr("stroke-dasharray","10,5")
      .attr("stroke-width",1);

    interactive.widthLine
      .show(250);

    interactive.widthText
      .show(250)
      .pulse(750,625);

    fittsResults = interactive.calculations
      .calculateFittsLaw(interactive.target,interactive.cursor);

    widthCalculation = widthCalculationDisplay(interactive);

    widthCalculation
      .update({
        "width":fittsResults.width.toFixed(0)
      });

    interactive.widthLine
      .move({
        "x1":fittsResults.intersections[0].x,
        "y1":fittsResults.intersections[0].y,
        "x2":fittsResults.intersections[1].x,
        "y2":fittsResults.intersections[1].y
      });

    interactive.widthText
      .update("Width")
      .move({
        "x":fittsResults.targetCentroid.x,
        "y":fittsResults.targetCentroid.y
      });

    interactive.hotspot
      .on('mouseover',fittsWidthMouseOver(interactive))
      .on('mouseout',fittsWidthMouseOut(interactive))
      .on('mousemove',fittsWidthMouseMove(interactive,widthCalculation));

    interactive.cursor
      .showCircle();

    interactive.caption
      .html("The <span style='font-weight:bold; color:"+fittsColors().width+"'>Width</span> is measured by how large the target is <em>relative to the axis of motion</em>.");

    interactive.indicator
      .update("<strong>Interactive</strong>: Try moving your cursor around on the image to see how the <strong>Width</strong> changes based on the Initial Position.")
      .show()
      .emphasize();

    interactive.widthLine
      .attr("stroke-width",5);

    interactive.base
      .desaturated();

  }

  function transitionOut() {

    interactive.widthText
      .hide(125)
      .killPulse();

    interactive.cursor
      .hideCircle();

    interactive.widthLine
      .attr("stroke-width",0);

    interactive.indicator
      .hide();
  }

};
