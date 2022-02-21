/* global FittsInteractivePrivateConstructor */
FittsInteractivePrivateConstructor.prototype.addLaptopClip = function() {
  let clipPath,
    constructorObject;

  constructorObject = this;

  clipPath = constructorObject.interactive.defs
    .append("clipPath")
    .attr("id","laptopTaskbarClip");

  clipPath
    .append("rect")
    .attr("width",800)
    .attr("height",50)
    .attr("y",277);

  return clipPath;
};
