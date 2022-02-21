/* global FittsInteractivePrivateConstructor */
FittsInteractivePrivateConstructor.prototype.addPhoneClip = function() {
  let clipPath,
    constructorObject;

  constructorObject = this;

  clipPath = constructorObject.interactive.defs
    .append("clipPath")
    .attr("id","phoneClip");

  clipPath
    .append("rect")
    .attr("width",156)
    .attr("height",267)
    .attr("x",320)
    .attr("y",62);

  return clipPath;
};
