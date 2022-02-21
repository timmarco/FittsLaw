/* global FittsInteractivePrivateConstructor */
/* global ExplorableImage */
FittsInteractivePrivateConstructor.prototype.addRemoteHeatmap = function() {
  const contructor = this;
  let laptop;


  laptop = new ExplorableImage({
    "where":contructor.interactive.layers.remote,
    "href":"assets/remoteHeatmap.png",
    "width":800,
    "height":400
  })
  .hide();

  return laptop;

};
