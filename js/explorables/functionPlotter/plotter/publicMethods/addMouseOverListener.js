/* global FunctionPlotter */
FunctionPlotter.prototype.addMouseOverListener = function(callback) {

  this.hotspot
    .on('mouseover',callback);

  return this;
};
