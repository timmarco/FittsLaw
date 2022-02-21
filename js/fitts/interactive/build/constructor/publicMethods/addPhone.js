/* global FittsInteractivePrivateConstructor */
/* global ExplorableImage */
FittsInteractivePrivateConstructor.prototype.addPhone = function() {
  const contructor = this;
  let laptop;


  laptop = new ExplorableImage({
    "where":contructor.interactive.layers.phone,
    "href":"assets/phone.png",
    "width":800,
    "height":400
  });

  return laptop;
};
