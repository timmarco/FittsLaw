/* exported fittsRatioMouseMove */
/* global d3 */
/* global fittsColors */

function fittsRatioMouseMove(interactive,ratioCalculation) {
  return () => {
    let coordinates,
      colors,
      fittsResults,
      roundedDistance,
      roundedRatio,
      roundedWidth,
      scale;

    interactive.indicator
      .deEmphasize();

    colors = fittsColors();

    scale = interactive
      .getCurrentScale();

    coordinates = {
      "x":(1 / scale) * d3.event.offsetX,
      "y":(1 / scale) * d3.event.offsetY
    };

    interactive.cursor
      .move({
        "x":coordinates.x,
        "y":coordinates.y
      });

    fittsResults = interactive.calculations
      .calculateFittsLaw(interactive.target,interactive.cursor);

    roundedDistance = fittsResults.distance.toFixed(0);
    roundedWidth = fittsResults.width.toFixed(0);
    roundedRatio = (roundedDistance / roundedWidth).toFixed(2);
    ratioCalculation
      .update({
        "distance":roundedDistance,
        "width":roundedWidth,
        "ratio":roundedRatio
      });

    interactive.tooltip
      .move({
        "x":coordinates.x,
        "y":coordinates.y + 20
      })
      .show();

    interactive.distanceText
      .update("");

    interactive.widthText
      .update("");

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

    interactive.equations.ratio
      .updateRatio(roundedRatio);

  };
}
