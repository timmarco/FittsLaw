/* exported phoneScrollAnimation */
function phoneScrollAnimation(interactive) {

  const screenImage = interactive.phoneFittsWiki.image;

  loopScroll();

  function loopScroll() {

    screenImage
      .transition()
      .delay(1250)
      .duration(500)
      .attr("y",-60)
      .transition()
      .delay(1550)
      .duration(500)
      .attr("y",-15)
      .transition()
      .delay(500)
      .on('end',loopScroll);

    interactive.phoneScrollTarget
      .show(0)
      .hide(1250);

    interactive.thumbIndicator
      .move({"x":428,"y":255},0,0)
      .show(500,1000)
      .move({"x":428,"y":195},500,1250)
      .hide(375,2000)
      .move({"x":357,"y":135},0,2375)
      .show(500,2750)
      .move({"x":357,"y":180},625,3250)
      .hide(375,3875);

  }

}
