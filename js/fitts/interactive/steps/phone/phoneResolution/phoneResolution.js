/* global FittsInteractive */
/* global ExplorableScrollStep */
FittsInteractive.prototype.fittsPhoneResolution = function() {

  const interactive = this;
  return new ExplorableScrollStep({
    "name":"fittsPhoneResolution",
    "trigger":"fittsPhoneResolution",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {

    interactive
      .showLayer("phone");

    interactive
      .removeMouseEvents();

    interactive.caption
      .html("Thumbs and fingers have relatively low <em>resolution</em>, requiring larger targets.");

    interactive.remote
      .show();

    interactive.remotes
      .hide();

    interactive.phoneFittsWiki
      .show();
      

  }

  function transitionOut() {

  }
};
