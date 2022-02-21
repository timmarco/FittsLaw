/* global FittsCursor */
FittsCursor.prototype.embiggen = function(scale) {

  this.image.image
    .attr("transform","scale("+scale+")");

  return this;
};
