/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global fittsColors */
FittsInteractive.prototype.fittsStepPhoneMenuBar = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsStepPhoneMenuBar",
    "trigger":"fittsStepPhoneMenuBar",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("phone");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("<span style='font-weight:bold; color:black; background-color:"+fittsColors().target+"'>Targets</span> touching the bottom of the screen are very easy to access. Designers exploit this by triggering control panels.");

    interactive.phoneBottomTarget
      .show();

    interactive.phoneMenuBar.image
      .transition()
      .duration(1125)
      .attr("y",-4);

    interactive.thumbIndicator
      .move({"x":400,"y":350},0,0)
      .show(0,0)
      .move({"x":400,"y":325},625,125)
      .hide(1000,125);

    interactive.remote
      .show();

    interactive.remotes
      .hide();

  }

  function transitionOut() {

    interactive.phoneMenuBar.image
      .transition()
      .duration(500)
      .attr("y",323);

    interactive.phoneBottomTarget
      .hide(375);

    interactive.thumbIndicator
      .hide();


  }
};
