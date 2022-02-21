/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global fittsDistanceMouseOut */
/* global fittsDistanceMouseOver */
/* global fittsDistanceMouseMove */
/* global distanceCalculationDisplay */
/* global fittsColors */

FittsInteractive.prototype.fittsStepDistance = function() {
  const interactive = this;

  return new ExplorableScrollStep({
    "name":"fittsStepDistance",
    "trigger":"fittsStepDistance",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {
    let distanceCalculation,
      fittsResults;

    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();


    interactive.cursor
      .reset()
      .show()
      .hideText()
      .showCircle();

    fittsResults = interactive.calculations
      .calculateFittsLaw(interactive.target,interactive.cursor);

    interactive.distanceText
      .update("Distance")
      .move(fittsResults.distanceMidpoint)
      .show(250)
      .pulse(1000,1000);

    interactive.distanceLine
      .move({
        "x1":fittsResults.cursorCoordinates.x,
        "y1":fittsResults.cursorCoordinates.y,
        "x2":fittsResults.nearestIntersection.x,
        "y2":fittsResults.nearestIntersection.y
      })
      .show(250)
      .attr("stroke-dasharray","1,0")
      .attr("stroke-width",5);

    distanceCalculation = distanceCalculationDisplay(interactive);

    distanceCalculation
      .update(fittsResults);

    interactive.hotspot
      .on('mouseover',fittsDistanceMouseOver(interactive))
      .on('mouseout',fittsDistanceMouseOut(interactive))
      .on('mousemove',fittsDistanceMouseMove(interactive,distanceCalculation));

    interactive.caption
      .html("The <span style='font-weight:bold;color:"+fittsColors().distance+"'>Distance</span> is measured from where the pointer starts the action to the edge of the <span style='font-weight:bold;color:black;background-color:"+fittsColors().target+"'>target</span>.");

    interactive.base
      .desaturated();

    interactive.indicator
      .update("<strong>Interactive</strong>: Try moving your cursor around on the image to see how the <strong>Distance</strong> changes based on the Initial Position.")
      .show()
      .emphasize();

  }

  function transitionOut() {

    interactive.distanceText
      .hide(125)
      .killPulse();

    interactive.cursor
      .hideCircle();

    interactive.distanceLine
      .attr("stroke-width",0);

    interactive.indicator
      .hide();

  }





};
