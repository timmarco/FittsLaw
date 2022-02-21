/* global ExplorableTooltip */
ExplorableTooltip.prototype.update = function(newHtml) {

  this.divContainer
    .html(newHtml);

  return this;
};
