/* global FittsInteractivePrivateConstructor */
/* global explorableSvg */
FittsInteractivePrivateConstructor.prototype.addSvg = function() {
  let constructorObject,
    svg;

  constructorObject = this;

  svg = explorableSvg({
    "where":"#fittsInteractive",
    "responsive":true,
    "showOverflow":true
  });

  return svg;
};
