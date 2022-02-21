/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepRemote = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepRemote",
    "trigger":"fittsStepRemote",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("remote");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("Physical devices are also subject to Fitts' Law.");

    interactive.remote
      .show();

    interactive.remotes
      .hide();

  }

  function transitionOut() {

  }
};
