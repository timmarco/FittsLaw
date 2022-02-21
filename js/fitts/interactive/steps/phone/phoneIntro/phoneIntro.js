/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsStepPhoneIntro = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepPhoneIntro",
    "trigger":"fittsStepPhoneIntro",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("phone");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("Magic Pixels can also be found on phones.");

    interactive.remote
      .show();

    interactive.remotes
      .hide();

    interactive.phoneBottomTarget
      .pulse(1000,1000);

    interactive.phoneTopTarget
      .pulse(1000,1000);

    interactive.phoneRightTarget
      .pulse(1000,1000);

    interactive.phoneLeftTarget
      .pulse(1000,1000);

  }

  function transitionOut() {
    interactive.phoneBottomTarget
      .hide();

    interactive.phoneTopTarget
      .hide();

    interactive.phoneRightTarget
      .hide();

    interactive.phoneLeftTarget
      .hide();

  }
};
