/* global ExplorableHintedText */
ExplorableHintedText.prototype.moveX = function(newX) {

  this.coordinates.x = newX;

  this.group
    .attr("transform","translate("+this.coordinates.x+","+this.coordinates.y+")");

  return this;
};
