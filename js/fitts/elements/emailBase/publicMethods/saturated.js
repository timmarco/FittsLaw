/* global FittsEmailBase */
FittsEmailBase.prototype.saturated = function() {
  this.appImage
    .show();

  this.desaturatedImage
    .hide();

  return this;  
};
