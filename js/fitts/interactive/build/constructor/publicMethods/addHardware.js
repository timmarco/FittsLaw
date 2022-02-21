/* global FittsInteractivePrivateConstructor */
/* global ExplorableImage */
FittsInteractivePrivateConstructor.prototype.addHardware = function() {
  const contructor = this;
  let laptop;


  laptop = new ExplorableImage({
    "where":contructor.interactive.layers.hardware,
    "href":"assets/hardware.png",
    "width":800,
    "height":400
  });

  return laptop;
};
