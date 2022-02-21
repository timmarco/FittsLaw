/* global FittsInteractivePrivateConstructor */
/* global ExplorableHintedText */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addWidthText = function() {
  let constructorObject,
    text;

  constructorObject = this;

  text =  new ExplorableHintedText({
    "where":constructorObject.interactive.rootLayers.unclipped,
    "foregroundColor":fittsColors().width,
    "fontSize":"18pt",
    "fontWeight":"bold",
    "fontFamily":"Oswald"
  });

  return text;
};
