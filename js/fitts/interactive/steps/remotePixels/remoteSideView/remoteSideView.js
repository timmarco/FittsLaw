/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepRemoteSideView = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepRemoteSideView",
    "trigger":"fittsStepRemoteSideView",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("remoteSideView");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("The physical design of this remote affects how it will be held");

  }

  function transitionOut() {

  }
};
