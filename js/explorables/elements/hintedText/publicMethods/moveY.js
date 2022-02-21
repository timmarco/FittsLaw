/* global ExplorableHintedText */
ExplorableHintedText.prototype.moveY = function(newY) {

  this.coordinates.y = newY;

  this.group
    .attr("transform","translate("+this.coordinates.x+","+this.coordinates.y+")");

  return this;
};
