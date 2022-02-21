/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepRemotes = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepRemotes",
    "trigger":"fittsStepRemotes",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("remote");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("Physical devices are also bound by Fitts' Law.");

    interactive.remote
      .hide(125);

    interactive.remotes
      .show(250);

  }

  function transitionOut() {

    interactive.remotes
      .hide(125);

  }
};
