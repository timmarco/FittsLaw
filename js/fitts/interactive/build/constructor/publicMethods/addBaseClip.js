/* global FittsInteractivePrivateConstructor */

FittsInteractivePrivateConstructor.prototype.addBaseClip = function() {
    let clipPath,
      constructorObject;

    constructorObject = this;

    clipPath = constructorObject.interactive.defs
      .append("clipPath")
      .attr("id","svgWindowClip");

    clipPath
      .append("rect")
      .attr("width",800)
      .attr("height",400);

    return clipPath;
};
