/* global FittsInteractivePrivateConstructor */
/* global ExplorableImage */
FittsInteractivePrivateConstructor.prototype.addRemoteSideView = function() {
  const contructor = this;
  let laptop;


  laptop = new ExplorableImage({
    "where":contructor.interactive.layers.remoteSideView,
    "href":"assets/sideRemote.png",
    "width":824,
    "height":420
  });

  return laptop;

};
