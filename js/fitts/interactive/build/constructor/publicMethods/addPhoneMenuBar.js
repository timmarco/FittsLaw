/* global FittsInteractivePrivateConstructor */
/* global ExplorableImage */
FittsInteractivePrivateConstructor.prototype.addPhoneMenuBar = function() {
  const contructor = this;
  let menuBar;


  menuBar = new ExplorableImage({
    "where":contructor.interactive.layers.phone,
    "href":"assets/phoneMenuBar.png",
    "width":800,
    "height":400,
    "x":0,
    "y":325
  });

  menuBar.image
    .attr("clip-path","url(#phoneClip)");

  return menuBar;
};
