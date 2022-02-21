/* global ExplorableTooltip */
ExplorableTooltip.prototype.changeHeight = function(newHeight) {

  this.foreignObject
    .attr("height",newHeight);

  return this;
};
