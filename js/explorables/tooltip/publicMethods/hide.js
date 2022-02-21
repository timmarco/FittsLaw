/* global ExplorableTooltip */
ExplorableTooltip.prototype.hide = function() {

  this.foreignObject
    .attr("display","none");

  return this;
};
