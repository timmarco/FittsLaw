/* global FittsInteractive */
FittsInteractive.prototype.removeMouseEvents = function() {

  this.hotspot
    .on('mouseover',null)
    .on('mouseout',null)
    .on('mousemove',null)
    .on('mouseenter',null)
    .on('mouseleave',null);

  return this;
};
