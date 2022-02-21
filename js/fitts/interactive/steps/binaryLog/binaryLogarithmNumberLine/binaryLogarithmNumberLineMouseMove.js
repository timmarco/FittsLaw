/* exported binaryLogarithmNumberLineMouseMove */
/* global d3 */
function binaryLogarithmNumberLineMouseMove(interactive) {
  return () => {
    let transformedXCoordinate,
      transformedYCoordinate,
      valuesAtCoordinates;

    interactive.indicator
      .deEmphasize();

    transformedXCoordinate = d3.event.offsetX / interactive.getCurrentScale();
    transformedYCoordinate = d3.event.offsetY / interactive.getCurrentScale();

    valuesAtCoordinates = interactive.logarithmNumberLinePlot
      .valuesAtMouseCoordinates({
        "x":transformedXCoordinate,
        "y":transformedYCoordinate
      });

    interactive.numberLineInteractiveHighlight
      .update(valuesAtCoordinates.x);

  };
}
