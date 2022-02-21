/* global FittsInteractivePrivateConstructor */
/* global ExplorableHintedText */
FittsInteractivePrivateConstructor.prototype.addContextMenu = function() {
    let constructorObject,
      text;

    constructorObject = this;

    text = new ExplorableHintedText({
      "where":constructorObject.interactive.layers.contextMenu,
      "fontSize":"32pt",
    })
    .update("CONTEXT MENU");
};
