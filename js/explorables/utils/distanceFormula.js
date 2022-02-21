/* exported distanceFormula */
function distanceFormula(coordinatesOne,coordinatesTwo) {
  let xComponent,
    yComponent;

  if(!coordinatesOne) { return false; }
  if(!coordinatesTwo) { return false; }
  xComponent = Math.pow(coordinatesOne.x - coordinatesTwo.x,2);
  yComponent = Math.pow(coordinatesOne.y - coordinatesTwo.y,2);
  return Math.pow(xComponent + yComponent,0.5);
}
