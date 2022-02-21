/* global FittsInteractive */
/* global ExplorableScrollStep */
/* global fittsColors */
FittsInteractive.prototype.fittsStepMultipleTargets = function() {
  const interactive = this;

  return new ExplorableScrollStep({
    "name":"fittsStepMultipleTargets",
    "trigger":"fittsStepMultipleTargets",
  })
  .setTransitionIn(transitionIn)
  .setTransitionOut(transitionOut);

  function transitionIn() {
    interactive
      .showLayer("email");

    interactive
      .removeMouseEvents();

    interactive.exampleTargets
      .pulse();

    interactive.caption
      .html("Most devices and applications will have many possible <span style='color:black;font-weight:bold;background-color:"+fittsColors().target+"'>targets</span>.");

    interactive.tooltip
      .hide();

    interactive.cursor
      .hide();

  }

  function transitionOut() {

    interactive.exampleTargets
      .hide(125);

  }

};
