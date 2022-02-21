/* global FittsCursor */
FittsCursor.prototype.attr = function(key,value) {

  this.image
    .attr(key,value);

  return this;
};
