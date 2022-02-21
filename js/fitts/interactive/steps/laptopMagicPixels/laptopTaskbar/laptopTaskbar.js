/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global laptopTaskbarAnimation */
FittsInteractive.prototype.fittsStepLaptopTaskbar = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepLaptopTaskbar",
    "trigger":"fittsStepLaptopTaskbar",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("Clever designers exploit infinite edge size by triggering important actions on the edges.");

    interactive.emailZoom
      .transition()
      .duration(0)
      .attr("transform","translate(300,75) scale(0.33)");

      interactive.laptop
        .show();

    interactive.cursor
      .move({
        "x":525,
        "y":150
      })
      .hideText()
      .show();


    laptopTaskbarAnimation(interactive);

  }

  function transitionOut() {

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

    interactive.laptopTaskbar
      .hide();

    interactive.cursor
      .hide();

  }
};
