/* global FittsCursor */
FittsCursor.prototype.hideCircle = function() {

  this.circle
    .attr("display","none");

  return this;
};
