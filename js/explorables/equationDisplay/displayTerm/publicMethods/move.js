/* global EquationDisplayTerm */
EquationDisplayTerm.prototype.move = function(newCoordinates) {

  this.coordinates = newCoordinates;
  this.outerGroup
    .attr("transform","translate("+this.coordinates.x+","+this.coordinates.y+")");

  return this;
};
