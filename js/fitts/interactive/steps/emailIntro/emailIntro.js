/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepEmailIntro = function() {
  let interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepEmailIntro",
    "trigger":"fittsStepEmailIntro",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {
    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.base
      .saturated();

    interactive.caption
      .html("");

  }

  function transitionOut() {

  }

};
