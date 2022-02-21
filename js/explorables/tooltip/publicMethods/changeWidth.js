/* global ExplorableTooltip */
ExplorableTooltip.prototype.changeWidth = function(newWidth) {

  this.foreignObject
    .attr("width",newWidth);

  return this;
};
