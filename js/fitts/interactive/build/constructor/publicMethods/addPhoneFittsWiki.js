/* global FittsInteractivePrivateConstructor */
/* global ExplorableImage */
FittsInteractivePrivateConstructor.prototype.addPhoneFittsWiki = function() {
  const contructor = this;
  let menuBar;


  menuBar = new ExplorableImage({
    "where":contructor.interactive.layers.phone,
    "href":"assets/fittsWiki.png",
    "width":800,
    "height":400,
    "x":0,
    "y":0
  })
  .hide();

  menuBar.image
    .attr("clip-path","url(#phoneClip)");

  return menuBar;
};
