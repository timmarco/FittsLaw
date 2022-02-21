/* global FittsInteractivePrivateConstructor */
FittsInteractivePrivateConstructor.prototype.addHotspot = function() {
  let constructorObject,
    hotspot;

  constructorObject = this;

  hotspot = constructorObject.interactive.rootLayers.hotspot
    .append("rect")
    .attr("x",0)
    .attr("y",0)
    .attr("width",800)
    .attr("height",400)
    .attr("fill","rgba(0,0,0,0)");

  return hotspot;
};
