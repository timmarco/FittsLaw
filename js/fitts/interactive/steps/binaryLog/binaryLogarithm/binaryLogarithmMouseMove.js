/* exported binaryLogarithmMouseMove */
/* global d3 */
function binaryLogarithmMouseMove(interactive) {
  return () => {
    let inputValue,
      outputValue,
      transformedXCoordinate,
      transformedYCoordinate,
      valuesAtCoordinates;

    interactive.indicator
      .deEmphasize();

    transformedXCoordinate = d3.event.offsetX / interactive.getCurrentScale();
    transformedYCoordinate = d3.event.offsetY / interactive.getCurrentScale();

    valuesAtCoordinates = interactive.logarithmicPlot
      .valuesAtMouseCoordinates(
        {
          "x":transformedXCoordinate,
          "y":transformedYCoordinate
        }
      );

    if(!isNaN(interactive.logarithmicPlot.lines[0].functionToPlot(valuesAtCoordinates.x))) {
      inputValue = "Input : " + valuesAtCoordinates.x
        .toFixed(2);

      if(valuesAtCoordinates.x <= 10) {
        interactive.logarithmicPlot.axisTitles.x
          .update(inputValue);

        outputValue = "Output: " + interactive.logarithmicPlot.lines[0]
          .functionToPlot(valuesAtCoordinates.x)
          .toFixed(2);

        interactive.logarithmicPlot.axisTitles.y
          .update(outputValue);

      }


    }


    interactive.logarithmicPlot.lines
      .forEach((line) => {
        line
          .highlightValue(valuesAtCoordinates.x);
      });

  };
}
