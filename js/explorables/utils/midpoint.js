/* exported midpoint */
function midpoint(pointA,pointB) {
  if(!pointA) { return false; }
  if(!pointB) { return false; }
  
  return {
    "x":(pointA.x + pointB.x) / 2,
    "y":(pointA.y + pointB.y) / 2
  };
}
