/* global FittsInteractivePrivateConstructor */
/* global ExplorableImage */
FittsInteractivePrivateConstructor.prototype.addLaptop = function() {
  const contructor = this;
  let laptop;


  laptop = new ExplorableImage({
    "where":contructor.interactive.layers.email,
    "href":"assets/laptop.png",
    "width":852,
    "height":412
  })
  .hide();

  return laptop;

};
