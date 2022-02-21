/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepImplicationsPhone = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepImplicationsPhone",
    "trigger":"fittsStepImplicationsPhone",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("fittsStepImplicationsPhone");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("Modern phones were designed with Fitts' Law in mind.");

  }

  function transitionOut() {

  }
};
