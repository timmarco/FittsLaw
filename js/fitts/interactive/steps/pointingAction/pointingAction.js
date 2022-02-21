/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global fittsColors */
FittsInteractive.prototype.fittsStepPointingAction = function() {
  const interactive = this;

  return new ExplorableScrollStep({
    "name":"fittsStepPointingAction",
    "trigger":"fittsStepPointingAction",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {
    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.base
      .fadeImage(1,250);

    interactive.base
      .desaturated();

    interactive.cursor
      .reset()
      .show(250)
      .showCircle()
      .showText()
      .animatedMove({
        "coordinates":{
          "x":0,
          "y":-195
        },
        "duration":2500,
        "repeats":true
      });

    interactive.caption
      .html("Fitts' Law tells predicts the relative difficulty of a particular <span style='font-weight:bold; color:"+fittsColors().pointer+"'>Pointing Action</span>.");

  }

  function transitionOut() {

    interactive.cursor
      .hide(125);

  }

};
