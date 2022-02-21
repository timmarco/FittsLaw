/* global FunctionPlotter */
FunctionPlotter.prototype.addMouseOutListener = function(callback) {

  this.hotspot
    .on('mouseout',callback);

  return this;
};
