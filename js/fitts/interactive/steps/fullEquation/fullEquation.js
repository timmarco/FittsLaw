/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global fittsFullEquationMouseOut */
/* global fittsFullEquationMouseOver */
/* global fittsFullEquationMouseMove */
/* global fullEquationCalculationDisplay */
/* global fittsColors */

FittsInteractive.prototype.fittsStepFullEquation = function() {
  const interactive = this;

  let equationCalculation;

  return new ExplorableScrollStep({
    "name":"fittsStepFullEquation",
    "trigger":"fittsStepFullEquation",
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

    equationCalculation = fullEquationCalculationDisplay(interactive);

    equationCalculation
      .update({
        "distance":fittsResults.distance.toFixed(0),
        "width":fittsResults.width.toFixed(0),
        "ratio":(fittsResults.distance.toFixed(0) / fittsResults.width.toFixed(0)).toFixed(2),
        "ratioPlusOne":(1 + fittsResults.distance.toFixed(0) / fittsResults.width.toFixed(0)).toFixed(2),
        "indexOfDifficulty":fittsResults.indexOfDifficulty.toFixed(2)
      });

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
        })
        .show()
        .attr("stroke-dasharray","1,0")
        .attr("stroke-width",5);



    interactive.hotspot
      .on('mouseover',fittsFullEquationMouseOver(interactive))
      .on('mouseout',fittsFullEquationMouseOut(interactive))
      .on('mousemove',fittsFullEquationMouseMove(interactive,equationCalculation));

    interactive.caption
      .html("Fitts' Law provides the <span style='font-weight:bold; color:"+fittsColors().indexOfDifficulty+"'>Index of Difficulty</span> for a <span style='font-weight:bold; color:black; background-color:"+fittsColors().target+"'>target</span> given an <span style='font-weight:bold; color:"+fittsColors().pointer+"'>initial pointer position</span>.");

    interactive.indicator
      .update("<strong>Interactive</strong> Move your cursor around to see the full calculation for Fitts' Law.")
      .show()
      .emphasize();

    interactive.cursor
      .show()
      .hideText()
      .showCircle();

    interactive.distanceLine
      .show();

    interactive.widthLine
      .show();

    interactive.base
      .desaturated();


  }

  function transitionOut() {

    interactive.distanceLine
      .hide();

    interactive.widthLine
      .hide();

    interactive.cursor
      .hide();

    interactive.tooltip
      .hide();

    interactive.indicator
      .hide();

  }


};
