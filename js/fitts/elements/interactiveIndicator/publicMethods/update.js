/* global FittsInteractiveIndicator */
FittsInteractiveIndicator.prototype.update = function(newHtml) {

  this.div
    .html(newHtml);

  return this;
};
