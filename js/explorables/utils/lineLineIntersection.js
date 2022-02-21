/* exported lineLineIntersectionCoordinates */
function lineLineIntersectionCoordinates(lineOneCoefficients,lineTwoCoefficients) {
  let coordinates;

  coordinates = {};

    coordinates.x = (lineTwoCoefficients.intercept-lineOneCoefficients.intercept) /
      (lineOneCoefficients.slope-lineTwoCoefficients.slope);

    coordinates.y = -(
      lineOneCoefficients.slope *
        ((lineTwoCoefficients.intercept-lineOneCoefficients.intercept) / (lineOneCoefficients.slope-lineTwoCoefficients.slope)) +
        lineOneCoefficients.intercept
    );

    if(lineOneCoefficients.slope == lineTwoCoefficients.slope) {
      // Handle Parallel!
    }

    if(lineOneCoefficients.vertical) {
      coordinates.x = lineOneCoefficients.xValue;
      coordinates.y = lineTwoCoefficients.slope * coordinates.x + lineTwoCoefficients.intercept;
    }


    if(lineOneCoefficients.horizontal) {
      coordinates.y *= -1;
    }
    return coordinates;
}
