/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global laptopInteractiveMouseOver */
/* global laptopInteractiveMouseOut */
/* global laptopInteractiveMouseMove */
/* global laptopInteractiveCalculationDisplay */
/* global fittsColors */
FittsInteractive.prototype.fittsStepLaptopInteractive = function() {

  const interactive = this;

  let equationCalculation,
    fittsResults;

  return new ExplorableScrollStep({
    "name":"fittsStepLaptopInteractive",
    "trigger":"fittsStepLaptopInteractive",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("");

    interactive.emailZoom
      .transition()
      .duration(0)
      .attr("transform","translate(300,75) scale(0.33)");

    // interactive.saturationFilter
      // .attr("values","1");

      interactive.cursor
        .move({
          "x":525,
          "y":150
        })
        .hideText()
        .show();


    fittsResults = interactive.calculations
      .calculateFittsLaw(interactive.laptopBottomTarget,interactive.cursor);

    equationCalculation = laptopInteractiveCalculationDisplay(interactive);

    interactive.widthLine
      .move({
        "x1":fittsResults.intersections[0].x,
        "y1":fittsResults.intersections[0].y,
        "x2":fittsResults.intersections[1].x,
        "y2":fittsResults.intersections[1].y
      });

    interactive.distanceLine
      .move({
        "x1":fittsResults.cursorCoordinates.x,
        "y1":fittsResults.cursorCoordinates.y,
        "x2":fittsResults.targetCentroid.x,
        "y2":fittsResults.targetCentroid.y
      });

    interactive.distanceLine
      .show();

    interactive.laptopBottomTarget
      .show();

    interactive.widthLine
      .show();


    interactive.hotspot
      .on('mouseover',laptopInteractiveMouseOver(interactive))
      .on('mouseout',laptopInteractiveMouseOut(interactive))
      .on('mousemove',laptopInteractiveMouseMove(interactive,equationCalculation));

    interactive.caption
      .html("The <span style='font-weight:bold; color:"+fittsColors().indexOfDifficulty+"'>Index of Difficulty</span> for targets on the edges is very low, regardless of the <span style='font-weight:bold; color:"+fittsColors().pointer+"'>initial pointer position</span>.");

    interactive.indicator
      .update("<strong>Interactive</strong> Move your cursor around to see the full calculation for Fitts' Law.")
      .show()
      .emphasize();

    interactive.laptop
      .show();

  }

  function transitionOut() {

    interactive.laptopBottomTarget
      .hide();

    interactive.laptopTopTarget
      .hide();

    interactive.distanceLine
      .hide();

    interactive.laptopBottomTarget
      .hide();

    interactive.tooltip
      .hide();

    interactive.widthLine
      .hide();

    interactive.emailZoom
      .transition()
      .duration(500)
      .attr("transform","scale(1)");

    interactive.indicator
      .hide();

  }
};
