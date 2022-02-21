/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepRemoteHeatmaps = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepRemoteHeatmaps",
    "trigger":"fittsStepRemoteHeatmaps",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("remote");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("The central location of the DVR Controls (<em>image on the right</em>) might make it seem like these buttons are easiest to reach.");

    interactive.remote
      .hide(125);

    interactive.remotes
      .show(250);

    interactive.remoteHeatmap
      .show(500,0.75);

  }

  function transitionOut() {
    interactive.remoteHeatmap
      .hide(250);

    interactive.remotes
      .hide(125);
  }
};
