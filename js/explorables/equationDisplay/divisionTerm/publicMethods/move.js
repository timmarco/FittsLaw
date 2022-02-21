/* global EquationDivisionTerm */
EquationDivisionTerm.prototype.move = function(newCoordinates) {

  let term = this;

  if(newCoordinates) { term.coordinates = newCoordinates; }

  term.group
    .attr("transform","translate("+term.coordinates.x+","+term.coordinates.y+")");

  return term;
};
