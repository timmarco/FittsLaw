/* global ExplorableHintedText */
ExplorableHintedText.prototype.embiggen = function(scale) {

  this.foreground
    .attr("transform","scale("+scale+")");

  this.background
    .attr("transform","scale("+scale+")");

  return this;
};
