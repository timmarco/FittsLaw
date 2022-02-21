/* exported phoneBrowsingAnimation */
function phoneBrowsingAnimation(interactive) {
  const screenImage = interactive.phoneFittsWiki.image;
  const leftTarget = interactive.phoneLeftTarget;
  const rightTarget = interactive.phoneRightTarget;
  const thumbIndicator = interactive.thumbIndicator;

  loopImage();
  leftTarget
    .show();

  rightTarget
    .show();


  function loopImage() {

    screenImage
      .transition()
      .delay(1000)
      .duration(500)
      .attr("x",150)
      .transition()
      .delay(1000)
      .duration(500)
      .attr("x",0)
      .on('end',loopImage);

    thumbIndicator
      .show(500,325)
      .hide(250,1075)
      .show(500,1750)
      .hide(250,2500);

    thumbIndicator
      .move({"x":300,"y":200},0,0)
      .move({"x":350,"y":200},500,875)
      .move({"x":500,"y":200},0,1376)
      .move({"x":450,"y":200},500,2375);


  }

}
