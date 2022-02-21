/* global FittsCursor */
FittsCursor.prototype.move  = function(newCoordinates) {

  this.coordinates = newCoordinates;

  this.group
    .transition()
    .duration(0)
    .attr("transform","translate("+this.coordinates.x+","+this.coordinates.y+")");

  return this;
};
