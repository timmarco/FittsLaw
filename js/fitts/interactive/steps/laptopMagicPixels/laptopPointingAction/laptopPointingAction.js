/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepLaptopPointing = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepLaptopPointing",
    "trigger":"fittsStepLaptopPointing",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("Cursors can't extend outside of the edges of the screen, no matter how hard users try.");

    interactive.emailZoom
      .transition()
      .duration(0)
      .attr("transform","translate(300,75) scale(0.33)");

    // interactive.saturationFilter
      // .attr("values","1");

    interactive.cursor
      .laptopAnimation();

    interactive.laptop
      .show();


  }

  function transitionOut() {

    interactive.cursor
      .killLaptopAnimation();

    interactive.laptopBottomTarget
      .hide();

    interactive.laptopTopTarget
      .hide();

      interactive.emailZoom
        .transition()
        .duration(500)
        .attr("transform","scale(1)");

      // interactive.saturationFilter
        // .attr("values","0");

  }
};
