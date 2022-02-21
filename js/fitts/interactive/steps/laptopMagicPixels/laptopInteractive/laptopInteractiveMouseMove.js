/* exported laptopInteractiveMouseMove */
/* global fittsColors */
/* global d3 */

function laptopInteractiveMouseMove(interactive,equationDisplay) {
  return () => {
    let coordinates,
      colors,
      fittsResults,
      roundedDistance,
      roundedIndexOfDifficulty,
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


    if(coordinates.x < 180) { coordinates.x = 180; }
    if(coordinates.x > 650) { coordinates.x = 650; }
    if(coordinates.y < 35) { coordinates.y = 35; }
    if(coordinates.y > 328) { coordinates.y = 328; }


    interactive.cursor
      .move({
        "x":coordinates.x,
        "y":coordinates.y
      });

    fittsResults = interactive.calculations
      .calculateFittsLaw(interactive.laptopBottomTarget,interactive.cursor);

    roundedDistance = fittsResults.distance.toFixed(0);
    roundedWidth = fittsResults.width.toFixed(0);
    roundedRatio = (roundedDistance / roundedWidth).toFixed(2);
    roundedIndexOfDifficulty = fittsResults.indexOfDifficulty.toFixed(2);

    equationDisplay
      .update({
        "distance":roundedDistance,
        "width":roundedWidth,
        "ratio":(roundedDistance / roundedWidth).toFixed(2),
        "ratioPlusOne":((roundedDistance / roundedWidth) + 1).toFixed(2),
        "indexOfDifficulty":roundedIndexOfDifficulty
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

    interactive.equations.fullEquation
      .updateRatio(roundedRatio)
      .updateIndexOfDifficulty(roundedIndexOfDifficulty);

  };

}
