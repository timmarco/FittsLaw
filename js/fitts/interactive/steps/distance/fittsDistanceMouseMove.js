/* exported fittsDistanceMouseMove */
/* global d3 */
/* global fittsColors */
function fittsDistanceMouseMove(interactive,distanceCalculation) {
  return () => {

    let colors,
      coordinates,
      fittsResults,
      roundedDistance,
      scale;

    interactive.indicator
      .deEmphasize();

    interactive.distanceText
      .killPulse();


    interactive.tooltip
      .show();

    colors = fittsColors();

    fittsResults = interactive.calculations
      .calculateFittsLaw(interactive.target,interactive.cursor);

    //TODO: FIGURE OUT WHAT'S UP HERE
    if(fittsResults) {

      roundedDistance = fittsResults.distance.toFixed(0);


      interactive.equations.distance
        .updateDistance(roundedDistance);

      distanceCalculation
        .update({
          "distance":roundedDistance,
        });
    }

    scale = interactive
      .getCurrentScale();

    coordinates = {
      "x":(1 / scale) * d3.event.offsetX,
      "y":(1 / scale) * d3.event.offsetY
    };

    interactive.tooltip
      .move({
        "x":coordinates.x,
        "y":coordinates.y + 20
      });

    interactive.cursor
      .move({
        "x":coordinates.x,
        "y":coordinates.y
      });

    // TODO: UPDATE DISTANCE TEXT
    interactive.distanceText
      .update("");

    interactive.distanceLine
      .move(
        {
          "x1":fittsResults.cursorCoordinates.x,
          "y1":fittsResults.cursorCoordinates.y,
          "x2":fittsResults.nearestIntersection.x,
          "y2":fittsResults.nearestIntersection.y
        }
      );


  };
}
