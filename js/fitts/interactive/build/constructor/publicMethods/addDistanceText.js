/* global FittsInteractivePrivateConstructor */
/* global ExplorableHintedText */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addDistanceText = function() {
  let constructorObject,
   text;

  constructorObject = this;

  text = new ExplorableHintedText({
    "where":constructorObject.interactive.rootLayers.unclipped,
    "foregroundColor":fittsColors().distance,
    "fontSize":"18pt",
    "fontWeight":"bold",
    "alignmentBaseline":"center",
    "textAnchor":"middle",
    "fontFamily":"Oswald",
  });

  return text;
};
