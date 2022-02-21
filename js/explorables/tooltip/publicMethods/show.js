/* global ExplorableTooltip */
ExplorableTooltip.prototype.show = function() {

  this.foreignObject
    .attr("display","block");

  return this;
};
