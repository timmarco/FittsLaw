/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepLaptopIntro = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepLaptopIntro",
    "trigger":"fittsStepLaptopIntro",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("Making the <strong>Send</strong> button larger is an obvious implication of Fitts' Law.");

    // interactive.saturationFilter
      // .attr("values","1");

    interactive.cursor
      .move({
        "x":525,
        "y":150
      })
      .hide();

    interactive.base
      .saturated();

    interactive.laptop
      .show();

  }

  function transitionOut() {
    interactive.laptop
      .hide();


  }
};
