/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global fittsColors */
FittsInteractive.prototype.fittsStepRemoteWithHand = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepRemoteWithHand",
    "trigger":"fittsStepRemoteWithHand",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("remote");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("Users will naturally hold the remote with their thumb directly on top of the Menu buttons. The <span style='font-weight:bold; color:"+fittsColors().distance+"'>Distance</span> is zero, so Fitts' Law tells us that it's infinitely easy to press these buttons.");

    interactive.remote
      .show(250);

    interactive.remotes
      .hide();

    interactive.remoteWithHand
      .show(250);

  }

  function transitionOut() {

    interactive.remoteWithHand
      .hide(125);

  }
};
