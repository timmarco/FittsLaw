/* exported fittsWidthMouseMove */
/* global fittsColors */
/* global d3 */
function fittsWidthMouseMove(interactive,widthCalculation) {
  return () => {

    let coordinates,
      colors,
      fittsResults,
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

    interactive.widthText
      .killPulse();

    interactive.cursor
      .move({
        "x":coordinates.x,
        "y":coordinates.y
      });

    fittsResults = interactive.calculations
      .calculateFittsLaw(interactive.target,interactive.cursor);

    roundedWidth = fittsResults.width.toFixed(0);

    interactive.equations.width
      .updateWidth(roundedWidth);

    interactive.tooltip
      .move({
        "x":coordinates.x,
        "y":coordinates.y + 20
      })
      .show();

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

    widthCalculation
      .update({
        "width":fittsResults.width.toFixed(0),
      });



  };
}
