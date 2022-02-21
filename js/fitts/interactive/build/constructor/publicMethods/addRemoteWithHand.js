/* global FittsInteractivePrivateConstructor */
/* global ExplorableImage */
FittsInteractivePrivateConstructor.prototype.addRemoteWithHand = function() {
  const contructor = this;
  let laptop;


  laptop = new ExplorableImage({
    "where":contructor.interactive.layers.remote,
    "href":"assets/remoteWithHand.png",
    "width":821,
    "height":431
  })
  .hide();

  return laptop;

};
