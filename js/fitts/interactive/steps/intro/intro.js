/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepIntro = function() {
  let interactive = this;

  return new ExplorableScrollStep({
    "name":"fittsStepIntro",
    "trigger":"fittsStepIntro",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("intro");

    interactive
      .removeMouseEvents();

    interactive.introInteractive
      .start();

    interactive.caption
      .html("");
  }

  function transitionOut() {

    interactive.introInteractive
      .stop();

  }
};
