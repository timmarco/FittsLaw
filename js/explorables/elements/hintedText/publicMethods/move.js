/* global ExplorableHintedText */
ExplorableHintedText.prototype.move = function(newCoordinates) {

  this.coordinates = newCoordinates;
  this.group
    .attr("transform","translate("+this.coordinates.x+","+this.coordinates.y+")");

  return this;
};
