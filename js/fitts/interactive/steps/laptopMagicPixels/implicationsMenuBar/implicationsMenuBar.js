/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepImplicationsMenuBar = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepImplicationsMenuBar",
    "trigger":"fittsStepImplicationsMenuBar",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("Applications exist in specific contexts. Here, the application runs in a browser, which runs in an operating system, which is displayed on a laptop.");

    interactive.emailZoom
      .transition()
      .duration(1500)
      .attr("transform","translate(300,75) scale(0.33)");

    interactive.laptop
      .show();


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

  }
};
