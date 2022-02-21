/* global FittsInteractivePrivateConstructor */
/* global ExplorableHintedText */
/* global fittsColors */
FittsInteractivePrivateConstructor.prototype.addCursorText = function() {
  let constructorObject,
   text;

   constructorObject = this;

  text = new ExplorableHintedText({
    "where":constructorObject.interactive.rootLayers.unclipped,
    "foregroundColor":fittsColors().pointer,
    "fontSize":"10pt",
    "fontWeight":"bold",
    "fontFamily":"Oswald"
  });

  return text;
};
