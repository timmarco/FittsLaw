/*jshint esversion:6 */
function fittsCalculations() {
  return {
    calculateFittsLaw:calculateFittsLaw
  };

  /* PUBLIC METHODS */
  function calculateFittsLaw(target,cursor) {
    let candidateDistances,
      cursorCoordinates,
      distance,
      distanceMidpoint,
      indexOfDifficulty,
      intersections,
      nearestIntersection,
      returnObject,
      width;

    cursorCoordinates = cursor
      .getCoordinates();

    intersections = getIntersection(cursorCoordinates,target);

    candidateDistances = [];
    intersections.forEach((intersection) => {
      candidateDistances.push(distanceFormula(cursorCoordinates,intersection));
    });

    // TODO: INVESTIGATE WHAT'S GOING ON HERE!
    if(intersections[0],intersections[1]) {
      width = distanceFormula(intersections[0],intersections[1]);
      distance = d3.min(candidateDistances);
      nearestIntersectionIndex = candidateDistances.indexOf(distance);

      indexOfDifficulty = Math.log2((1 + distance / width));

      distanceMidpoint = midpoint(cursorCoordinates,intersections[nearestIntersectionIndex]);

      nearestIntersection = intersections[nearestIntersectionIndex];


      returnObject = {
        "distance":distance,
        "width":width,
        "indexOfDifficulty":indexOfDifficulty,
        "distanceMidpoint":distanceMidpoint,
        "cursorCoordinates":cursorCoordinates,
        "targetCentroid":target.centroid(),
        "intersections":intersections,
        "nearestIntersection":nearestIntersection
      };

      return returnObject;
    } else {

      return false;
    }

  }

  /* PRIVATE METHODS */
  function getIntersection(cursorCoordinates,target) {
    let equationFromCursor,
      intersections,
      lineFromCursor;


    lineFromCursor = {
      "x1":cursorCoordinates.x,
      "y1":cursorCoordinates.y,
      "x2":target.centroid().x,
      "y2":target.centroid().y
    };

    equationFromCursor = lineAsEquation(lineFromCursor);
    // TODO: EXPOSING INDICATOR IS LAZY. FIX THIS!
    intersections = lineRectangleIntersection(equationFromCursor,target.indicator);

    return intersections;
  }


}
