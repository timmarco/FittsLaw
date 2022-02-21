/* global FittsInteractive */
FittsInteractive.prototype.getCurrentScale = function() {
  let scale,
    transform;

  transform = this.rootNode
    .attr("transform");

  scale = +transform
    .replace("scale(","")
    .replace(")","");

  return scale;
};
