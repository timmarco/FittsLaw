/* global FunctionPlotter */
FunctionPlotter.prototype.addMouseMoveListener = function(callback) {

  this.hotspot
    .on('mousemove',callback);


  return this;
};
