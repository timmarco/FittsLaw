/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepRemoteTargets = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepRemoteTargets",
    "trigger":"fittsStepRemoteTargets",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("remote");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("With Fitts' Law in mind, the designers of this remote made important buttons larger.");

    interactive.remotePauseTarget
      .pulse();

    interactive.remoteSelectTarget
      .pulse();

    interactive.remote
      .show(250);
  }

  function transitionOut() {

    interactive.remotePauseTarget
      .hide();

    interactive.remoteSelectTarget
      .hide();

  }
};
