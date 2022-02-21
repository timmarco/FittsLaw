/* global FittsInteractivePrivateConstructor */
/* global ExplorableImage */
FittsInteractivePrivateConstructor.prototype.addLaptopTaskbar = function() {
  const contructor = this;
  let laptop;

  laptop = new ExplorableImage({
    "where":contructor.interactive.layers.email,
    "href":"assets/menubar.png",
    "width":800,
    "height":400
  })
  .hide()
  .move({
    "x":0,
    "y":50
  });

  laptop.image
    .attr("clip-path","url(#laptopTaskbarClip)");

  return laptop;

};
