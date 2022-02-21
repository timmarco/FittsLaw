/* global FittsInteractive */
FittsInteractive.prototype.rescale = function() {
  let actualWidth,
    idealWidth,
    scale;

  actualWidth = this.svg
    .attr("width");

  idealWidth = 800;

  scale = actualWidth / idealWidth;

  this.rootNode
    .attr("transform","scale("+scale+")");


  return this;
};
