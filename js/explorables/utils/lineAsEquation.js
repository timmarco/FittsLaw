/* exported lineAsEquation */
function lineAsEquation(coordinates) {
  let returnObject;

  returnObject = {};
  returnObject.slope = (coordinates.y2 - coordinates.y1) / (coordinates.x2 - coordinates.x1);
  returnObject.intercept = (coordinates.y1 - returnObject.slope * coordinates.x1);
  returnObject.function = (x) => { return returnObject.slope * x + returnObject.intercept;} ;

  if(returnObject.intercept == Infinity || returnObject.intercept == -Infinity) {
    returnObject.vertical = true;
    returnObject.xValue = coordinates.x1;
  }

  if(returnObject.slope == 0) {
    returnObject.horizontal = true;
    returnObject.yValue = coordinates.y1;
  }

  return returnObject;
}
