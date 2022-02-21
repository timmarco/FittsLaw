/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global phoneBrowsingAnimation */
/* global fittsColors */
FittsInteractive.prototype.fittsStepPhoneBrowsing = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepPhoneBrowsing",
    "trigger":"fittsStepPhoneBrowsing",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("phone");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("<span style='font-weight:bold; color:black; background-color:"+fittsColors().target+"'>Targets</span> touching the sides of the screen are very easy to access. Designers exploit this fact by using edges to navigate web histories.");

    interactive.phoneFittsWiki
      .show(500);

    phoneBrowsingAnimation(interactive);

    interactive.remote
      .show();

    interactive.remotes
      .hide();

  }

  function transitionOut() {

    interactive.phoneFittsWiki
      .hide();

    interactive.phoneLeftTarget
      .hide(375);

    interactive.phoneRightTarget
      .hide(375);

    interactive.thumbIndicator
      .hide(0,0);

  }
};
