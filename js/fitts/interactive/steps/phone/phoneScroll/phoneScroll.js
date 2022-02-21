/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global phoneScrollAnimation */
/* global fittsColors */

FittsInteractive.prototype.fittsPhoneScroll = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsPhoneScroll",
    "trigger":"fittsPhoneScroll",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("phone");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("The <span style='font-weight:bold; color:black; background-color:"+fittsColors().target+"'>Target</span> for scrolling is typically the entire screen.");

    interactive.remote
      .show();

    interactive.remotes
      .hide();

    interactive.phoneFittsWiki
      .show();

    interactive.phoneScrollTarget
      .show();

    interactive.phoneFittsWiki.image
      .attr("x",0)
      .attr("y",0);

    phoneScrollAnimation(interactive);

  }

  function transitionOut() {

    interactive.thumbIndicator
      .hide(0,0);

    interactive.phoneScrollTarget
      .hide();

  }
};
