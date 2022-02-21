/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepImplicationsDesign = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepImplicationsDesign",
    "trigger":"fittsStepImplicationsDesign",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("hardware");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("Understanding the logic of Fitts' Law is crucial for designing things that humans can actually use.");

  }

  function transitionOut() {

  }
};
