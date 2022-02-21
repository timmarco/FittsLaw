/* global FittsInteractivePrivateConstructor */
/* global ExplorableHintedText */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addTargetText= function() {
  let constructorObject,
    targetText;

  constructorObject = this;

  targetText = new ExplorableHintedText({
    "where":constructorObject.interactive.emailZoom,
    "foregroundColor":fittsColors().target,
    "backgroundColor":"#333",
    "alignmentBaseline":"text-before-edge",
    "fontSize":"18pt",
    "fontWeight":"bold",
    "fontFamily":"Oswald",
    "coordinates":{
      "x":687,
      "y":80
    }
  })
  .hide()
  .update("Target");

  return targetText;
};
