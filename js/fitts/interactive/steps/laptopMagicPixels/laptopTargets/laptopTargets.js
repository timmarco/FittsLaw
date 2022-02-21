/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global fittsColors */
FittsInteractive.prototype.fittsStepLaptopTargets = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepLaptopTargets",
    "trigger":"fittsStepLaptopTargets",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("<span style='font-weight:bold; color:black; background-color:"+fittsColors().target+"'>Targets</span> that touch the edge extend infinitely beyond the monitor.");

    interactive.emailZoom
      .transition()
      .duration(0)
      .attr("transform","translate(300,75) scale(0.33)");

    interactive.laptop
      .show();

    interactive.laptopBottomTarget
      .pulse(1000,1000);

    interactive.laptopTopTarget
      .pulse(1000,1000);

    interactive.laptopLeftTarget
      .pulse(1000,1000);

    interactive.laptopRightTarget
      .pulse(1000,1000);

  }

  function transitionOut() {

    interactive.laptopBottomTarget
      .hide();

    interactive.laptopTopTarget
      .hide();

    interactive.laptopRightTarget
      .hide();

    interactive.laptopLeftTarget
      .hide();

    interactive.emailZoom
      .transition()
      .duration(500)
      .attr("transform","scale(1)");

    // interactive.saturationFilter
      // .attr("values","0");

  }
};
